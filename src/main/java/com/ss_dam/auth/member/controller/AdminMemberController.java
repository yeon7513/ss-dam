package com.ss_dam.auth.member.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ss_dam.auth.login.model.response.AuthProfile;
import com.ss_dam.auth.member.model.filter.AdminMemberSearchFilter;
import com.ss_dam.auth.member.model.request.MemberStatusChangeRequest;
import com.ss_dam.auth.member.model.response.AdminMemberDetailView;
import com.ss_dam.auth.member.model.response.AdminMemberView;
import com.ss_dam.auth.member.service.AdminMemberService;
import com.ss_dam.challenge.model.response.AdminMemberProofsView;
import com.ss_dam.common.ApiResponse;
import com.ss_dam.common.pager.PageQuery;
import com.ss_dam.common.pager.PageResult;
import com.ss_dam.common.validator.auth.AdminAuthValidator;

import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/admin/members")
public class AdminMemberController {

    private final AdminMemberService adminMemberService;
    private final AdminAuthValidator adminAuthValidator;

    public AdminMemberController(
            AdminMemberService adminMemberService,
            AdminAuthValidator adminAuthValidator) {

        this.adminMemberService = adminMemberService;
        this.adminAuthValidator = adminAuthValidator;
    }

    // 회원 목록 조회 및 검색
    @GetMapping
    public ResponseEntity<ApiResponse<PageResult<AdminMemberView>>> loadMembers(
            @ModelAttribute AdminMemberSearchFilter filter,
            HttpSession session) {

        adminAuthValidator.requireAdmin(session);

        PageResult<AdminMemberView> members =
                adminMemberService.loadMembers(filter);

        return ResponseEntity.ok(
                ApiResponse.success("관리자 회원 목록 조회 성공", members));
    }

    // 회원 기본 상세 조회
    @GetMapping("/{memberCode}")
    public ResponseEntity<ApiResponse<AdminMemberDetailView>> loadMember(
            @PathVariable Long memberCode,
            HttpSession session) {

        adminAuthValidator.requireAdmin(session);

        AdminMemberDetailView member =
                adminMemberService.loadMember(memberCode);

        return ResponseEntity.ok(
                ApiResponse.success("관리자 회원 상세 조회 성공", member));
    }

    // 회원 이용 제한
    @PatchMapping("/{memberCode}/restrict")
    public ResponseEntity<ApiResponse<Void>> restrictMember(
            @PathVariable Long memberCode,
            @Valid @RequestBody MemberStatusChangeRequest request,
            HttpSession session) {

        AuthProfile admin =
                adminAuthValidator.requireMemberManager(session);

        adminMemberService.restrictMember(
                memberCode,
                request.getReason(),
                admin.getCode());

        return ResponseEntity.ok(
                ApiResponse.success("회원 이용을 제한했습니다.", null));
    }

    // 회원 이용 제한 해제
    @PatchMapping("/{memberCode}/release")
    public ResponseEntity<ApiResponse<Void>> releaseMember(
            @PathVariable Long memberCode,
            @Valid @RequestBody MemberStatusChangeRequest request,
            HttpSession session) {

        AuthProfile admin =
                adminAuthValidator.requireMemberManager(session);

        adminMemberService.releaseMember(
                memberCode,
                request.getReason(),
                admin.getCode());

        return ResponseEntity.ok(
                ApiResponse.success("회원 이용 제한을 해제했습니다.", null));
    }

    // 회원 인증글 통계와 페이지 목록
    @GetMapping("/{memberCode}/proofs")
    public ResponseEntity<ApiResponse<AdminMemberProofsView>> loadMemberProofs(
            @PathVariable Long memberCode,
            @ModelAttribute PageQuery pageQuery,
            HttpSession session) {

        adminAuthValidator.requireMemberManager(session);

        AdminMemberProofsView result =
                adminMemberService.loadMemberProofs(memberCode, pageQuery);

        return ResponseEntity.ok(
                ApiResponse.success("회원 챌린지 인증내역 조회 성공", result));
    }
}