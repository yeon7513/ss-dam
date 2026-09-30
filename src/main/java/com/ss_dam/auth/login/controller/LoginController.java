package com.ss_dam.auth.login.controller;

import com.ss_dam.auth.login.model.request.Login;
import com.ss_dam.auth.login.model.response.AuthProfile;
import com.ss_dam.auth.login.service.LoginService;
import com.ss_dam.common.ApiResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class LoginController {

  private final LoginService loginService;

  public LoginController(LoginService loginService) {
    this.loginService = loginService;
  }

  @PostMapping("/login")
  public ResponseEntity<ApiResponse<AuthProfile>> login(@RequestBody Login loginForm,
      HttpSession session, HttpServletRequest request) {

    AuthProfile loggedInUser = loginService.login(loginForm, request.getRemoteAddr());

    // 로그인 실패 시 -> DB 조회 실패
    if (loggedInUser == null) {
      return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(ApiResponse.fail("로그인 실패"));
    }

    session.setAttribute("loginUser", loggedInUser);
    
    return ResponseEntity.ok(ApiResponse.success("로그인 성공", loggedInUser));
  }

  @PostMapping("/logout")
  public ResponseEntity<ApiResponse<Void>> logout(HttpSession session) {

    session.invalidate();

    ApiResponse<Void> response = ApiResponse.success("로그아웃 되었습니다", null);

    return ResponseEntity.ok(response);
  }

  @GetMapping("/check")
  public ResponseEntity<ApiResponse<Login>> checkSession(HttpSession session) {
    // 세션에서 유저 정보 꺼내기
    Login user = (Login) session.getAttribute("loginUser");

    if (user != null) {
      // 세션이 살아있으면 200 OK와 유저 정보 반환
      return ResponseEntity.ok(ApiResponse.success("로그인 상태 유지 중", user));
    } else {
      // 세션이 죽었으면 401 Unauthorized 반환
      return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
          .body(ApiResponse.fail("로그인되지 않은 상태입니다."));
    }
  }

}
