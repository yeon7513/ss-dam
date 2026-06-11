package com.ss_dam.auth.login.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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

}
