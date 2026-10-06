package com.ss_dam.common.validator.auth;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ResponseStatusException;

import com.ss_dam.auth.login.model.response.AuthProfile;

import jakarta.servlet.http.HttpSession;

// 기존 컨트롤러의 AuthProfile import 추가

// 인터셉터 구현 또는 Spring Security의 @PreAuthorize 방식으로 바뀌면 파일 삭제 

@Component
public class AdminAuthValidator {

    // 로그인·관리자 권한 검사
    // 검사에 통과하면 로그인한 관리자 정보 반환
    public AuthProfile requireAdmin(HttpSession session) {

        AuthProfile loginUser =
                (AuthProfile) session.getAttribute("loginUser");

        if (loginUser == null) {
            throw new ResponseStatusException(
                    HttpStatus.UNAUTHORIZED,
                    "로그인이 필요합니다.");
        }

        String role = loginUser.getRole();

        if (!"ROLE_SUPER".equals(role)
                && !"ROLE_MANAGER".equals(role)
                && !"ROLE_STAFF".equals(role)) {

            throw new ResponseStatusException(
                    HttpStatus.FORBIDDEN,
                    "관리자만 사용할 수 있습니다.");
        }
        return loginUser;
    }

    // 회원 관리 권한 확인: SUPER·MANAGER만 허용
public AuthProfile requireMemberManager(HttpSession session) {

    AuthProfile admin = requireAdmin(session);

    if (!"ROLE_SUPER".equals(admin.getRole())
            && !"ROLE_MANAGER".equals(admin.getRole())) {

        throw new ResponseStatusException(
                HttpStatus.FORBIDDEN,
                "회원 관리 권한이 없습니다.");
    }

    if (admin.getCode() == null) {
        throw new ResponseStatusException(
                HttpStatus.UNAUTHORIZED,
                "관리자 정보가 없습니다. 다시 로그인해주세요.");
    }

    return admin;
}


}