package com.ss_dam.point.controller;

import com.ss_dam.auth.login.model.response.AuthProfile;
import com.ss_dam.common.ApiResponse;
import com.ss_dam.common.validator.auth.AuthValidator;
import com.ss_dam.point.model.PaymentPoint;
import com.ss_dam.point.model.Point;
import com.ss_dam.point.service.UserPointService;
import jakarta.servlet.http.HttpSession;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/point")
public class UserPointController {

  private final UserPointService pointService;
  private final AuthValidator authValidator;

  public UserPointController(UserPointService pointService, AuthValidator authValidator) {
    this.pointService = pointService;
    this.authValidator = authValidator;
  }

  // 잔액 조회
  @GetMapping("/balance") //보유 포인트 조회 로직
  public ResponseEntity<ApiResponse<Integer>> getPointBalance(HttpSession session) {
    AuthProfile loginUser = authValidator.requireLogin(session);

    int balance = pointService.getPointBalance(loginUser.getCode());

    return ResponseEntity.ok(ApiResponse.success("보유한 현재 포인트 조회에 성공했습니다", balance));
  }

  // 충전
  @PostMapping("/charge")
  public ResponseEntity<ApiResponse<Boolean>> pointCharge(HttpSession session,
      @RequestBody Point point) {
    AuthProfile loginUser = authValidator.requireLogin(session);

    point.setCode(loginUser.getCode());
    boolean chargePoint = pointService.chargePoint(point);

    if (!chargePoint) {
      return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(ApiResponse.fail("포인트 충전 실패"));
    }

    return ResponseEntity.ok(ApiResponse.success("포인트 충전에 성공했습니다", null));
  }


  // 송금 처리
  @PostMapping("/payment")
  public ResponseEntity<ApiResponse<Boolean>> pointPayment(HttpSession session,
      @RequestBody PaymentPoint paymentPoint) {
    AuthProfile loginUser = authValidator.requireLogin(session);

    // Buyer -> 로그인한 사람
    paymentPoint.setBuyerCode(loginUser.getCode());
    boolean resultPayment = pointService.paymentPoint(paymentPoint);

    if (!resultPayment) {
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ApiResponse.fail("거래에 실패했습니다"));
    }

    return ResponseEntity.ok(ApiResponse.success("거래에 성공했습니다", null));
  }

  // 환전 (출금)
  @PostMapping("/exchange")
  public ResponseEntity<ApiResponse<Boolean>> pointExchange(HttpSession session,
      @RequestBody Point point) {
    AuthProfile loginUser = authValidator.requireLogin(session);
    point.setCode(loginUser.getCode());

    boolean resultExchange = pointService.exchangePoint(point);
    if (!resultExchange) {
      return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(ApiResponse.fail("환전에 실패했습니다"));
    }

    return ResponseEntity.ok(ApiResponse.success("환전에 성공했습니다", null));
  }
}
