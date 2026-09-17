package com.ss_dam.feed.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ss_dam.common.ApiResponse;

// - AdminFeedController - 피드 목록·상세, 삭제·복구, 처리 사유·이력

@RestController
@RequestMapping("/api/admin/feeds")
public class AdminFeedController {

    // 관리자 피드 목록 조회
    @GetMapping
    public ResponseEntity<ApiResponse<Void>> loadFeeds(
            @RequestParam(required = false) String status) {
            //status파라미터로 ACTIVE, PRIVATE 상태 구분
            //EX)공개 피드 조회 : GET /api/admin/feeds?status=ACTIVE

        // TODO: 검색·페이지네이션·상태 필터 연결
        return notImplemented();
    }

    // 관리자 피드 상세 조회
    // 비공개·삭제된 피드 포함
    @GetMapping("/{feedCode}")
    public ResponseEntity<ApiResponse<Void>> loadFeed(
            @PathVariable Long feedCode) {

        return notImplemented();
    }

    // 피드 논리 삭제
    @DeleteMapping("/{feedCode}")
    public ResponseEntity<ApiResponse<Void>> deleteFeed(
            @PathVariable Long feedCode) {

        // TODO: 처리 사유 요청 DTO와 인증된 관리자 정보 연결
        // TODO: 삭제와 처리 이력 저장을 같은 트랜잭션으로 처리
        return notImplemented();
    }

    // 삭제된 피드 복구
    @PatchMapping("/{feedCode}/restore")
    public ResponseEntity<ApiResponse<Void>> restoreFeed(
            @PathVariable Long feedCode) {

        // TODO: 처리 사유 요청 DTO와 인증된 관리자 정보 연결
        // TODO: 복구와 처리 이력 저장을 같은 트랜잭션으로 처리
        // 숨김 해제·삭제 복구 시 이전 비공개 상태를 유지하는 처리도 서비스에서 구현
        return notImplemented();
    }

    // 피드 관리 처리 이력 조회
    @GetMapping("/{feedCode}/logs")
    public ResponseEntity<ApiResponse<Void>> loadFeedLogs(
            @PathVariable Long feedCode) {

        return notImplemented();
    }

    // 미구현 API 공통 응답
    private ResponseEntity<ApiResponse<Void>> notImplemented() {
        return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED)
                .body(ApiResponse.<Void>fail(
                        "아직 구현되지 않은 기능입니다."));
    }
}

/*요청 예시
# 공개 피드 조회
GET /api/admin/feeds?status=ACTIVE

# 비공개 피드 조회
GET /api/admin/feeds?status=PRIVATE

# 전체 피드 조회
GET /api/admin/feeds
 */



