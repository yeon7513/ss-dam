package com.ss_dam.auth.login.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ss_dam.auth.login.Login;
import com.ss_dam.auth.login.service.LoginService;
import com.ss_dam.common.ApiResponse;

import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/api/auth")
public class LoginController {

	@Autowired
	private LoginService loginService;

	@PostMapping("/login")
	public ResponseEntity<ApiResponse<Login>> login(@RequestBody Login loginForm, HttpSession session) {

		Login loggedInUser = loginService.login(loginForm);

		if (loggedInUser != null) {
			session.setAttribute("loginUser", loggedInUser);

			loggedInUser.setPassword(null);

			ApiResponse<Login> response = ApiResponse.success("성공", loggedInUser);

			return ResponseEntity.ok(response);
		} else {

			ApiResponse<Login> errorResponse = ApiResponse.fail("실패");

			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(errorResponse);
		}
	}
	
	@PostMapping("/logout")
	public ResponseEntity<ApiResponse<Void>> logout(HttpSession session){
		
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
