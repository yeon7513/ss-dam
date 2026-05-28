package com.ss_dam.auth.login.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ss_dam.auth.login.Login;
import com.ss_dam.auth.member.Member;
import com.ss_dam.auth.member.dao.MemberDao;

@Service
public class LoginServiceImpl implements LoginService {
	
	@Autowired
	private MemberDao memberDao;
	
	@Override
	public boolean login(Login loginForm) {
		
		Member dbMember = memberDao.findById(loginForm.getMemberId());
		
		if(dbMember != null
				&& !dbMember.isDeleteYn()
				&& dbMember.getPassword().equals(loginForm.getPassword())) {
			return true;
		}
		
		return false;
	}

}
