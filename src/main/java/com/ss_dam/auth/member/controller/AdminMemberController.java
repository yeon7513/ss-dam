package com.ss_dam.auth.member.controller;

import com.ss_dam.auth.login.Login;
import com.ss_dam.auth.member.model.filter.AdminMemberSearchFilter;
import com.ss_dam.auth.member.model.request.MemberStatusChangeRequest;
import com.ss_dam.auth.member.model.response.AdminMemberDetailView;
import com.ss_dam.auth.member.model.response.AdminMemberView;
import com.ss_dam.auth.member.service.AdminMemberService;
import com.ss_dam.common.ApiResponse;
import com.ss_dam.common.pager.PageResult;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

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

  // 관리자 회원 목록 조회 및 검색 -> AdminMemberView확인
  // 회원 목록: 아이디, 이름, 지역, 상태, 등급, 가입일

  @GetMapping
  public ResponseEntity<ApiResponse<PageResult<AdminMemberView>>> loadMember(
      @ModelAttribute AdminMemberSearchFilter filter) {

    PageResult<AdminMemberView> members = adminMemberService.loadMembers(filter);

    return ResponseEntity.ok(ApiResponse.success("관리자 회원 목록 조회 성공", members));
  }

  // 관리자 회원 상세 조회 ->AdminMemberDetailView 확인
  // 기능 구현은 피그마 관리자 대시보드 - 서비스 관리 - 회원정보 - 상세 페이지 참조


  // 관리자 회원 상세 조회 — 기본 정보, 사진, 요약 통계
  @GetMapping("/{memberCode}")
  public ResponseEntity<ApiResponse<AdminMemberDetailView>> loadMember(
      @PathVariable Long memberCode) {

    AdminMemberDetailView member = adminMemberService.loadMember(memberCode);

    return ResponseEntity.ok(ApiResponse.success("관리자 회원 상세 조회 성공", member));
  }


  // 회원 이용 제한
  // DB에서 상태 변경 : ACTIVE -> SUSPENDED
  @PatchMapping("/{memberCode}/restrict")
  public ResponseEntity<ApiResponse<Void>> restrictMember(@PathVariable Long memberCode,
      @Valid @RequestBody MemberStatusChangeRequest request, HttpSession session) {

    Login admin = requireAdmin(session);

    adminMemberService.restrictMember(memberCode, request.getReason(), admin.getCode());


    return ResponseEntity.ok(ApiResponse.success("회원 이용을 제한했습니다", null));

  }

  // 회원 이용 제한 해제
  // DB에서 상태 변경 : SUSPENDED -> ACTIVE
  @PatchMapping("/{memberCode}/release")
  public ResponseEntity<ApiResponse<Void>> releaseMember(@PathVariable Long memberCode,
      @Valid @RequestBody MemberStatusChangeRequest request, HttpSession session) {

    Login admin = requireAdmin(session);

    adminMemberService.releaseMember(memberCode, request.getReason(), admin.getCode());

    return ResponseEntity.ok(ApiResponse.success("회원 이용 제한을 해제했습니다.", null));
  }

  // 로그인 및 관리자 권한 확인
  private Login requireAdmin(HttpSession session) {

    Login user = (Login) session.getAttribute("loginUser");

    if (user == null) {
      throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "로그인이 필요합니다.");
    }

    if (!"ROLE_SUPER".equals(user.getRole()) && !"ROLE_MANAGER".equals(user.getRole())) {

      throw new ResponseStatusException(HttpStatus.FORBIDDEN, "회원 상태를 변경할 권한이 없습니다.");
    }

    if (user.getCode() == null) {
      throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "관리자 정보가 없습니다. 다시 로그인해주세요.");
    }

    return user;
  }

  //우측 상단 통계 : 전체 신고 / 처리 대기 / 처리 완료
  //- 전체 신고: 모든 상태 포함
  //- 처리 대기: PENDING, IN_REVIEW
  //- 처리 완료: RESOLVED
  // * 기각(REJECTED)은 전체 신고에만 포함


}





