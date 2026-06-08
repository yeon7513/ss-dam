package com.ss_dam.auth.login.dao;

import java.util.Map;

import com.ss_dam.auth.login.Login;
import com.ss_dam.auth.member.Member;

public interface LoginDao {

	Member findById(String memberId);
	
	Login findMemberForLogin(Map<String, String> paramMap);
	Login findAdminForLogin(Map<String, String> paramMap);

}
