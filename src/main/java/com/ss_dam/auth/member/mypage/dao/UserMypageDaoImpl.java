package com.ss_dam.auth.member.mypage.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import com.ss_dam.auth.member.Member;
import com.ss_dam.auth.member.mypage.model.filter.MypageChallengeSearchFilter;
import com.ss_dam.auth.member.mypage.model.response.MypageChallengeView;

@Repository
public class UserMypageDaoImpl implements UserMypageDao {

  private final SqlSession sql;

  public UserMypageDaoImpl(SqlSession sql) {
    this.sql = sql;
  }

  // 참여 현황 - 멤버 프로필 부분
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
  
}