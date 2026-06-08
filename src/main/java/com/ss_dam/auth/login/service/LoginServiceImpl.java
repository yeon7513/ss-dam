package com.ss_dam.auth.login.service;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ss_dam.auth.login.Login;
import com.ss_dam.auth.login.dao.LoginDao;

@Service
public class LoginServiceImpl implements LoginService {
	
	@Autowired
	private LoginDao loginDao;
	
	@Override
	public Login login(Login loginForm) {
		
		Map<String, String> paramMap = new HashMap<>();
		paramMap.put("id", loginForm.getMemberId());
		paramMap.put("password", loginForm.getPassword());
		
		Login user = loginDao.findMemberForLogin(paramMap);
		
		if(user == null) {
			user = loginDao.findAdminForLogin(paramMap);
		}
		
		return user;
	}

}
