package com.ss_dam.auth.login.dao;

import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import com.ss_dam.auth.login.model.request.Login;
import com.ss_dam.auth.login.model.response.AdminProfile;
import com.ss_dam.auth.login.model.response.MemberProfile;
import com.ss_dam.auth.member.Member;

@Repository
public class LoginDaoImpl implements LoginDao {

  private final SqlSession sql;

  public LoginDaoImpl (SqlSession sql) {
    this.sql = sql;
  }
  
  @Override
  public Member findById(String memberId) {

    return sql.selectOne("member.findById", memberId);
  }

  @Override
  public MemberProfile findMemberForLogin(Login loginForm) {

    return sql.selectOne("member.findMemberForLogin", loginForm);
  }

  @Override
  public AdminProfile findAdminForLogin(Login loginForm) {

    return sql.selectOne("member.findAdminForLogin", loginForm);
  }

  @Override
  public int insertLoginActivity(Map<String, Object> params) {
    return sql.insert("member.insertLoginActivity", params);
  }

}

