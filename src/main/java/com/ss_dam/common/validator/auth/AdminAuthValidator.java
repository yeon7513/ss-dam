package com.ss_dam.common.validator.auth;

import com.ss_dam.auth.login.enums.AuthRole;
import com.ss_dam.auth.login.model.response.AuthProfile;
import jakarta.servlet.http.HttpSession;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ResponseStatusException;

@Component
public class AdminAuthValidator {

  // 로그인·관리자 권한 검사
  // 검사에 통과하면 로그인한 관리자 정보 반환
  public AuthProfile requireAdmin(HttpSession session) {

    AuthProfile loginUser = (AuthProfile) session.getAttribute("loginUser");

    if (loginUser == null) {
      throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "로그인이 필요합니다.");
    }

    if (loginUser.getRole() == AuthRole.ROLE_MEMBER) {
      throw new ResponseStatusException(HttpStatus.FORBIDDEN, "관리자만 사용할 수 있습니다.");
    }

    return loginUser;
  }

  // 회원 관리 권한 확인: SUPER·MANAGER만 허용
  public AuthProfile requireMemberManager(HttpSession session) {
    AuthProfile admin = requireAdmin(session);

    if (admin.getRole() != AuthRole.ROLE_SUPER && admin.getRole() != AuthRole.ROLE_MANAGER) {
      throw new ResponseStatusException(HttpStatus.FORBIDDEN, "회원 관리 권한이 없습니다.");
    }

    if (admin.getCode() == null) {
      throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "관리자 정보가 없습니다. 다시 로그인해주세요.");
    }

    return admin;
  }
}
