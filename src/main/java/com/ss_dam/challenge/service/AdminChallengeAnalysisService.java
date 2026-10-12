package com.ss_dam.challenge.service;

import com.ss_dam.challenge.model.request.analysis_request.AdminChallengeAnalysisSearch;
import com.ss_dam.challenge.model.response.AdminChallengeRankingView;
import com.ss_dam.challenge.model.response.analysis_response.AdminChallengeAnalysisDetailView;
import com.ss_dam.challenge.model.response.analysis_response.AdminChallengeAnalysisListView;
import com.ss_dam.challenge.model.response.analysis_response.AdminChallengeAnalysisStatisticsView;
import com.ss_dam.common.pager.PageQuery;
import com.ss_dam.common.pager.PageResult;

public interface AdminChallengeAnalysisService {

    // 종료 결과 목록 조회
    PageResult<AdminChallengeAnalysisListView> loadChallenges(
            AdminChallengeAnalysisSearch search);

    // 종료 챌린지 상세 정보 조회
    AdminChallengeAnalysisDetailView loadChallenge(Long code);

    // 저장된 최종 통계 및 차트 조회
    AdminChallengeAnalysisStatisticsView loadChallengeStatistics(Long code);

    // 저장된 최종 참여 순위 조회
    PageResult<AdminChallengeRankingView> loadChallengeRanking(
            Long code,
            PageQuery pageQuery);
}