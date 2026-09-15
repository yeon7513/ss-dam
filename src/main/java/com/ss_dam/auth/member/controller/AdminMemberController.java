package com.ss_dam.auth.member.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ss_dam.auth.member.model.filter.AdminMemberSearchFilter;
import com.ss_dam.auth.member.model.response.AdminMemberDetailView;
import com.ss_dam.auth.member.model.response.AdminMemberView;
import com.ss_dam.auth.member.service.AdminMemberService;
import com.ss_dam.common.ApiResponse;
import com.ss_dam.common.pager.PageResult;

// - AdminMemberController -
// 회원 목록·검색·상세, 이용 제한·해제, 처리 사유·이력

/*
 * 필요한 기능
 * - 회원 목록 조회 : 전체 회원을 조회하고 닉네임·이메일 등으로 검색
 * - 회원 상세 조회 : 회원 정보 및 이용 제한 상태 조회
 * - 회원 이용 제한 : 관리자가 부적절한 활동을 한 회원의 이용을 제한
 * - 회원 이용 제한 해제 : 제한된 회원의 서비스 이용을 다시 허용
 * - 회원 관리 처리 이력 조회 : 이용 제한·해제 사유와 처리 내역 조회
 */

@RestController
@RequestMapping("/api/admin/members")
public class AdminMemberController {

    @Autowired 
    private AdminMemberService adminMemberService;

    // 관리자 회원 목록 조회 및 검색
    // 회원 목록: 아이디, 이름, 지역, 상태, 등급, 가입일 
    // -> AdminMemberView확인

    @GetMapping
    public ResponseEntity<ApiResponse<PageResult<AdminMemberView>>> loadMember(
      @ModelAttribute AdminMemberSearchFilter filter) {
        
        PageResult<AdminMemberView> members =
                adminMemberService.loadMembers(filter);

        return ResponseEntity.ok(
                ApiResponse.success("관리자 회원 목록 조회 성공", members)
        );
      }
    
    // 관리자 회원 상세 조회
    // 피그마 관리자 대시보드 - 서비스 관리 - 회원정보 - 상세 페이지에 맞춰서
    
    //->AdminMemberDetailView 확인

    // 기본 정보·사진 -> 상단 통계  -> 관리자 로그 -> 
    // -> 작성 피드,신고내역,거래내역,챌린지인증 탭

    /* 회원 상태 변경은 별도 처리  
    상태와 사유 입력
    → 변경 API 요청
    → 서비스에서 상태 변경 + 관리자 로그 저장
    → 성공하면 프론트에서 회원 정보와 관리자 로그 다시 조회*/ 

    
      // 관리자 회원 상세 조회 — 기본 정보 및 프로필 사진
      @GetMapping("/{memberCode}")
      public ResponseEntity<ApiResponse<AdminMemberDetailView>> loadMember(
        @PathVariable Long memberCode) {

        AdminMemberDetailView member =
                adminMemberService.loadMember(memberCode);

        return ResponseEntity.ok(
              ApiResponse.success("관리자 회원 상세 조회 성공", member));
        }


     //+ 활동 이력: 상세 화면에서 별도 목록으로 조회하고 페이지네이션 적용
     //활동 이력은 별도 API로 분리
     //GET /api/admin/members/1/activities?page=1&perPage=10
     //이후 프로필 변경 같은 실제 처리 코드에서 이력 저장도 함께 구현해야 기록이 쌓임

    // 회원 이용 제한
    @PatchMapping("/{memberCode}/restrict")
    public ResponseEntity<ApiResponse<Void>> restrictMember(
            @PathVariable Long memberCode) {

        // TODO: 처리 사유 요청 DTO와 인증된 관리자 정보 연결
        // TODO: 회원 존재 여부 및 현재 이용 제한 상태 확인
        // TODO: 회원 이용 제한 상태 변경
        // TODO: 상태 변경과 처리 이력 저장을 같은 트랜잭션으로 처리
        return notImplemented();
    }

    // 회원 이용 제한 해제
    @PatchMapping("/{memberCode}/release")
    public ResponseEntity<ApiResponse<Void>> releaseMember(
            @PathVariable Long memberCode) {

        // TODO: 처리 사유 요청 DTO와 인증된 관리자 정보 연결
        // TODO: 회원 존재 여부 및 현재 이용 제한 상태 확인
        // TODO: 회원 이용 제한 해제
        // TODO: 상태 변경과 처리 이력 저장을 같은 트랜잭션으로 처리
        return notImplemented();
    }

    // 회원 관리 처리 이력 조회
    @GetMapping("/{memberCode}/logs")
    public ResponseEntity<ApiResponse<Void>> loadMemberLogs(
            @PathVariable Long memberCode) {

        // TODO: 이용 제한·해제 사유, 처리 관리자, 처리 일시 조회
        // TODO: 페이지네이션 연결
        return notImplemented();
    }

    // 미구현 API 공통 응답
    private ResponseEntity<ApiResponse<Void>> notImplemented() {
        return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED)
                .body(ApiResponse.<Void>fail(
                        "아직 구현되지 않은 기능입니다."));
    }
}

/*
 * 요청 예시
 *
 * 전체 회원
 * GET /api/admin/members
 *
 * 닉네임·이메일 검색
 * GET /api/admin/members?keyword=검색어
 *
 * 정상 이용 회원
 * GET /api/admin/members?status=ACTIVE
 *
 * 이용 제한 회원
 * GET /api/admin/members?status=RESTRICTED
 *
 * 검색어와 이용 제한 상태를 함께 적용
 * GET /api/admin/members?keyword=검색어&status=RESTRICTED
 *
 * 회원 상세
 * GET /api/admin/members/1
 *
 * 회원 이용 제한
 * PATCH /api/admin/members/1/restrict
 *
 * 회원 이용 제한 해제
 * PATCH /api/admin/members/1/release
 *
 * 회원 관리 처리 이력
 * GET /api/admin/members/1/logs
 */