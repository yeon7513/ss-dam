package com.ss_dam.admin.log.controller;

import java.time.LocalDate;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ss_dam.common.ApiResponse;

//- AdminActivityLogController - //

//상품별 이력과 별도로 전체 관리자 활동을 관리자·대상·기간별로 조회

@RestController
@RequestMapping("/api/admin/logs")
public class AdminActivityLogController {

    // 전체 관리자 활동 이력 조회
    // 조건 생략 시 해당 조건으로 제한하지 않음
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
            LocalDate to) {

        // TODO: 관리자·대상 유형·대상 번호·처리 유형 필터 연결
        // TODO: 기간 검증 (from이 to보다 늦으면 잘못된 요청)
        // TODO: 종료일 전체를 포함하도록 기간 조회
        // TODO: 페이지네이션 연결
        // TODO: 전체 관리자 이력 조회 권한 검증
        return notImplemented();
    }

    // 관리자 활동 이력 상세 조회
    @GetMapping("/{logCode}")
    public ResponseEntity<ApiResponse<Void>> loadActivityLog(
            @PathVariable Long logCode) {

        // TODO: 이력 존재 여부 및 조회 권한 검증
        // TODO: 처리 관리자·대상·처리 유형·사유·시각 조회
        return notImplemented();
    }

    // 미구현 API 공통 응답
    private ResponseEntity<ApiResponse<Void>> notImplemented() {
        return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED)
                .body(ApiResponse.<Void>fail(
                        "아직 구현되지 않은 기능입니다."));
    }
}

//targetCode는 다른 종류의 대상과 번호가 겹칠 수 있어서 targetType과 함께 조회하도록 구현
//현재 유효한 요청에는 501을 반환. 이력 저장은 상품·피드 등의 처리 서비스에서 담당하므로, 여기에는 별도 등록 API를 넣지 않음

/* 요청 예시

# 전체 관리자 활동 이력
GET /api/admin/logs

# 특정 관리자의 활동
GET /api/admin/logs?admCode=1

# 상품 관련 활동
GET /api/admin/logs?targetType=market

# 특정 상품의 활동
GET /api/admin/logs?targetType=market&targetCode=10

# 삭제 처리 이력
GET /api/admin/logs?processType=DELETE

# 기간별 활동
GET /api/admin/logs?from=2026-09-01&to=2026-09-11

# 이력 상세
GET /api/admin/logs/1

*/