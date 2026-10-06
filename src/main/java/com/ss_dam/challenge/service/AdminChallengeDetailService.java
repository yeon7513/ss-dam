package com.ss_dam.challenge.service;

import com.ss_dam.challenge.model.response.AdminChallengeDetailView;
import com.ss_dam.challenge.model.response.AdminChallengeParticipantView;
import com.ss_dam.challenge.model.response.AdminChallengeRankingView;
import com.ss_dam.challenge.model.response.AdminChallengeStatisticsView;
import com.ss_dam.common.pager.PageQuery;
import com.ss_dam.common.pager.PageResult;

public interface AdminChallengeDetailService {

  // 챌린지 상세 조회
  AdminChallengeDetailView loadChallenge(Long code);

  // 챌린지 참여자 목록 조회
  PageResult<AdminChallengeParticipantView> loadParticipants(Long code, PageQuery pageQuery);

  // 챌린지 참여 순위 조회
  PageResult<AdminChallengeRankingView> loadChallengeRanking(Long code, PageQuery pageQuery);

  // 챌린지 상세 통계 조회
  AdminChallengeStatisticsView loadChallengeStatistics(Long code);
} 