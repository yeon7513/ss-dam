package com.ss_dam.challenge.result.dao;

import java.util.List;
import java.util.Map;

import com.ss_dam.challenge.result.model.internal.ChallengeResultRow;
import com.ss_dam.challenge.result.model.response.AdminChallengeResultDetailView;
import com.ss_dam.challenge.result.model.response.AdminChallengeResultListView;

public interface AdminChallengeResultDao {

    // 검색 조건에 맞는 종료 결과 개수
    long countChallenges(Map<String, Object> params);

    // 종료 결과 목록
    List<AdminChallengeResultListView> loadChallenges(
            Map<String, Object> params);

    // 조회 가능한 종료 챌린지인지 확인
    boolean existsEndedChallenge(Map<String, Object> params);

    // 종료 결과 저장 완료 여부
    boolean isSnapshotReady(Long code);

    // 상세 정보
    AdminChallengeResultDetailView loadChallenge(Long code);

    // 최종 요약 통계 + 저장된 시간대별 인증 수 + 저장된 지역별 참여 인원 + 저장된 최종 순위의 전체 회원 수 + 저장된 최종 순위 페이지 조회
    // 이 메서드의 XML은 CHALLENGE_RESULT에서 완료된 한 행의 요약 통계와 JSON 3개를 조회
    ChallengeResultRow loadCompletedResult(Long code);

}