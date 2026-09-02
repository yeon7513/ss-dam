package com.ss_dam.challenge.service;

import java.util.List;

import com.ss_dam.challenge.Challenge;

public interface ChallengeService {

    // 전체 챌린지 조회
    List<Challenge> searchChallenges(String progressStatus);

    // 챌린지 상세 조회
    Challenge searchChallengeByCode(int code);

    // 챌린지 등록
    void registerChallenge(Challenge challenge);

    // 챌린지 수정
    void updateChallenge(Challenge challenge);

    // 챌린지 삭제
    void deleteChallenge(int code);

    // 인기 챌린지 TOP 3
    List<Challenge> searchPopularChallenges();

    // 최신 등록 챌린지 1개
    Challenge searchLatestChallenge();
}