package com.ss_dam.report.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ss_dam.common.ApiResponse;

//- AdminReportController - 신고 목록·상세, 검토·처리·기각 기능

@RestController
@RequestMapping("/api/admin/reports")
public class AdminReportController {

    // 관리자 신고 목록 조회
    // 조건 생략 시 해당 조건으로 제한하지 않음
    @GetMapping
    public ResponseEntity<ApiResponse<Void>> loadReports(
            @RequestParam(required = false) String status,
            @RequestParam(required = false) String targetType,
            @RequestParam(required = false) String keyword) {

        // TODO: 신고 상태·대상 유형 필터 연결
        // TODO: 검색 범위 정의 및 페이지네이션 연결
        return notImplemented();
    }

    // 신고 상세 조회
    @GetMapping("/{reportCode}")
    public ResponseEntity<ApiResponse<Void>> loadReport(
            @PathVariable Long reportCode) {

        // TODO: 신고 내용·신고 대상·처리 정보 조회
        return notImplemented();
    }

    // 신고 검토 시작
    @PatchMapping("/{reportCode}/review")
    public ResponseEntity<ApiResponse<Void>> reviewReport(
            @PathVariable Long reportCode) {

        // TODO: 인증된 관리자 정보 연결
        // TODO: 접수 상태에서 검토 중 상태로 변경
        // TODO: 상태 변경과 처리 이력 저장
        return notImplemented();
    }

    // 신고 처리 완료
    @PatchMapping("/{reportCode}/resolve")
    public ResponseEntity<ApiResponse<Void>> resolveReport(
            @PathVariable Long reportCode) {

        // TODO: 처리 내용·사유 요청 DTO 연결
        // TODO: 인증된 관리자 정보 연결
        // TODO: 처리 가능한 현재 상태 검증
        // TODO: 처리 완료 상태로 변경하고 이력 저장
        return notImplemented();
    }

    // 신고 기각
    @PatchMapping("/{reportCode}/reject")
    public ResponseEntity<ApiResponse<Void>> rejectReport(
            @PathVariable Long reportCode) {

        // TODO: 기각 사유 요청 DTO 연결
        // TODO: 인증된 관리자 정보 연결
        // TODO: 기각 가능한 현재 상태 검증
        // TODO: 기각 상태로 변경하고 이력 저장
        return notImplemented();
    }

    // 미구현 API 공통 응답
    private ResponseEntity<ApiResponse<Void>> notImplemented() {
        return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED)
                .body(ApiResponse.<Void>fail(
                        "아직 구현되지 않은 기능입니다."));
    }
}

//지금은 모두 501을 반환하고 실제 상태 변경은 하지 않아. 
// 신고 처리 완료와 대상 게시글 삭제는 별개이므로, 신고 처리 시 삭제까지 수행할지는 서비스 구현 때 정책에 맞춰 연결

/*요청 예시
# 전체 신고
GET /api/admin/reports

# 접수된 신고
GET /api/admin/reports?status=PENDING

# 검토 중인 신고
GET /api/admin/reports?status=IN_REVIEW

# 처리 완료된 신고
GET /api/admin/reports?status=RESOLVED

# 기각된 신고
GET /api/admin/reports?status=REJECTED

# 상품 신고
GET /api/admin/reports?targetType=market

# 피드 신고
GET /api/admin/reports?targetType=feed

# 댓글 신고
GET /api/admin/reports?targetType=comment
*/

