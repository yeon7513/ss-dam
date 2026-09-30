package com.ss_dam.challenge.service;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.ss_dam.challenge.dao.UserChallengeDao;

@Component
public class ChallengeStatusScheduler {

    @Autowired
    private UserChallengeDao userChallengeDao;

    // 이전 실행이 끝난 뒤 30초 후 다시 실행
    @Scheduled(fixedDelay = 30_000)
    public void refreshProgressStatuses() {

        LocalDateTime now =
                LocalDateTime.now(ZoneId.of("Asia/Seoul"));

        userChallengeDao.refreshProgressStatuses(
                Map.of("now", now));
    }
}