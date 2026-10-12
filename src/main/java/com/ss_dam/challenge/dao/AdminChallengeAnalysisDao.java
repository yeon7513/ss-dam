package com.ss_dam.challenge.dao;

import java.util.List;
import java.util.Map;

import com.ss_dam.challenge.model.response.AdminChallengeRankingView;
import com.ss_dam.challenge.model.response.analysis_response.AdminChallengeAnalysisDetailView;
import com.ss_dam.challenge.model.response.analysis_response.AdminChallengeAnalysisListView;
import com.ss_dam.challenge.model.response.analysis_response.AdminChallengeAnalysisStatisticsView;
import com.ss_dam.challenge.model.response.analysis_response.AdminChallengeAnalysisStatisticsView.HourlyProof;
import com.ss_dam.challenge.model.response.analysis_response.AdminChallengeAnalysisStatisticsView.RegionParticipant;

public interface AdminChallengeAnalysisDao {

    // 검색 조건에 맞는 종료 결과 개수
    long countChallenges(Map<String, Object> params);

    // 종료 결과 목록
    List<AdminChallengeAnalysisListView> loadChallenges(
            Map<String, Object> params);

    // 조회 가능한 종료 챌린지인지 확인
    boolean existsEndedChallenge(Map<String, Object> params);

    // 종료 결과 저장 완료 여부
    boolean isSnapshotReady(Long code);

    // 상세 정보
    AdminChallengeAnalysisDetailView loadChallenge(Long code);

    // 최종 요약 통계
    AdminChallengeAnalysisStatisticsView loadStatistics(Long code);

    // 저장된 시간대별 인증 수
    List<HourlyProof> loadHourlyProofs(Long code);

    // 저장된 지역별 참여 인원
    List<RegionParticipant> loadRegionParticipants(Long code);

    // 저장된 최종 순위의 전체 회원 수
    long countRankingMembers(Long code);

    // 저장된 최종 순위 페이지 조회
    List<AdminChallengeRankingView> loadChallengeRanking(
            Map<String, Object> params);
}