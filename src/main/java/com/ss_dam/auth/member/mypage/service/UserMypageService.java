package com.ss_dam.auth.member.mypage.service;

import java.util.List;
import java.util.Map;

import com.ss_dam.auth.member.mypage.model.filter.MypageChallengeSearchFilter;
import com.ss_dam.auth.member.mypage.model.response.MyChallengeProgressView;
import com.ss_dam.auth.member.mypage.model.response.MyRankingView;
import com.ss_dam.auth.member.mypage.model.response.MypageChallengeView;
import com.ss_dam.auth.member.mypage.model.response.MypageProfileView;
import com.ss_dam.common.pager.PageQuery;
import com.ss_dam.common.pager.PageResult;

public interface UserMypageService {

  MypageProfileView getProfile(Long memberCode);

  // 참여한 챌린지 목록 (페이지네이션)
  PageResult<MypageChallengeView> getMyChallenges(MypageChallengeSearchFilter filter, Long memberCode);

  // 참여한 챌린지 요약
  Map<String, Object> getMyChallengeSummary(Long memberCode);

  PageResult<Map<String, Object>> getMySales(PageQuery query, Long memberCode);

  Map<String, Object> getMySalesSummary(Long memberCode);

  PageResult<Map<String, Object>> getMyPurchases(PageQuery query, Long memberCode);

  Map<String, Object> getMyPurchasesSummary(Long memberCode);

  Map<String, Object> getLikedFeedSummary(Long memberCode);

  // 챌린지 - 내 랭킹 조회
  List<MyChallengeProgressView> getRecentChallengeProgress(Long memberCode);

  MyRankingView getMyScoreRanking(Long memberCode);

  PageResult<MyRankingView> getScoreRankings(
      PageQuery query,
      Long memberCode
  );

  PageResult<Map<String, Object>> getMyComments(
      PageQuery query,
      Long memberCode
  );
}
