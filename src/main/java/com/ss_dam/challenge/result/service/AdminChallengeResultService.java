package com.ss_dam.challenge.result.service;

import com.ss_dam.challenge.model.response.AdminChallengeRankingView;
import com.ss_dam.challenge.result.model.request.AdminChallengeResultSearch;
import com.ss_dam.challenge.result.model.response.AdminChallengeResultDetailView;
import com.ss_dam.challenge.result.model.response.AdminChallengeResultListView;
import com.ss_dam.challenge.result.model.response.AdminChallengeResultStatisticsView;
import com.ss_dam.common.pager.PageQuery;
import com.ss_dam.common.pager.PageResult;

public interface AdminChallengeResultService {

    // 종료 결과 목록
    PageResult<AdminChallengeResultListView> loadChallenges(
            AdminChallengeResultSearch search);

    // 상세 기본 정보
    AdminChallengeResultDetailView loadChallenge(Long code);

    // 최종 통계 및 차트
    AdminChallengeResultStatisticsView loadChallengeStatistics(Long code);

    // 최종 참여 순위 페이지
    PageResult<AdminChallengeRankingView> loadChallengeRanking(
            Long code,
            PageQuery pageQuery);
}