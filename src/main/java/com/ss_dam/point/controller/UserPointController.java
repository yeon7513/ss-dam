package com.ss_dam.point.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ss_dam.auth.login.Login;
import com.ss_dam.common.ApiResponse;
import com.ss_dam.point.service.UserPointService;

import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/api/point")
public class UserPointController {
	
	private final UserPointService pointService;
	
	public UserPointController(UserPointService pointService) {
		this.pointService = pointService;
	}
	
	@GetMapping("/balance")
	public ResponseEntity<ApiResponse<Integer>> getPointBalance(HttpSession session){
		
		Login loginUser = (Login) session.getAttribute("loginUser");
		
		if(loginUser == null) {
			
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
					.body(ApiResponse.fail("로그인이 필요한 페이지입니다"));
		}
		
		int balance = pointService.getPointBalance(loginUser.getCode());
		
		return ResponseEntity.ok(ApiResponse.success("보유한 현재 포인트 조회에 성공했습니다", balance));
	}

}
