package com.ss_dam.auth.find.dao;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import com.ss_dam.auth.find.model.ChangePassword;
import com.ss_dam.auth.find.model.FindMember;
import com.ss_dam.auth.login.model.response.MemberProfile;

@Repository
public class FindMemberDaoImpl implements FindMemberDao {

  private final SqlSession sql;

  public FindMemberDaoImpl (SqlSession sql) {
    this.sql = sql;
  }

  @Override
  public MemberProfile findMemberId(FindMember findMember) {
    return sql.selectOne("member.findMemberId", findMember);
  }

  @Override
  public Long findMemberPw(FindMember findMember) {
    return sql.selectOne("member.findMemberPw", findMember);
  }

  @Override
  public int changePassword(ChangePassword changePassword) {
    return sql.update("member.changePassword", changePassword);
  }
}
