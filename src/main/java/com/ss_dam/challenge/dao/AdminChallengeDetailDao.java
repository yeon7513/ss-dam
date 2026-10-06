package com.ss_dam.challenge.dao;

import java.util.List;
import java.util.Map;

import com.ss_dam.challenge.model.response.AdminChallengeDetailView;
import com.ss_dam.challenge.model.response.AdminChallengeHourlyCount;
import com.ss_dam.challenge.model.response.AdminChallengeParticipantView;
import com.ss_dam.challenge.model.response.AdminChallengeRankingView;

public interface AdminChallengeDetailDao {

    // 챌린지 상세 조회
    AdminChallengeDetailView loadChallenge(Long code);

    // 삭제 여부와 관계없이 챌린지 존재 확인
    boolean existsChallengeIncludingDeleted(Long code);

    // 참여자 전체 건수
    long countParticipants(Map<String, Object> params);

    // 참여자 목록
    List<AdminChallengeParticipantView> loadParticipants(
            Map<String, Object> params);

    // 참여 순위
    List<AdminChallengeRankingView> loadChallengeRanking(
            Map<String, Object> params);

    // 지정 기간 신규 인증글 수
    long countNewChallengeProofs(Map<String, Object> params);

    // 지정 기간 신규 참여자 수
    long countNewChallengeParticipants(Map<String, Object> params);

    // 오늘·어제 시간별 신규 참여자 수
    List<AdminChallengeHourlyCount> loadChallengeHourlyParticipants(
            Map<String, Object> params);
}