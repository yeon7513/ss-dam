package com.ss_dam.auth.login.service;

import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ss_dam.auth.login.dao.LoginDao;
import com.ss_dam.auth.login.model.request.Login;
import com.ss_dam.auth.login.model.response.AdminProfile;
import com.ss_dam.auth.login.model.response.AuthProfile;
import com.ss_dam.auth.login.model.response.MemberProfile;
import com.ss_dam.auth.member.enums.MemberActivityType;
import com.ss_dam.auth.member.service.MemberAccessService;

@Service
public class LoginServiceImpl implements LoginService {

    private final LoginDao loginDao;
    private final MemberAccessService memberAccessService;

    public LoginServiceImpl(
            LoginDao loginDao,
            MemberAccessService memberAccessService) {

        this.loginDao = loginDao;
        this.memberAccessService = memberAccessService;
    }


  @Override
  @Transactional
  public AuthProfile login(Login loginForm, String clientIp) {

    MemberProfile memberProfile = loginDao.findMemberForLogin(loginForm);

    if (memberProfile != null && "MEMBER".equals(memberProfile.getRole())) {

      // 로그인 성공 이력을 저장하기 전에 이용 가능 여부 검사
      // 회원 기본 상태 및 신고 제재 확인
      // 제한 중이면 예외 발생: 세션 생성 및 로그인 성공 기록 안 함
      memberAccessService.checkMemberAccess(memberProfile.getCode());


      // 일반 회원 로그인 성공 → 이력 저장
      //DAO 호출 추가
      //회원번호, 아이디, 활동 유형, 사유, IP를 전달
      Map<String, Object> activityParams = new HashMap<>();

      activityParams.put("memberCode", memberProfile.getCode());
      activityParams.put("actionType", MemberActivityType.LOGIN_SUCCESS.name());
      activityParams.put("actionReason", MemberActivityType.LOGIN_SUCCESS.getDescription());
      activityParams.put("actionedBy", memberProfile.getId());
      activityParams.put("actionedIp", clientIp);

      loginDao.insertLoginActivity(activityParams);

      return memberProfile;
    }

    AdminProfile adminProfile = loginDao.findAdminForLogin(loginForm);

    if (adminProfile != null && adminProfile.getRole() != null) {

      // 관리자 활동 로그 작성할 것

      return adminProfile;
    }

    // 위 조건문을 전부 통과한다면? -> 로그인 실패
    return null;
  }

}
