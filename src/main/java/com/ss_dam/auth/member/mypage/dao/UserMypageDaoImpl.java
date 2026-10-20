package com.ss_dam.auth.member.mypage.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import com.ss_dam.auth.member.Member;
import com.ss_dam.auth.member.mypage.model.filter.MypageChallengeSearchFilter;
import com.ss_dam.auth.member.mypage.model.response.MyChallengeProgressView;
import com.ss_dam.auth.member.mypage.model.response.MyRankingView;
import com.ss_dam.auth.member.mypage.model.response.MypageChallengeView;

@Repository
public class UserMypageDaoImpl implements UserMypageDao {

  @Override
  public List<Map<String, Object>> searchMyPurchases(Map<String, Object> params) {
    return sql.selectList("mypage.searchMyPurchases", params);
  }

  @Override
  public long countMyPurchases(Map<String, Object> params) {
    return sql.selectOne("mypage.countMyPurchases", params);
  }

  @Override
  public Map<String, Object> searchMyPurchasesSummary(Map<String, Object> params) {
    return sql.selectOne("mypage.searchMyPurchasesSummary", params);
  }

  private final SqlSession sql;

  public UserMypageDaoImpl(SqlSession sql) {
    this.sql = sql;
  }

  // 참여 현황 - 멤버 프로필 부분
  @Override
  public long searchTotalEarnedPoint(Long memberCode) {
    return sql.selectOne(
        "mypage.searchTotalEarnedPoint",
        Map.of("memberCode", memberCode)
    );
  }

  @Override
  public Member searchProfile(Long memberCode) {
    return sql.selectOne(
        "mypage.searchProfile",
        Map.of("memberCode", memberCode)
    );
  }

  @Override
  public long countCompletedChallenges(Long memberCode) {
    return sql.selectOne(
        "mypage.countCompletedChallenges",
        Map.of("memberCode", memberCode)
    );
  }

  @Override
  public Long searchChallengeRanking(Long memberCode) {
    return sql.selectOne(
        "mypage.searchChallengeRanking",
        Map.of("memberCode", memberCode)
    );
  }

    // 참여한 챌린지 목록
  @Override
  public List<MypageChallengeView> searchMyChallenges(MypageChallengeSearchFilter filter) {
    return sql.selectList("mypage.searchMyChallenges", filter);
  }

  // 참여한 챌린지 전체 개수
  @Override
  public float countMyChallenges(MypageChallengeSearchFilter filter) {
    return sql.selectOne("mypage.countMyChallenges", filter);
  }

  // 참여한 챌린지 요약
  @Override
  public Map<String, Object> searchMyChallengeSummary(Long memberCode) {
    return sql.selectOne(
        "mypage.searchMyChallengeSummary",
        Map.of("memberCode", memberCode)
    );
  }
  @Override
  public List<Map<String, Object>> searchMySales(Map<String, Object> params) {
    return sql.selectList("mypage.searchMySales", params);
  }

  @Override
  public float countMySales(Map<String, Object> params) {
    return sql.selectOne("mypage.countMySales", params);
  }

  @Override
  public Map<String, Object> searchMySalesSummary(Long memberCode) {
    return sql.selectOne("mypage.searchMySalesSummary", memberCode);
  }

  @Override
  public Map<String, Object> searchLikedFeedSummary(Long memberCode) {
    return sql.selectOne("mypage.searchLikedFeedSummary", memberCode);
  }

  // 챌린지 - 내 랭킹 조회
  @Override
  public List<MyChallengeProgressView> searchRecentChallengeProgress(
      Long memberCode
  ) {
    return sql.selectList(
        "mypage.searchRecentChallengeProgress",
        Map.of("memberCode", memberCode)
    );
  }

  @Override
  public MyRankingView searchMyScoreRanking(Long memberCode) {
    return sql.selectOne(
        "mypage.searchMyScoreRanking",
        Map.of("memberCode", memberCode)
    );
  }

  @Override
  public List<MyRankingView> searchScoreRankings(
      Map<String, Object> params
  ) {
    return sql.selectList("mypage.searchScoreRankings", params);
  }

  @Override
  public long countRankingMembers() {
    return sql.selectOne("mypage.countRankingMembers");
  }

  @Override
  public List<Map<String, Object>> searchMyComments(
      Map<String, Object> params
  ) {
    return sql.selectList("mypage.searchMyComments", params);
  }

  @Override
  public long countMyComments(Map<String, Object> params) {
    return sql.selectOne("mypage.countMyComments", params);
  }

}
