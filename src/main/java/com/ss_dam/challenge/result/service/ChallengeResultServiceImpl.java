package com.ss_dam.challenge.result.service;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.ss_dam.challenge.model.response.AdminChallengeRankingView;
import com.ss_dam.challenge.result.dao.ChallengeResultDao;
import com.ss_dam.challenge.result.model.internal.ChallengeResultRow;
import com.ss_dam.challenge.result.model.response.AdminChallengeResultStatisticsView;
import com.ss_dam.challenge.result.model.response.AdminChallengeResultStatisticsView.HourlyProof;
import com.ss_dam.challenge.result.model.response.AdminChallengeResultStatisticsView.RegionParticipant;
import com.ss_dam.common.validator.challenge.AdminChallengeValidator;

import tools.jackson.databind.ObjectMapper;

@Service
public class ChallengeResultServiceImpl
        implements ChallengeResultService {

    private static final ZoneId SEOUL =
            ZoneId.of("Asia/Seoul");

    private final ChallengeResultDao resultDao;
    private final AdminChallengeValidator challengeValidator;
    private final ObjectMapper objectMapper;

    public ChallengeResultServiceImpl(
            ChallengeResultDao resultDao,
            AdminChallengeValidator challengeValidator,
            ObjectMapper objectMapper) {

        this.resultDao = resultDao;
        this.challengeValidator = challengeValidator;
        this.objectMapper = objectMapper;
    }

    // 챌린지 하나의 집계와 저장을 독립된 트랜잭션으로 처리
    @Override
    @Transactional(
            propagation = Propagation.REQUIRES_NEW,
            isolation = Isolation.REPEATABLE_READ,
            rollbackFor = Exception.class)
    public boolean saveResult(Long challengeCode) {

        challengeValidator.validateCode(challengeCode);

        Map<String, Object> params = new HashMap<>();
        params.put("code", challengeCode);
        params.put("now", LocalDateTime.now(SEOUL));

        // 동일 챌린지의 중복 저장 작업 방지
        LocalDateTime endedAt =
                resultDao.lockEndedChallenge(params);

        if (endedAt == null) {
            return false;
        }

        // 이미 완료된 결과는 다시 집계하지 않음
        if (resultDao.existsCompletedResult(challengeCode)) {
            return false;
        }

        // 기존 미완료 결과를 임의로 덮어쓰지 않음
        if (resultDao.existsResult(challengeCode)) {
            throw new IllegalStateException(
                    "미완료 종료 결과가 이미 존재합니다. "
                            + "challengeCode=" + challengeCode);
        }

        // 인증글 작성 기간의 상한
        params.put("endedAt", endedAt);

        /*
         * 인증글은 챌린지 진행 기간 내 작성된 글만 대상.
         * 좋아요·조회수·회원 주소는 이번 집계의 데이터 기준.
         */
        List<AdminChallengeRankingView> members =
                resultDao.calculateMemberResults(params);

        AdminChallengeResultStatisticsView statistics =
                resultDao.calculateStatistics(params);

        validateStatistics(statistics, members.size());

        List<HourlyProof> hourlyProofs = fillHourlyProofs(
                resultDao.calculateHourlyProofs(params));

        List<RegionParticipant> regionParticipants =
                resultDao.calculateRegionParticipants(params);

        ChallengeResultRow row = new ChallengeResultRow();

        row.setChallengeCode(Math.toIntExact(challengeCode));

        row.setProofCount(
                Math.toIntExact(statistics.getProofCount()));

        row.setParticipantCount(
                Math.toIntExact(statistics.getParticipantCount()));

        row.setAverageLikeCount(
                statistics.getAverageLikeCount().doubleValue());

        row.setAverageAchievementRate(
                statistics.getAverageAchievementRate().doubleValue());

        row.setSuccessRate(
                statistics.getSuccessRate().doubleValue());

        // 전체 순위는 XML에서 정렬된 순서대로 저장
        row.setMemberResultsJson(
                objectMapper.writeValueAsString(members));

        row.setHourlyResultsJson(
                objectMapper.writeValueAsString(hourlyProofs));

        row.setRegionResultsJson(
                objectMapper.writeValueAsString(regionParticipants));

        row.setEndedAt(endedAt);

        // 저장 직전 기록한 시각이며, 정확한 종료 시각은 아님
        row.setSavedAt(LocalDateTime.now(SEOUL));
        row.setStatus("COMPLETED");

        if (resultDao.insertCompletedResult(row) != 1) {
            throw new IllegalStateException(
                    "챌린지 종료 결과 저장에 실패했습니다.");
        }

        return true;
    }

    // 요약 통계의 필수 값 및 참여 인원 확인
    private void validateStatistics(
            AdminChallengeResultStatisticsView statistics,
            int memberCount) {

        if (statistics == null
                || statistics.getProofCount() == null
                || statistics.getParticipantCount() == null
                || statistics.getAverageLikeCount() == null
                || statistics.getAverageAchievementRate() == null
                || statistics.getSuccessRate() == null) {

            throw new IllegalStateException(
                    "종료 요약 통계가 누락되었습니다.");
        }

        if (statistics.getParticipantCount().longValue() != memberCount) {
            throw new IllegalStateException(
                    "참여 인원과 회원별 결과 수가 다릅니다.");
        }
    }

    // 인증이 없는 시간도 0으로 채워 24개 반환
    private List<HourlyProof> fillHourlyProofs(
            List<HourlyProof> rows) {

        long[] counts = new long[24];
        boolean[] seen = new boolean[24];

        for (HourlyProof row : rows) {

            Integer hour = row.getHour();
            Long count = row.getProofCount();

            if (hour == null
                    || hour < 0
                    || hour > 23
                    || seen[hour]
                    || count == null
                    || count < 0) {

                throw new IllegalStateException(
                        "시간대별 인증 집계 결과가 올바르지 않습니다.");
            }

            seen[hour] = true;
            counts[hour] = count;
        }

        List<HourlyProof> result = new ArrayList<>();

        for (int hour = 0; hour < 24; hour++) {
            HourlyProof point = new HourlyProof();
            point.setHour(hour);
            point.setProofCount(counts[hour]);

            result.add(point);
        }

        return result;
    }
}