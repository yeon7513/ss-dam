package com.ss_dam.auth.member.mypage.dao;

import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import com.ss_dam.auth.member.Member;

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
}