package com.ss_dam.challenge.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import com.ss_dam.challenge.dao.AdminChallengeAnalysisDao;
import com.ss_dam.challenge.model.request.analysis_request.AdminChallengeAnalysisSearch;
import com.ss_dam.challenge.model.response.AdminChallengeRankingView;
import com.ss_dam.challenge.model.response.analysis_response.AdminChallengeAnalysisDetailView;
import com.ss_dam.challenge.model.response.analysis_response.AdminChallengeAnalysisListView;
import com.ss_dam.challenge.model.response.analysis_response.AdminChallengeAnalysisStatisticsView;
import com.ss_dam.common.pager.PageQuery;
import com.ss_dam.common.pager.PageResult;
import com.ss_dam.common.pager.Pager;
import com.ss_dam.common.validator.PageQueryValidator;
import com.ss_dam.common.validator.challenge.AdminChallengeValidator;

@Service
@Transactional(readOnly = true)
public class AdminChallengeAnalysisServiceImpl
        implements AdminChallengeAnalysisService {

    private static final ZoneId SEOUL = ZoneId.of("Asia/Seoul");

    private static final Set<String> ALLOWED_SORTS = Set.of(
            "LATEST",
            "PARTICIPANTS_DESC",
            "PARTICIPANTS_ASC",
            "ACHIEVEMENT_DESC",
            "ACHIEVEMENT_ASC");

    private final AdminChallengeAnalysisDao analysisDao;
    private final AdminChallengeValidator challengeValidator;
    private final PageQueryValidator pageQueryValidator;

    public AdminChallengeAnalysisServiceImpl(
            AdminChallengeAnalysisDao analysisDao,
            AdminChallengeValidator challengeValidator,
            PageQueryValidator pageQueryValidator) {

        this.analysisDao = analysisDao;
        this.challengeValidator = challengeValidator;
        this.pageQueryValidator = pageQueryValidator;
    }

    // 종료 결과 목록 조회
    @Override
    public PageResult<AdminChallengeAnalysisListView> loadChallenges(
            AdminChallengeAnalysisSearch search) {

        pageQueryValidator.validate(search);
        validateSearch(search);

        Map<String, Object> params = createSearchParams(search);

        // 결과 저장이 완료된 챌린지만 조회
        long total = analysisDao.countChallenges(params);

        List<AdminChallengeAnalysisListView> content =
                total == 0
                        ? List.of()
                        : analysisDao.loadChallenges(params);

        return PageResult.of(
                content,
                new Pager(search, total));
    }

    // 상세 정보 조회
    @Override
    public AdminChallengeAnalysisDetailView loadChallenge(Long code) {

        requireAnalysisReady(code);

        AdminChallengeAnalysisDetailView result =
                analysisDao.loadChallenge(code);

        if (result == null) {
            throw incompleteResult();
        }

        return result;
    }

    // 최종 통계 및 차트 조회
    @Override
    public AdminChallengeAnalysisStatisticsView loadChallengeStatistics(
            Long code) {

        requireAnalysisReady(code);

        AdminChallengeAnalysisStatisticsView result =
                analysisDao.loadStatistics(code);

        if (result == null) {
            throw incompleteResult();
        }

        // 종료 시 저장한 시간대별 인증 수
        result.setHourlyProofs(
                analysisDao.loadHourlyProofs(code));

        // 종료 시 저장한 지역별 참여 인원
        result.setRegionParticipants(
                analysisDao.loadRegionParticipants(code));

        return result;
    }

    // 최종 참여 순위 조회
    @Override
    public PageResult<AdminChallengeRankingView> loadChallengeRanking(
            Long code,
            PageQuery pageQuery) {

        pageQueryValidator.validate(pageQuery);
        requireAnalysisReady(code);

        Map<String, Object> params = new HashMap<>();
        params.put("code", code);
        params.put("offset", pageQuery.getOffset());
        params.put("perPage", pageQuery.getPerPage());

        // 현재 참여자가 아닌, 저장된 최종 순위의 회원 수
        long total = analysisDao.countRankingMembers(code);

        List<AdminChallengeRankingView> content =
                total == 0
                        ? List.of()
                        : analysisDao.loadChallengeRanking(params);

        return PageResult.of(
                content,
                new Pager(pageQuery, total));
    }

    // 종료 여부 및 종료 결과 저장 완료 여부 확인
    private void requireAnalysisReady(Long code) {

        challengeValidator.validateCode(code);

        Map<String, Object> params = new HashMap<>();
        params.put("code", code);
        params.put("now", LocalDateTime.now(SEOUL));

        // 삭제되지 않았고, 종료 상태이며, 종료 시각이 지난 챌린지
        if (!analysisDao.existsEndedChallenge(params)) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND,
                    "조회 가능한 종료 챌린지가 없습니다.");
        }

        // 요약·차트·회원별 순위가 모두 저장된 상태인지 확인
        if (!analysisDao.isSnapshotReady(code)) {
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "종료 결과가 아직 확정되지 않았습니다.");
        }
    }

    // 목록 조회 파라미터 구성
    private Map<String, Object> createSearchParams(
            AdminChallengeAnalysisSearch search) {

        Map<String, Object> params = new HashMap<>();

        params.put("now", LocalDateTime.now(SEOUL));
        params.put("offset", search.getOffset());
        params.put("perPage", search.getPerPage());
        params.put("sort", search.getSort());

        // 카테고리는 챌린지 자체를 의미
        params.put("categoryCode", search.getCategoryCode());

        // 지급 상태는 별도 지급 데이터에서 조회
        params.put("rewardPaid", search.getRewardPaid());

        params.put(
                "from",
                search.getFromDate() == null
                        ? null
                        : search.getFromDate().atStartOfDay());

        params.put(
                "toExclusive",
                search.getToDate() == null
                        ? null
                        : search.getToDate().plusDays(1).atStartOfDay());

        String keyword = search.getKeyword();

        params.put(
                "keyword",
                keyword == null || keyword.isBlank()
                        ? null
                        : keyword.trim());

        return params;
    }

    // 검색 조건 검증
    private void validateSearch(AdminChallengeAnalysisSearch search) {

        validateDate(search.getFromDate());
        validateDate(search.getToDate());

        if (search.getFromDate() != null
                && search.getToDate() != null
                && search.getFromDate().isAfter(search.getToDate())) {

            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "조회 시작일은 종료일보다 늦을 수 없습니다.");
        }

        // 다음 날 0시를 조회 상한으로 사용하므로 최댓값 제한
        if (LocalDate.of(9999, 12, 31).equals(search.getToDate())) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "조회 종료일은 9999-12-30 이하여야 합니다.");
        }

        if (search.getCategoryCode() != null
                && search.getCategoryCode() <= 0) {

            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "카테고리 번호는 양수여야 합니다.");
        }

        if (search.getSort() == null
                || !ALLOWED_SORTS.contains(search.getSort())) {

            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "지원하지 않는 정렬 조건입니다.");
        }
    }

    private void validateDate(LocalDate date) {

        if (date != null
                && (date.getYear() < 1000 || date.getYear() > 9999)) {

            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "조회 날짜가 허용 범위를 벗어났습니다.");
        }
    }

    private ResponseStatusException incompleteResult() {
        return new ResponseStatusException(
                HttpStatus.INTERNAL_SERVER_ERROR,
                "저장된 종료 결과가 누락되었습니다.");
    }
}