package com.ss_dam.auth.member.rating.dao;

import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

@Repository
public class MemberRatingDaoImpl implements MemberRatingDao {

  private final SqlSession sql;

  public MemberRatingDaoImpl(SqlSession sql) {
    this.sql = sql;
  }

  @Override
  public long getRatingScore(Long memberCode) {
    return sql.selectOne(
        "memberRating.getRatingScore",
        Map.of("memberCode", memberCode)
    );
  }

}