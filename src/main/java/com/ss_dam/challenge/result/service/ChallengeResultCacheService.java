package com.ss_dam.challenge.result.service;

import java.math.BigDecimal;
import java.time.Duration;
import java.util.ArrayList;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.github.benmanes.caffeine.cache.Cache;
import com.github.benmanes.caffeine.cache.Caffeine;
import com.ss_dam.challenge.model.response.AdminChallengeRankingView;
import com.ss_dam.challenge.result.dao.AdminChallengeResultDao;
import com.ss_dam.challenge.result.model.internal.ChallengeResultRow;
import com.ss_dam.challenge.result.model.response.AdminChallengeResultStatisticsView;
import com.ss_dam.challenge.result.model.response.AdminChallengeResultStatisticsView.HourlyProof;
import com.ss_dam.challenge.result.model.response.AdminChallengeResultStatisticsView.RegionParticipant;
import com.ss_dam.common.pager.PageQuery;
import com.ss_dam.common.pager.PageResult;
import com.ss_dam.common.pager.Pager;
import com.ss_dam.common.validator.PageQueryValidator;

import tools.jackson.databind.ObjectMapper;

@Service
public class ChallengeResultCacheService {

    private final AdminChallengeResultDao resultDao;
    private final ObjectMapper objectMapper;
    private final PageQueryValidator pageQueryValidator;

    /*
     * 챌린지 번호 하나당 캐시 항목 하나.
     * 최대 100개이며, 마지막 접근 후 1시간이 지나면 만료.
     *
     * 캐시에서 제거돼도 DB 결과는 그대로 유지된다.
     */

// 챌린지 하나의 순위 개수와 페이징 처리
// 최대 20개 챌린지 보관
// 마지막 접근 후 30분간 사용하지 않으면 만료
    private final Cache<Long, CachedResult> cache =
            Caffeine.newBuilder()
                    .maximumSize(20)
                    .expireAfterAccess(Duration.ofMinutes(30))
                    .build();

    public ChallengeResultCacheService(
            AdminChallengeResultDao resultDao,
            ObjectMapper objectMapper,
            PageQueryValidator pageQueryValidator) {

        this.resultDao = resultDao;
        this.objectMapper = objectMapper;
        this.pageQueryValidator = pageQueryValidator;
    }

    // 최종 통계와 차트 반환
    public AdminChallengeResultStatisticsView loadStatistics(Long code) {

        CachedResult cached = getResult(code);

        /*
         * 캐시 원본을 직접 반환하지 않고 복사한다.
         * 호출한 쪽에서 응답 DTO를 수정해도 캐시는 유지된다.
         */
        return objectMapper.convertValue(
                cached.statistics(),
                AdminChallengeResultStatisticsView.class);
    }

    // 전체 순위에서 요청한 페이지의 회원만 반환
    public PageResult<AdminChallengeRankingView> loadRanking(
            Long code,
            PageQuery pageQuery) {

        pageQueryValidator.validate(pageQuery);

        CachedResult cached = getResult(code);
        List<AdminChallengeRankingView> members = cached.members();

        int total = members.size();
        int fromIndex = Math.min(pageQuery.getOffset(), total);

        // 덧셈 오버플로 방지를 위해 long으로 계산
        int toIndex = (int) Math.min(
                (long) fromIndex + pageQuery.getPerPage(),
                total);

        List<AdminChallengeRankingView> content = new ArrayList<>();

        for (int index = fromIndex; index < toIndex; index++) {
            // 반환할 회원만 복사. 전체 JSON을 다시 변환하지 않는다.
            content.add(
                    objectMapper.convertValue(
                            members.get(index),
                            AdminChallengeRankingView.class));
        }

        return PageResult.of(
                content,
                new Pager(pageQuery, total));
    }

