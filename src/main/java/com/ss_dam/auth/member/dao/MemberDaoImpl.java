package com.ss_dam.auth.member.dao;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import com.ss_dam.auth.login.model.response.MemberProfile;
import com.ss_dam.auth.member.Member;

@Repository
public class MemberDaoImpl implements MemberDao {

  private final SqlSession sql;

  public MemberDaoImpl (SqlSession sql) {
    this.sql = sql;
  }

  @Override
  public MemberProfile searchProfileByMemberCode(Long code) {
    return sql.selectOne("member.searchProfileByMemberCode", code);
  }

  @Override
  public Long registerMember(Member member) {
    sql.insert("member.registerMember", member);

    return member.getCode();
  }

  @Override
  public Member searchMemberByCode(Long code) {
    return sql.selectOne("member.searchMemberByCode", code);
  }

  // 아이디 중복 확인
  @Override
  public int countById(String id) {
    return sql.selectOne("member.countById", id);
  }
  
}
