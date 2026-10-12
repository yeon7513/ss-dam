package com.ss_dam.challenge.result.dao;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

import com.ss_dam.challenge.model.response.AdminChallengeRankingView;
import com.ss_dam.challenge.result.model.internal.ChallengeResultRow;
import com.ss_dam.challenge.result.model.response.AdminChallengeResultStatisticsView;
import com.ss_dam.challenge.result.model.response.AdminChallengeResultStatisticsView.HourlyProof;
import com.ss_dam.challenge.result.model.response.AdminChallengeResultStatisticsView.RegionParticipant;

// 챌린지 종료 결과 집계 및 저장
public interface ChallengeResultDao {

    // 종료 챌린지 행 잠금 및 종료 시각 조회
    LocalDateTime lockEndedChallenge(Map<String, Object> params);

    // 저장 완료된 결과 존재 여부
    boolean existsCompletedResult(Long challengeCode);

    // 상태와 관계없이 결과 존재 여부
    boolean existsResult(Long challengeCode);

    // 전체 참여자의 최종 성과 및 순위 계산
    List<AdminChallengeRankingView> calculateMemberResults(
            Map<String, Object> params);

    // 최종 요약 통계 계산
    AdminChallengeResultStatisticsView calculateStatistics(
            Map<String, Object> params);

    // 시간대별 인증글 수 집계
    List<HourlyProof> calculateHourlyProofs(
            Map<String, Object> params);

    // 지역별 참여 인원 집계
    List<RegionParticipant> calculateRegionParticipants(
            Map<String, Object> params);

    // 요약 통계와 JSON을 하나의 완료 결과로 저장
    int insertCompletedResult(ChallengeResultRow row);

    // 저장된 결과가 없는 종료 챌린지 번호 조회
    List<Long> findPendingResultCodes(Map<String, Object> params);
}