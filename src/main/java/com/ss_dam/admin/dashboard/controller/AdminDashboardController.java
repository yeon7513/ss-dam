package com.ss_dam.admin.dashboard.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ss_dam.common.ApiResponse;

//관리자 대시보드

@RestController
@RequestMapping("/api/admin/")
public class AdminController {

	@GetMapping("/check")
	public ResponseEntity<ApiResponse<Void>> checkAdmin(){
		
		return ResponseEntity.ok(ApiResponse.success("관리자 권한 확인 성공", null));
	}
}

/*대시보드에 표시할 요약 정보와 기간별 통계를 조회합니다.
- GET /dashboard/summary → getDashboardSummary()
  - 전체 회원 수, 신규 가입 수, 미처리 신고 수, 진행 중 챌린지 수
- GET /dashboard/statistics/members → getMemberStatistics()
  - 기간별 가입자 수, 활성 회원 수, 탈퇴자 수
- GET /dashboard/statistics/feeds → getFeedStatistics()
  - 피드 등록 수, 댓글 수 등
- GET /dashboard/statistics/market → getMarketStatistics()
  - 마켓 등록 수, 거래 완료 수 등
- GET /dashboard/statistics/challenges → getChallengeStatistics()
  - 챌린지 생성 수, 참여자 수, 완료율 
	*/