    private CachedResult getResult(Long code) {

        if (code == null || code <= 0) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "챌린지 번호는 양수여야 합니다.");
        }

        /*
         * 캐시에 있으면 재사용.
         * 없으면 DB 조회 및 JSON 변환 후 캐시에 저장.
         * 같은 키의 동시 요청은 중복 로딩을 줄이도록 처리된다.
         */
        return cache.get(code, this::loadFromDatabase);
    }

    private CachedResult loadFromDatabase(Long code) {

        // XML에서도 STATUS = 'COMPLETED' 조건으로 조회해야 한다.
        ChallengeResultRow row =
                resultDao.loadCompletedResult(code);

        if (row == null || !"COMPLETED".equals(row.getStatus())) {
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "종료 결과가 아직 확정되지 않았습니다.");
        }

        try {
            List<AdminChallengeRankingView> members =
                    readList(
                            row.getMemberResultsJson(),
                            AdminChallengeRankingView.class);

            List<HourlyProof> hourlyProofs =
                    readList(
                            row.getHourlyResultsJson(),
                            HourlyProof.class);

            List<RegionParticipant> regionParticipants =
                    readList(
                            row.getRegionResultsJson(),
                            RegionParticipant.class);

            // 완료 결과의 필수 데이터 확인
            if (row.getParticipantCount() == null
                    || row.getParticipantCount() != members.size()) {

                throw new IllegalStateException(
                        "참여 인원과 저장된 회원 결과 수가 다릅니다.");
            }

            validateHours(hourlyProofs);

            AdminChallengeResultStatisticsView statistics =
                    new AdminChallengeResultStatisticsView();

            statistics.setProofCount(
                    row.getProofCount().longValue());

            statistics.setParticipantCount(
                    row.getParticipantCount().longValue());

            statistics.setAverageLikeCount(
                    BigDecimal.valueOf(row.getAverageLikeCount()));

            statistics.setAverageAchievementRate(
                    BigDecimal.valueOf(
                            row.getAverageAchievementRate()));

            statistics.setSuccessRate(
                    BigDecimal.valueOf(row.getSuccessRate()));

            statistics.setHourlyProofs(hourlyProofs);
            statistics.setRegionParticipants(regionParticipants);

            /*
             * 회원 JSON은 저장 시 최종 순위순으로 정렬한다.
             * 조회할 때는 저장된 순서를 그대로 사용한다.
             */
            return new CachedResult(
                    statistics,
                    List.copyOf(members));

        } catch (RuntimeException e) {
            // 손상된 데이터를 빈 목록으로 처리하거나 캐시하지 않는다.
            throw new ResponseStatusException(
                    HttpStatus.INTERNAL_SERVER_ERROR,
                    "저장된 종료 결과를 읽을 수 없습니다.",
                    e);
        }
    }

    private <T> List<T> readList(
            String json,
            Class<T> elementType) {

        if (json == null || json.isBlank()) {
            throw new IllegalStateException(
                    "종료 결과 JSON이 누락되었습니다.");
        }

        List<T> result = objectMapper.readValue(
                json,
                objectMapper.getTypeFactory()
                        .constructCollectionType(
                                List.class,
                                elementType));

        if (result == null || result.stream().anyMatch(item -> item == null)) {
            throw new IllegalStateException(
                    "종료 결과 JSON 형식이 올바르지 않습니다.");
        }

        return result;
    }

    private void validateHours(List<HourlyProof> hourlyProofs) {

        if (hourlyProofs.size() != 24) {
            throw new IllegalStateException(
                    "시간대별 결과는 24개여야 합니다.");
        }

        boolean[] seen = new boolean[24];

        for (HourlyProof point : hourlyProofs) {
            Integer hour = point.getHour();

            if (hour == null
                    || hour < 0
                    || hour > 23
                    || seen[hour]
                    || point.getProofCount() == null
                    || point.getProofCount() < 0) {

                throw new IllegalStateException(
                        "시간대별 결과가 올바르지 않습니다.");
            }

            seen[hour] = true;
        }

        hourlyProofs.sort(
                java.util.Comparator.comparing(HourlyProof::getHour));
    }

    /*
     * 캐시 전용 내부 객체.
     * 외부에 직접 노출하지 않아 캐시 데이터 수정을 방지한다.
     */
    private record CachedResult(
            AdminChallengeResultStatisticsView statistics,
            List<AdminChallengeRankingView> members) {
    }
}