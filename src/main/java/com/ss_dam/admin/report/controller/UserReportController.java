package com.ss_dam.admin.report.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ss_dam.admin.report.model.request.CreateReportRequest;
import com.ss_dam.admin.report.service.UserReportService;
import com.ss_dam.auth.login.model.response.AuthProfile;
import com.ss_dam.common.ApiResponse;
import com.ss_dam.common.validator.auth.AuthValidator;

import jakarta.servlet.http.HttpSession;

@RestController 
@RequestMapping("/api/reports")
public class UserReportController {

    private final UserReportService userReportService;
    private final AuthValidator authValidator;

    public UserReportController(
            UserReportService userReportService,
            AuthValidator authValidator) {

        this.userReportService = userReportService;
        this.authValidator = authValidator;
    }

  // 사용자 신고 등록
  // 신고 대상 유형: feed, market, comment, user
  @PostMapping
  public ResponseEntity<ApiResponse<Long>> createReport(
    @RequestBody CreateReportRequest request,
    HttpSession session) {

    // 1. 로그인한 일반 회원 확인
    // 비로그인: 401, 관리자 계정: 403
    AuthProfile loginUser = authValidator.requireMember(session);

    // 2. 신고 등록
    // 신고자 번호는 요청 본문이 아닌 로그인 세션에서 가져옴
    Long reportCode = userReportService.createReport(
      loginUser.getCode(), request);
    
    // 3. 생성된 신고 번호 반환
    return ResponseEntity.status(HttpStatus.CREATED)
      .body(ApiResponse.success("신고가 접수되었습니다", reportCode));
    }
}
