package com.ss_dam.point.controller;

import com.ss_dam.auth.login.model.response.MemberProfile;
import com.ss_dam.common.ApiResponse;
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

  public UserPointController(UserPointService pointService) {
    this.pointService = pointService;
  }

  @GetMapping("/balance") //보유 포인트 조회 로직
  public ResponseEntity<ApiResponse<Integer>> getPointBalance(HttpSession session) {
    MemberProfile loginUser = (MemberProfile) session.getAttribute("loginUser");

    if (loginUser == null) {
      return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
          .body(ApiResponse.fail("로그인이 필요한 페이지입니다"));
    }

    int balance = pointService.getPointBalance(loginUser.getCode());

    return ResponseEntity.ok(ApiResponse.success("보유한 현재 포인트 조회에 성공했습니다", balance));
  }

  @PostMapping("/charge")
  public ResponseEntity<ApiResponse<Boolean>> pointCharge(HttpSession session, @RequestBody Point point) {
    MemberProfile loginUser = (MemberProfile) session.getAttribute("loginUser");
    if (loginUser == null) {
      return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(ApiResponse.fail("로그인이 필요한 페이지입니다"));
    }
    point.setCode(loginUser.getCode());
    boolean chargePoint = pointService.chargePoint(point);

    if(!chargePoint) {
      return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(ApiResponse.fail("포인트 충전 실패"));
    }

   return ResponseEntity.ok(ApiResponse.success("포인트 충전에 성공했습니다", null));
  }

  @PostMapping("/payment")
  public ResponseEntity<ApiResponse<Boolean>> pointPayment(HttpSession session, @RequestBody PaymentPoint paymentPoint) {
    MemberProfile loginUser = (MemberProfile) session.getAttribute("loginUser");
    if (loginUser == null) {
      return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(ApiResponse.fail("로그인이 필요한 페이지입니다"));
    }

    paymentPoint.setBuyer_code(loginUser.getCode());
    boolean resultPayment = pointService.paymentPoint(paymentPoint);

    if(!resultPayment) {
      return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(ApiResponse.fail("거래에 실패했습니다"));
    }

    return ResponseEntity.ok(ApiResponse.success("거래에 성공했습니다", null));
  }
}
