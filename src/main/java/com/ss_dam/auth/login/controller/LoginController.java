package com.ss_dam.auth.login.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ss_dam.auth.login.Login;
import com.ss_dam.auth.login.service.LoginService;

@RestController
@RequestMapping("/auth")
public class LoginController {

	@Autowired
	private LoginService loginService;

	@PostMapping("/login")
	public ResponseEntity<Map<String, Object>> login(@RequestBody Login loginForm){
		
		Map<String, Object> response = new HashMap<>();
		boolean isSuccess = loginService.login(loginForm);
		
		if(isSuccess) {
			response.put("success", true);
			response.put("message", "로그인 성공");
			
			return ResponseEntity.ok(response);
		}else {
			response.put("success", false);
			response.put("message", "아이디나 비밀번호가 틀렸거나 없는 회원");
			
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
		}
	}
		
}
