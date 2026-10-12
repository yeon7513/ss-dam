package com.ss_dam.challenge.service;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ss_dam.challenge.dao.ChallengeResultDao;
import com.ss_dam.common.validator.challenge.AdminChallengeValidator;

@Service
public class ChallengeResultServiceImpl
        implements ChallengeResultService {

    private static final ZoneId SEOUL =
            ZoneId.of("Asia/Seoul");

    private final ChallengeResultDao challengeResultDao;
    private final AdminChallengeValidator challengeValidator;

    public ChallengeResultServiceImpl(
            ChallengeResultDao challengeResultDao,
            AdminChallengeValidator challengeValidator) {

        this.challengeResultDao = challengeResultDao;
        this.challengeValidator = challengeValidator;
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public boolean saveResult(Long challengeCode) {

        challengeValidator.validateCode(challengeCode);

        LocalDateTime now = LocalDateTime.now(SEOUL);

        Map<String, Object> params = new HashMap<>();
        params.put("code", challengeCode);
        params.put("now", now);

        /*
         * 종료된 챌린지를 SELECT ... FOR UPDATE로 조회.
         *
         * 조건:
         * - 삭제되지 않은 챌린지
         * - 진행 상태 ENDED
         * - END_DATE <= now
         *
         * 반환값은 해당 챌린지의 END_DATE.
         * 대상이 없으면 null.
         *
         * 같은 챌린지에 대한 중복 실행을 직렬화한다.
         */
        LocalDateTime endedAt =
                challengeResultDao.lockEndedChallenge(params);

        if (endedAt == null) {
            return false;
        }

        // 잠금을 얻은 후 저장 완료 여부 확인
        if (challengeResultDao.existsCompletedResult(challengeCode)) {
            return false;
        }

        // 인증글 작성 기간의 상한으로 사용
        // 예를 들어 6시 종료, 6시 0분 20초에 집계했다면 그때의 값을 저장하고 이후에는 고정. 종료부터 첫 집계 사이에 늘어난 좋아요·조회수는 포함될 수 있다
        params.put("endedAt", endedAt);

        // 결과 헤더 생성: 아직 조회 가능한 완료 상태가 아님
        int headerCount =
                challengeResultDao.insertResultHeader(params);

        if (headerCount != 1) {
            throw new IllegalStateException(
                    "종료 결과 헤더 저장에 실패했습니다.");
        }

        /*
         * 회원별 최종 결과 저장.
         *
         * 인증 수, 인증 날짜 수, 좋아요, 조회수,
         * 점수, 개인 달성률, 성공 여부, 최종 순위 등.
         *
         * 참여자가 없으면 0건 저장도 정상이다.
         */
        challengeResultDao.insertMemberResults(params);

        /*
         * 요약 통계 저장.
         *
         * 회원 수·평균 개인 달성률·성공률은
         * 위에서 저장한 회원별 결과를 활용해 계산.
         *
         * 평균 좋아요는 전체 유효 인증글 기준으로 계산.
         * 순위 산정용 대표 글 좋아요와 구분한다.
         */
        int summaryCount =
                challengeResultDao.insertSummary(params);

        if (summaryCount != 1) {
            throw new IllegalStateException(
                    "종료 요약 통계 저장에 실패했습니다.");
        }

        /*
         * 0~23시 인증 수 저장.
         * 인증이 없는 시간도 0으로 저장한다.
         */
        int hourlyCount =
                challengeResultDao.insertHourlyResults(params);

        if (hourlyCount != 24) {
            throw new IllegalStateException(
                    "시간대별 종료 통계가 완전하게 저장되지 않았습니다.");
        }

        /*
         * 종료 시점 지역별 참여 인원 저장.
         * 참여자가 없으면 0건 저장도 정상이다.
         */
        challengeResultDao.insertRegionResults(params);

        /*
         * 모든 결과 저장 후 완료 처리.
         * 실제 저장 시각은 종료 기준 시각과 별도로 기록한다.
         */
        params.put("savedAt", LocalDateTime.now(SEOUL));

        int completedCount =
                challengeResultDao.markCompleted(params);

        if (completedCount != 1) {
            throw new IllegalStateException(
                    "종료 결과 완료 처리에 실패했습니다.");
        }

        return true;
    }
}