package com.ss_dam.auth.find.dao;

import com.ss_dam.auth.find.model.ChangePassword;
import com.ss_dam.auth.find.model.FindMember;
import com.ss_dam.auth.login.model.response.MemberProfile;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class FindMemberDaoImpl implements FindMemberDao {

  @Autowired
  private SqlSession sql;

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
