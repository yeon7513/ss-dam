package com.ss_dam.auth.admin.controller;

import com.ss_dam.auth.admin.model.filter.AdminAccountSearchFilter;
import com.ss_dam.auth.admin.model.request.AdminAccountCreate;
import com.ss_dam.auth.admin.model.request.AdminAccountUpdate;
import com.ss_dam.auth.admin.model.response.AdminAccountDetail;
import com.ss_dam.auth.admin.model.response.AdminAccountView;
import com.ss_dam.auth.admin.service.AdminAccountService;
import com.ss_dam.auth.login.model.response.AuthProfile;
import com.ss_dam.common.ApiResponse;
import com.ss_dam.common.pager.PageResult;
import com.ss_dam.common.validator.auth.AuthValidator;
import jakarta.servlet.http.HttpSession;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

// 관리자 계정 관리는 최고 관리자(ROLE_SUPER)만 가능
// -> 나중에 인터셉터 추가할 것!!


@RestController
@RequestMapping("/api/admin/account")
public class AdminAccountController {

  private final AuthValidator authValidator;
  private final AdminAccountService adminAccountService;

  public AdminAccountController(AuthValidator authValidator,
      AdminAccountService adminAccountService) {
    this.authValidator = authValidator;
    this.adminAccountService = adminAccountService;
  }

  // 관리자 계정 전체 조회
  @GetMapping
  ResponseEntity<ApiResponse<PageResult<AdminAccountView>>> loadAdminAccounts(
      AdminAccountSearchFilter filter) {

    PageResult<AdminAccountView> adminAccountView = adminAccountService.loadAdminAccounts(filter);

    return ResponseEntity.ok(ApiResponse.success("관리자 계정 목록 조회 성공", adminAccountView));
  }

  // 관리자 상세 조회
  @GetMapping("/{code}")
  ResponseEntity<ApiResponse<AdminAccountDetail>> findAdminAccountByCode(@PathVariable Long code) {
    AdminAccountDetail adminAccountDetail = adminAccountService.findAdminAccountByCode(code);

    if (adminAccountDetail == null) {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ApiResponse.fail("존재하지 않는 관리자입니다."));
    }

    return ResponseEntity.ok(ApiResponse.success("관리자 상세 정보 조회 성공", adminAccountDetail));
  }

  // 관리자 계정 생성
  @PostMapping
  ResponseEntity<ApiResponse<Long>> registerAdminAccount(
      @RequestBody AdminAccountCreate adminAccountCreate, HttpSession session) {

    AuthProfile loginAdmin = authValidator.requireLogin(session);

    Long newAdminAccountCode =
        adminAccountService.registerAdminAccount(adminAccountCreate, loginAdmin);

    return ResponseEntity.ok(ApiResponse.success("관리자 계정 생성 성공", newAdminAccountCode));
  }


  // 관리자 정보 수정 (본인용)
  // -> 비밀번호, 이름, 연락처, 부서
  @PutMapping
  ResponseEntity<ApiResponse<Void>> updateMyAccount(
      @RequestBody AdminAccountUpdate adminAccountUpdate, HttpSession session) {

    AuthProfile loginAdmin = authValidator.requireLogin(session);

    adminAccountService.updateMyAccount(adminAccountUpdate, loginAdmin);

    return ResponseEntity.ok(ApiResponse.success("정보 수정 성공", null));
  }


  // 관리자 정보 수정 (상사용)
  // -> 부서, 권한


  // 관리자 계정 삭제 (상사용)
  // -> 논리 삭제 적용

}
