package com.ss_dam.challenge.dao;

import java.util.List;

import com.ss_dam.challenge.Challenge;

public interface ChallengeDao {

    // 전체 챌린지 조회
    List<Challenge> searchChallenges();

    // 챌린지 상세 조회
    Challenge searchChallengeByCode(int code);

    // 챌린지 등록
    void registerChallenge(Challenge challenge);

    // 챌린지 수정
    void updateChallenge(Challenge challenge);

    // 챌린지 삭제
    void deleteChallenge(int code);
}