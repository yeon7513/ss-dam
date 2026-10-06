package com.ss_dam.admin.log.controller;

import java.time.LocalDate;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ss_dam.admin.log.response.AdminActivity;
import com.ss_dam.admin.log.service.AdminActivityLogService;
import com.ss_dam.common.ApiResponse;
import com.ss_dam.common.pager.PageQuery;
import com.ss_dam.common.pager.PageResult;
import com.ss_dam.common.validator.auth.AdminAuthValidator;

import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/api/admin/logs")
public class AdminActivityLogController {

    private final AdminActivityLogService adminActivityLogService;
    private final AdminAuthValidator adminAuthValidator;

    public AdminActivityLogController(
            AdminActivityLogService adminActivityLogService,
            AdminAuthValidator adminAuthValidator) {

        this.adminActivityLogService = adminActivityLogService;
        this.adminAuthValidator = adminAuthValidator;
    }

    // 전체 관리자 활동 이력 조회 - 미구현
    @GetMapping
    public ResponseEntity<ApiResponse<Void>> loadActivityLogs(
            @RequestParam(required = false) Long admCode,
            @RequestParam(required = false) String targetType,
            @RequestParam(required = false) Long targetCode,
            @RequestParam(required = false) String processType,
            @RequestParam(required = false)
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
            LocalDate from,
            @RequestParam(required = false)
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
            LocalDate to,
            HttpSession session) {

        adminAuthValidator.requireAdmin(session);

        // TODO: 검색 조건·기간 검증·페이지네이션 연결
        // TODO: 전체 이력 조회에 필요한 추가 권한 정책 적용
        return notImplemented();
    }

    // 관리자 활동 이력 상세 조회 - 미구현
    @GetMapping("/{logCode}")
    public ResponseEntity<ApiResponse<Void>> loadActivityLog(
            @PathVariable Long logCode,
            HttpSession session) {

        adminAuthValidator.requireAdmin(session);

        // TODO: 이력 존재 여부·대상별 조회 권한 검증
        // TODO: 처리 관리자·대상·처리 유형·사유·시각 조회
        return notImplemented();
    }

    // 회원 정지·해제 처리 이력 조회
    @GetMapping("/members/{memberCode}")
    public ResponseEntity<ApiResponse<PageResult<AdminActivity>>>
            loadMembersLogs(
                    @PathVariable Long memberCode,
                    @ModelAttribute PageQuery pageQuery,
                    HttpSession session) {

        adminAuthValidator.requireAdmin(session);

        PageResult<AdminActivity> result =
                adminActivityLogService.loadMemberLogs(
                        memberCode, pageQuery);

        return ResponseEntity.ok(
                ApiResponse.success(
                        "회원 관리 처리 이력 조회 성공", result));
    }

    // 챌린지 관리 처리 이력 조회
    @GetMapping("/challenges/{code}")
    public ResponseEntity<ApiResponse<PageResult<AdminActivity>>>
            loadChallengeLogs(
                    @PathVariable Long code,
                    @ModelAttribute PageQuery pageQuery,
                    HttpSession session) {

        adminAuthValidator.requireAdmin(session);

        PageResult<AdminActivity> result =
                adminActivityLogService.loadChallengeLogs(
                        code, pageQuery);

        return ResponseEntity.ok(
                ApiResponse.success(
                        "챌린지 처리 이력 조회 성공", result));
    }

    // 미구현 API 공통 응답
    private ResponseEntity<ApiResponse<Void>> notImplemented() {
        return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED)
                .body(ApiResponse.<Void>fail(
                        "아직 구현되지 않은 기능입니다."));
    }
}