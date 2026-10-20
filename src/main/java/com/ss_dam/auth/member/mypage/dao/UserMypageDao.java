package com.ss_dam.auth.member.mypage.dao;

import java.util.List;
import java.util.Map;

import com.ss_dam.auth.member.Member;
import com.ss_dam.auth.member.mypage.model.filter.MypageChallengeSearchFilter;
import com.ss_dam.auth.member.mypage.model.response.MyChallengeProgressView;
import com.ss_dam.auth.member.mypage.model.response.MyRankingView;
import com.ss_dam.auth.member.mypage.model.response.MypageChallengeView;

public interface UserMypageDao {

  Member searchProfile(Long memberCode);

  long searchTotalEarnedPoint(Long memberCode);

  long countCompletedChallenges(Long memberCode);

  Long searchChallengeRanking(Long memberCode);

  // 참여한 챌린지 목록
  List<MypageChallengeView> searchMyChallenges(MypageChallengeSearchFilter filter);

  // 참여한 챌린지 전체 개수 (페이지네이션용)
  float countMyChallenges(MypageChallengeSearchFilter filter);

  // 참여한 챌린지 요약 (총 참여, 진행 중, 완료, 획득 그루)
  Map<String, Object> searchMyChallengeSummary(Long memberCode);

  List<Map<String, Object>> searchMySales(Map<String, Object> params);

  float countMySales(Map<String, Object> params);

  Map<String, Object> searchMySalesSummary(Long memberCode);

  List<Map<String, Object>> searchMyPurchases(Map<String, Object> params);

  long countMyPurchases(Map<String, Object> params);

  Map<String, Object> searchMyPurchasesSummary(Map<String, Object> params);

  Map<String, Object> searchLikedFeedSummary(Long memberCode);

  // 챌린지 - 내 랭킹 조회
  List<MyChallengeProgressView> searchRecentChallengeProgress(Long memberCode);

  MyRankingView searchMyScoreRanking(Long memberCode);

  List<MyRankingView> searchScoreRankings(Map<String, Object> params);

  long countRankingMembers();

  // 내가 작성한 댓글
  List<Map<String, Object>> searchMyComments(Map<String, Object> params);

  long countMyComments(Map<String, Object> params);
}
