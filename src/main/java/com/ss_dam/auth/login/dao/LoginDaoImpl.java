package com.ss_dam.auth.login.dao;

import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.ss_dam.auth.login.Login;
import com.ss_dam.auth.member.Member;

@Repository
public class LoginDaoImpl implements LoginDao {

	@Autowired
	private SqlSession sql;
	
	@Override
	public Member findById(String memberId) {
	
		return sql.selectOne("member.findById", memberId);
	}

	@Override
	public Login findMemberForLogin(Map<String, String> paramMap) {
		
		return sql.selectOne("member.findMemberForLogin", paramMap);
	}

	@Override
	public Login findAdminForLogin(Map<String, String> paramMap) {
		
		return sql.selectOne("member.findAdminForLogin", paramMap);
	}

}

