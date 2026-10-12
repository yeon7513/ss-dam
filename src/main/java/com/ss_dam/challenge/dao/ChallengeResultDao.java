package com.ss_dam.challenge.dao;

import java.time.LocalDateTime;
import java.util.Map;

// 종료 처리 Service에서 최종 결과를 계산·저장할 때 사용하는 DAO

public interface ChallengeResultDao {

    // 종료 챌린지 행 잠금 및 종료 시각 조회
    LocalDateTime lockEndedChallenge(Map<String, Object> params);

    // 이미 완료된 결과가 있는지 확인
    boolean existsCompletedResult(Long challengeCode);
    
    // 결과 헤더 생성
    int insertResultHeader(Map<String, Object> params);

    // 회원별 최종 성과 및 순위 저장
    int insertMemberResults(Map<String, Object> params);

    // 최종 요약 통계 저장
    int insertSummary(Map<String, Object> params);

    // 시간대별 인증 수 저장
    int insertHourlyResults(Map<String, Object> params);

    // 지역별 참여 인원 저장
    int insertRegionResults(Map<String, Object> params);

    // 모든 결과 저장 후 완료 상태로 변경
    int markCompleted(Map<String, Object> params);
}