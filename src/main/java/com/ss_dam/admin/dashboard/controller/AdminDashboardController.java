package com.ss_dam.admin.dashboard.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ss_dam.common.ApiResponse;

//관리자 대시보드
//대시보드 요약 카드와 통계 조회

@RestController
@RequestMapping("/api/admin/")
public class AdminDashboardController {

	@GetMapping("/check")
	public ResponseEntity<ApiResponse<Void>> checkAdmin(){
		
		return ResponseEntity.ok(ApiResponse.success("관리자 권한 확인 성공", null));
	}
}

