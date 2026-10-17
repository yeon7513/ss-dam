package com.ss_dam.admin.log.controller;

import com.ss_dam.admin.log.model.request.AdminActivityLogFilter;
import com.ss_dam.admin.log.model.response.AdminActivity;
import com.ss_dam.admin.log.service.AdminActivityLogService;
import com.ss_dam.common.ApiResponse;
import com.ss_dam.common.pager.PageQuery;
import com.ss_dam.common.pager.PageResult;
import com.ss_dam.common.validator.auth.AdminAuthValidator;
import jakarta.servlet.http.HttpSession;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/logs")
public class AdminActivityLogController {

  private final AdminActivityLogService adminActivityLogService;
  private final AdminAuthValidator adminAuthValidator;

  public AdminActivityLogController(AdminActivityLogService adminActivityLogService,
      AdminAuthValidator adminAuthValidator) {
    this.adminActivityLogService = adminActivityLogService;
    this.adminAuthValidator = adminAuthValidator;
  }

  // 전체 관리자 활동 이력 조회
  @GetMapping
  public ResponseEntity<ApiResponse<PageResult<AdminActivity>>> loadActivityLogs(
      @ModelAttribute AdminActivityLogFilter filter, HttpSession session) {

    adminAuthValidator.requireAdmin(session);

    PageResult<AdminActivity> result = adminActivityLogService.loadActivityLogs(filter);

    return ResponseEntity.ok(ApiResponse.success("관리자 활동 이력 조회 성공", result));
  }

  @GetMapping("/{targetCode}/activities")
  public ResponseEntity<ApiResponse<PageResult<AdminActivity>>> loadActivityLogsByAdminCode(
      @PathVariable Long targetCode, @ModelAttribute PageQuery pageQuery, HttpSession session) {

    adminAuthValidator.requireAdmin(session);
    adminAuthValidator.requireMemberManager(session);

    PageResult<AdminActivity> result =
        adminActivityLogService.loadActivityLogsByAdminCode(targetCode, pageQuery);


    return ResponseEntity.ok(ApiResponse.success("해당 관리자 활동 이력 조회 성공", result));
  }

  // 관리자 활동 이력 상세 조회 - 미구현
  @GetMapping("/{logCode}")
  public ResponseEntity<ApiResponse<Void>> loadActivityLog(@PathVariable Long logCode,
      HttpSession session) {

    adminAuthValidator.requireAdmin(session);

    // TODO: 이력 존재 여부·대상별 조회 권한 검증
    // TODO: 처리 관리자·대상·처리 유형·사유·시각 조회
    return notImplemented();
  }

  // 회원 정지·해제 처리 이력 조회
  @GetMapping("/members/{memberCode}")
  public ResponseEntity<ApiResponse<PageResult<AdminActivity>>> loadMembersLogs(
      @PathVariable Long memberCode, @ModelAttribute PageQuery pageQuery, HttpSession session) {

    adminAuthValidator.requireAdmin(session);

    PageResult<AdminActivity> result =
        adminActivityLogService.loadMemberLogs(memberCode, pageQuery);

    return ResponseEntity.ok(ApiResponse.success("회원 관리 처리 이력 조회 성공", result));
  }

  // 챌린지 관리 처리 이력 조회
  @GetMapping("/challenges/{code}")
  public ResponseEntity<ApiResponse<PageResult<AdminActivity>>> loadChallengeLogs(
      @PathVariable Long code, @ModelAttribute PageQuery pageQuery, HttpSession session) {

    adminAuthValidator.requireAdmin(session);

    PageResult<AdminActivity> result = adminActivityLogService.loadChallengeLogs(code, pageQuery);

    return ResponseEntity.ok(ApiResponse.success("챌린지 처리 이력 조회 성공", result));
  }

  // 미구현 API 공통 응답
  private ResponseEntity<ApiResponse<Void>> notImplemented() {
    return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED)
        .body(ApiResponse.fail("아직 구현되지 않은 기능입니다."));
  }
}
