package com.ss_dam.auth.login.dao;

import com.ss_dam.auth.login.model.request.Login;
import com.ss_dam.auth.login.model.response.AdminProfile;
import com.ss_dam.auth.login.model.response.MemberProfile;
import com.ss_dam.auth.member.Member;

import java.util.Map;

public interface LoginDao {

  Member findById(String memberId);

  MemberProfile findMemberForLogin(Login loginForm);

  AdminProfile findAdminForLogin(Login paramMap);

  int insertLoginActivity(Map<String, Object> params);

}
