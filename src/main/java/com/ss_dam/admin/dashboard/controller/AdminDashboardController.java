package com.ss_dam.admin.dashboard.controller;

import java.time.LocalDate;
import java.util.List;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ss_dam.admin.dashboard.model.response.ChallengeRanking;
import com.ss_dam.admin.dashboard.model.response.ChallengeStatistics;
import com.ss_dam.admin.dashboard.model.response.DashboardSummary;
import com.ss_dam.admin.dashboard.model.response.MemberStatistics;
import com.ss_dam.admin.dashboard.model.response.RegionStatistics;
import com.ss_dam.admin.dashboard.model.response.SellerRanking;
import com.ss_dam.common.ApiResponse;

//관리자 대시보드

//대시보드는 관리 현황과 통계를 모아서 보여주고, 실제 관리는 각 기능 패키지에서 처리
//->대시보드 요약 카드와 통계 조회 기능

//프론트에서는 기간을 붙여 요청 
//-> GET /api/admin/dashboard/summary?from=2026-09-01&to=2026-09-30

@RestController
@RequestMapping("/api/admin/")
public class AdminDashboardController {

  

	@GetMapping("/check")
	public ResponseEntity<ApiResponse<Void>> checkAdmin(){
		
		return ResponseEntity.ok(ApiResponse.success("관리자 권한 확인 성공", null));
	}

  // GET /api/admin/dashboard/summary
    // → 상단 카드의 건수와 증감률 조회
    @GetMapping("/dashboard/summary")
    public ResponseEntity<ApiResponse<DashboardSummary>> getDashboardSummary(
            @RequestParam("from")
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate from,
            //2026-09-01 형태의 문자열을 LocalDate로 변환
            @RequestParam("to")
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate to) {

        DashboardSummary result =
                dashboardService.getDashboardSummary(from, to);

        return ResponseEntity.ok(
                ApiResponse.success("대시보드 요약 조회 성공", result));
    }

    // GET /api/admin/dashboard/statistics/members
    // → 월별 신규 회원 수 조회
    @GetMapping("/dashboard/statistics/members")
    public ResponseEntity<ApiResponse<List<MemberStatistics>>> getMemberStatistics(
            @RequestParam("from")
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate from,
            @RequestParam("to")
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate to) {

        List<MemberStatistics> result =
                dashboardService.getMemberStatistics(from, to);

        return ResponseEntity.ok(
                ApiResponse.success("회원 통계 조회 성공", result));
    }

    // GET /api/admin/dashboard/statistics/challenges
    // → 종료된 챌린지의 참여 건수와 달성률 조회
    @GetMapping("/dashboard/statistics/challenges")
    public ResponseEntity<ApiResponse<ChallengeStatistics>> getChallengeStatistics(
            @RequestParam("from")
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate from,
            @RequestParam("to")
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate to) {

        ChallengeStatistics result =
                dashboardService.getChallengeStatistics(from, to);

        return ResponseEntity.ok(
                ApiResponse.success("챌린지 통계 조회 성공", result));
    }

    // GET /api/admin/dashboard/statistics/challenges/ranking
    // → 참여자 수 기준 챌린지 인기 순위 조회
    @GetMapping("/dashboard/statistics/challenges/ranking")
    public ResponseEntity<ApiResponse<List<ChallengeRanking>>> getChallengeRanking(
            @RequestParam("from")
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate from,
            @RequestParam("to")
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate to) {

        List<ChallengeRanking> result =
                dashboardService.getChallengeRanking(from, to);

        return ResponseEntity.ok(
                ApiResponse.success("챌린지 인기 순위 조회 성공", result));
    }

    // GET /api/admin/dashboard/statistics/regions
    // → 지역별 챌린지 참여 건수와 비율 조회
    @GetMapping("/dashboard/statistics/regions")
    public ResponseEntity<ApiResponse<List<RegionStatistics>>> getRegionStatistics(
            @RequestParam("from")
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate from,
            @RequestParam("to")
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate to) {

        List<RegionStatistics> result =
                dashboardService.getRegionStatistics(from, to);

        return ResponseEntity.ok(
                ApiResponse.success("지역별 참여 통계 조회 성공", result));
    }

    // GET /api/admin/dashboard/statistics/sellers/ranking
    // → 거래 완료 금액 기준 우수 판매자 순위 조회
    @GetMapping("/dashboard/statistics/sellers/ranking")
    public ResponseEntity<ApiResponse<List<SellerRanking>>> getSellerRanking(
            @RequestParam("from")
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate from,
            @RequestParam("to")
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate to) {

        List<SellerRanking> result =
                dashboardService.getSellerRanking(from, to);

        return ResponseEntity.ok(
                ApiResponse.success("우수 판매자 순위 조회 성공", result));
    }
}