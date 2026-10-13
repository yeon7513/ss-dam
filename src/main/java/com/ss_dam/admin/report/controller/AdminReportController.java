package com.ss_dam.admin.report.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ss_dam.admin.report.model.request.AdminReportQuery;
import com.ss_dam.admin.report.model.response.AdminMemberReportsView;
import com.ss_dam.admin.report.model.response.ReportView;
import com.ss_dam.admin.report.model.response.AdminReportDetailView;
import com.ss_dam.admin.report.service.AdminReportService;
import com.ss_dam.common.ApiResponse;
import com.ss_dam.common.pager.PageQuery;
import com.ss_dam.common.pager.PageResult;

import jakarta.servlet.http.HttpSession;

//- AdminReportController - 신고 목록·상세, 검토·처리·기각 기능

@RestController
@RequestMapping("/api/admin/reports")
public class AdminReportController {

	private final AdminReportService adminReportService;

	public AdminReportController (AdminReportService adminReportService) {
		this.adminReportService = adminReportService;
	}

    // 관리자 신고 목록 조회
    @GetMapping
    public ResponseEntity<ApiResponse<PageResult<ReportView>>> loadReports(
            @ModelAttribute AdminReportQuery query) {

        PageResult<ReportView> result = adminReportService.loadReports(query);

        return ResponseEntity.ok(
                ApiResponse.success("관리자 신고 목록 조회 성공", result));
    }

		// 관리자 신고 상세 조회
	@GetMapping("/{reportCode}")
	public ResponseEntity<ApiResponse<AdminReportDetailView>> loadReport(
					@PathVariable Long reportCode) {

			AdminReportDetailView result =
							adminReportService.loadReport(reportCode);

			return ResponseEntity.ok(
							ApiResponse.success("관리자 신고 상세 조회 성공", result));
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


    //관리자 회원 상세 - 신고내역 탭
    @GetMapping("/members/{memberCode}")
    public ResponseEntity<ApiResponse<AdminMemberReportsView>> loadMemberReports(
            @PathVariable Long memberCode,
            @ModelAttribute PageQuery pageQuery,
            HttpSession session) {

            AdminMemberReportsView result = 
                    adminReportService.loadMemberReports(memberCode, pageQuery);

            return ResponseEntity.ok(
                    ApiResponse.success("회원 신고내역 조회 성공", result));

            //우측 상단 통계 : 전체 신고 / 처리 대기 / 처리 완료
            //- 전체 신고: 모든 상태 포함
            //- 처리 대기: PENDING, IN_REVIEW
            //- 처리 완료: RESOLVED
            // * 기각(REJECTED)은 전체 신고에만 포함
            
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

