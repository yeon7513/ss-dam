package com.ss_dam.common.validator.auth;

import com.ss_dam.auth.login.model.response.AuthProfile;
import jakarta.servlet.http.HttpSession;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ResponseStatusException;

@Component
public class AuthValidator {

  // "필수" 세션 추출 메소드
  // -> 로그인을 해야만 하는 서비스 전용
  // -> 즉, 로그인 안하면? 바로 에러를 던짐
  public AuthProfile requireLogin(HttpSession session) {
    AuthProfile loginUser = (AuthProfile) session.getAttribute("loginUser");

    if (loginUser == null) {
      throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "로그인이 필요합니다.");
    }

    return loginUser;
  }

  // "선택" 세션 추출 메소드
  // -> 필요한 이유??
  // --> 목록 또는 상세는 비회원 & 회원이 접근이 가능함.
  // --> 사용자의 로그인 여부에 따라 상호작용 데이터가 필요하기 때문
  public AuthProfile getLoginUser(HttpSession session) {
    if (session == null) {
      return null;
    }

    return (AuthProfile) session.getAttribute("loginUser");
  }


  // !!! 이 밑으로는 사실 필요없음..
  // -> 인터셉터가 인가 검증을 하기 때문

  // 일반 회원 전용 검사
  // -> 관리자는 일반 회원 전용 서비스를 이용할 수 없음
  public AuthProfile requireMember(HttpSession session) {
    AuthProfile loginUser = requireLogin(session);

    String role = loginUser.getRole();

    if (!"MEMBER".equalsIgnoreCase(role)) {
      throw new ResponseStatusException(HttpStatus.FORBIDDEN,
          "관리자 계정으로는 일반 회원 서비스를 이용할 수 없습니다. 사용자 모드로 전환해주세요.");
    }

    return loginUser;
  }


  // 관리자 권한 검사
  // -> 일반 사용자는 관리자 전용 서비스를 이용할 수 없음
  public AuthProfile requireAdmin(HttpSession session) {

    AuthProfile loginUser = requireLogin(session);

    String role = loginUser.getRole();

    if (!"ROLE_SUPER".equalsIgnoreCase(role) && !"ROLE_MANAGER".equalsIgnoreCase(
        role) && !"ROLE_STAFF".equalsIgnoreCase(role)) {
      throw new ResponseStatusException(HttpStatus.FORBIDDEN, "관리자만 사용할 수 있습니다.");
    }
    return loginUser;
  }

  // 회원 관리 권한 확인: SUPER·MANAGER만 허용
  public AuthProfile requireMemberManager(HttpSession session) {

    AuthProfile admin = requireAdmin(session);

    String role = admin.getRole();

    if (!"ROLE_SUPER".equalsIgnoreCase(role) && !"ROLE_MANAGER".equalsIgnoreCase(role)) {
      throw new ResponseStatusException(HttpStatus.FORBIDDEN, "회원 관리 권한이 없습니다.");
    }

    if (admin.getCode() == null) {
      throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "관리자 정보가 없습니다. 다시 로그인해주세요.");
    }

    return admin;
  }
}
