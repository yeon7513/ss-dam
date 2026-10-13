package com.ss_dam.challenge.service;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.ss_dam.challenge.dao.UserChallengeDao;
import com.ss_dam.challenge.result.dao.ChallengeResultDao;
import com.ss_dam.challenge.result.service.ChallengeResultService;

@Component
public class ChallengeStatusScheduler {

    private static final Logger log =
            LoggerFactory.getLogger(ChallengeStatusScheduler.class);

    private static final ZoneId SEOUL =
            ZoneId.of("Asia/Seoul");

    private final UserChallengeDao userChallengeDao;
    private final ChallengeResultDao resultDao;
    private final ChallengeResultService resultService;

    public ChallengeStatusScheduler(
            UserChallengeDao userChallengeDao,
            ChallengeResultDao resultDao,
            ChallengeResultService resultService) {

        this.userChallengeDao = userChallengeDao;
        this.resultDao = resultDao;
        this.resultService = resultService;
    }

    // 이전 작업이 끝난 뒤 30초 후 다시 실행
    @Scheduled(fixedDelay = 30_000)
    public void refreshProgressStatuses() {

        LocalDateTime now = LocalDateTime.now(SEOUL);
        Map<String, Object> params = Map.of("now", now);

        List<Long> challengeCodes;

        try {
            // 1. 챌린지 진행 상태 갱신
            userChallengeDao.refreshProgressStatuses(params);

            // 2. 종료됐지만 결과가 없는 챌린지 조회
            challengeCodes =
                    resultDao.findPendingResultCodes(params);

        } catch (Exception e) {
            log.error("챌린지 상태 갱신 또는 결과 저장 대상 조회 실패", e);
            return;
        }

        // 3. 챌린지별로 결과 저장
        for (Long challengeCode : challengeCodes) {
            try {
                boolean saved =
                        resultService.saveResult(challengeCode);

                if (saved) {
                    log.info(
                            "챌린지 종료 결과 저장 완료: challengeCode={}",
                            challengeCode);
                }

            } catch (Exception e) {
                // 하나가 실패해도 나머지 챌린지는 계속 처리
                log.error(
                        "챌린지 종료 결과 저장 실패: challengeCode={}",
                        challengeCode,
                        e);
            }
        }
    }
}