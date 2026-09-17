package com.ss_dam.auth.login.service;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ss_dam.auth.login.Login;
import com.ss_dam.auth.login.dao.LoginDao;
import com.ss_dam.auth.member.enums.MemberActivityType;

@Service
public class LoginServiceImpl implements LoginService {
	
	@Autowired
	private LoginDao loginDao;
	
	@Override
	@Transactional 
	public Login login(Login loginForm, String clientIp) {
		
		Map<String, String> paramMap = new HashMap<>();
		paramMap.put("id", loginForm.getMemberId());
		paramMap.put("password", loginForm.getPassword());
		
		Login user = loginDao.findMemberForLogin(paramMap);
		
		if(user != null) {
			// 일반 회원 로그인 성공 → 이력 저장
			//DAO 호출 추가
    	//회원번호, 아이디, 활동 유형, 사유, IP를 전달
			Map<String, Object> activityParams = new HashMap<>();

			activityParams.put("memberCode", user.getCode());
			activityParams.put("actionType", MemberActivityType.LOGIN_SUCCESS.name());
			activityParams.put("actionReason",
            MemberActivityType.LOGIN_SUCCESS.getDescription());
			activityParams.put("actionedBy", user.getMemberId());
			activityParams.put("actionedIp", clientIp);

			loginDao.insertLoginActivity(activityParams);

		} else {

			// 일반 회원으로 로그인되지 않으면 관리자 로그인 확인
			user = loginDao.findAdminForLogin(paramMap);
		}
		
		return user;
	}

}
