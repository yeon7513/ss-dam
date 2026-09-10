package com.ss_dam.admin.dashboard.controller;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
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
import com.ss_dam.admin.dashboard.service.DashboardService;
import com.ss_dam.common.ApiResponse;

//관리자 대시보드

//대시보드는 관리 현황과 통계를 모아서 보여주고, 실제 관리는 각 기능 패키지에서 처리
//->대시보드 요약 카드와 통계 조회 기능

//프론트에서는 기간을 붙여 요청 
//-> GET /api/admin/dashboard/summary?from=2026-09-01&to=2026-09-30

@RestController
@RequestMapping("/api/admin/")
public class DashboardController {

@GetMapping("/check")
public ResponseEntity<ApiResponse<Void>> checkAdmin(){
        
        return ResponseEntity.ok(ApiResponse.success("관리자 권한 확인 성공", null));
}

@Autowired
  DashboardService dashboardService;

// GET /api/admin/dashboard/summary
// 요청 예시: GET /api/admin/dashboard/summary?from=2026-09-01&to=2026-09-09
// → 상단 카드의 건수와 증감률 조회
   
    @GetMapping("/dashboard/summary")
    public ResponseEntity<ApiResponse<DashboardSummary>> getDashboardSummary(

            //쿼리파라미터 from을 받음
            //"2026-09-01" 형식의 문자열을 LocalDate로 변환
            @RequestParam("from")
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate from,
            
            //쿼리파리미터 to를 받음
            //LocalDate는 시간 없이 날짜만 표현!
            @RequestParam("to")
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate to) {

        //통계 계산은 Service에 위임
        //Controller는 요청을 받고 응답을 반환하는 역할을 담당
        DashboardSummary result =
                dashboardService.getDashboardSummary(from, to);

        //HTTP 상태 코드 200 OK와 함께 응답을 반환
        //ApiResponse는 프로젝트에서 정의한 공통 응답 클래스
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

//GET /api/admin/dashboard/statistics/challenges
//→ 종료된 챌린지의 참여 건수와 달성률 조회

/* 집계 기준
* 조회 기간 안에 종료되었고, 현재 시점에도 종료된 챌린지를 대상으로 합니다.
* 참여 기록 한 건을 참여 1건으로 셉니다.
* STATUS = 'COMPLETED'이면 달성으로 봅니다. 프로젝트 샘플 데이터에서도 이 값을 사용
* 취소·삭제된 참여와 삭제된 챌린지는 제외
* 나머지 참여는 미달성으로 계산 
*/
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

/* 집계 기준
 *조회 기간에 참여한 회원 수를 기준으로 순위를 계산
 *참여일 JOINED_AT이 조회 기간에 속하는 기록을 집계
 *취소된 참여와 삭제된 챌린지는 제외
 *같은 회원이 같은 챌린지에 여러 기록을 남겨도 1명으로 집계 
 *참여자 수가 같으면 공동 순위 적용: 1위, 1위, 3위
 *기간 내 참여자가 있는 챌린지만 반환 
 */ 

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

/* 집계 기준
 * 스키마에는 별도의 지역 컬럼이 없어서 회원 주소 MEMBER_ACCOUNT.ADDRESS의 첫 단어를 지역으로 사용
- "서울 강남구 ..." → "서울"
- "경기도 수원시 ..." → "경기"
- 주소가 없으면 → "미상"
 * 조회 기간에 참여한 기록 기준
 * 같은 회원이 챌린지 3개에 참여하면 3건
 * 취소된 참여와 삭제된 챌린지는 제외
*/
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

 //SellerRanking에 판매자 프로필과 이전 기간 대비 증감률도 있어서 함께 처리

/*프로젝트 스키마 기준으로 다음 컬럼을 사용
- MARKET_DEAL_LOG.SELLER_ID: 판매자 아이디
- PRICE: 실제 거래 금액
- CREATED_AT: 거래 날짜
- MARKET_DEAL_LOG에는 완료된 거래만 기록된다는 전제*/

/*집계기준
* 조회 대상: MARKET_DEAL_LOG에 기록된 거래
* 완료된 거래만 이 테이블에 저장된다는 전제 (완료된 거래 기준)
* 날짜 기준: 거래 날짜인 CREATED_AT이 from 시작일 00:00 이상, to 다음 날 00:00 미만인 기록
* 판매자 구분: SELLER_ID가 같은 거래끼리 묶습니다.
* 거래 건수: 판매자의 거래 기록 수인 COUNT(*)입니다.
* 판매 금액: 상품 등록 가격이 아닌 거래 이력의 PRICE 합계입니다.
* 순위: 판매 금액이 높은 순이며, 금액이 같으면 1위, 1위, 3위처럼 공동 순위를 부여합니다.
* 증감률: 바로 앞의 같은 일수 동안의 판매 금액과 비교. 이전 금액이 0이면 null입니다.
예를 들어 9월 1일~9일을 조회하면 비교 기간은 8월 23일~31일
*/

//증감률 = (150,000 - 100,000) ÷ 100,000 × 100 = 50%

//현재 SQL은 취소·환불을 별도로 제외하지 않습니다. 
//거래 이력에 취소·환불 건도 남는 구조라면 그 상태를 구분하는 조건이 필요

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