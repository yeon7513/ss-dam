package com.ss_dam.admin.report.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ss_dam.admin.report.model.request.AdminReportQuery;
import com.ss_dam.admin.report.model.request.ReportActionMemoRequest;
import com.ss_dam.admin.report.model.request.ResolveReportRequest;
import com.ss_dam.admin.report.model.response.AdminMemberReportsView;
import com.ss_dam.admin.report.model.response.AdminReportDetailView;
import com.ss_dam.admin.report.model.response.ReportView;
import com.ss_dam.admin.report.service.AdminReportService;
import com.ss_dam.auth.login.model.response.AuthProfile;
import com.ss_dam.common.ApiResponse;
import com.ss_dam.common.pager.PageQuery;
import com.ss_dam.common.pager.PageResult;
import com.ss_dam.common.validator.auth.AuthValidator;

import jakarta.servlet.http.HttpSession;

//- AdminReportController - 신고 목록·상세, 검토·처리·기각 기능

@RestController
@RequestMapping("/api/admin/reports")
public class AdminReportController {

	private final AdminReportService adminReportService;
	private final AuthValidator authValidator;

	public AdminReportController(
					AdminReportService adminReportService,
					AuthValidator authValidator) {

			this.adminReportService = adminReportService;
			this.authValidator = authValidator;
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
	// /review: PENDING → IN_REVIEW, 처리 관리자와 검토 시작 이력 저장
	@PatchMapping("/{reportCode}/review")
	public ResponseEntity<ApiResponse<Void>> reviewReport(
					@PathVariable Long reportCode,
					HttpSession session) {

			// 1. 인증된 관리자 확인
			AuthProfile admin = authValidator.requireAdmin(session);

			// 2. 접수 상태에서 검토 중 상태로 변경
			// 상태 검증 및 검토 이력 저장은 서비스에서 처리
			adminReportService.reviewReport(reportCode, admin.getCode());

			return ResponseEntity.ok(
							ApiResponse.<Void>success("신고 검토를 시작했습니다.", null));
	}

	// 신고 처리 완료
	// /resolve: 경고·정지·강제 탈퇴를 실제로 적용하고 RESOLVED로 변경, 처리 이력 저장
	@PatchMapping("/{reportCode}/resolve")
	public ResponseEntity<ApiResponse<Void>> resolveReport(
					@PathVariable Long reportCode,
					@RequestBody ResolveReportRequest request,
					HttpSession session) {

			// 1. 인증된 관리자 확인
			AuthProfile admin = authValidator.requireAdmin(session);

			// 2. 경고·정지·강제 탈퇴 조치 및 처리 완료
			// 실제 회원 조치, 신고 상태 변경, 처리 이력을 함께 저장
			adminReportService.resolveReport(
							reportCode, admin.getCode(), request);

			return ResponseEntity.ok(
							ApiResponse.<Void>success("신고 처리가 완료되었습니다.", null));
	}

	// 신고 기각
	// /reject: 반려 사유를 저장하고 REJECTED로 변경, 처리 이력 저장
	@PatchMapping("/{reportCode}/reject")
	public ResponseEntity<ApiResponse<Void>> rejectReport(
					@PathVariable Long reportCode,
					@RequestBody ReportActionMemoRequest request,
					HttpSession session) {

			// 1. 인증된 관리자 확인
			AuthProfile admin = authValidator.requireAdmin(session);

			// 2. 기각 가능한 상태 확인 후 기각 및 이력 저장
			adminReportService.rejectReport(
							reportCode, admin.getCode(), request);

			return ResponseEntity.ok(
							ApiResponse.<Void>success("신고가 기각되었습니다.", null));
	}

	// 신고로 적용한 조치 취소
	// 정지 해제 또는 강제 탈퇴한 회원 복구 등
	@PatchMapping("/{reportCode}/actions/{processLogCode}/cancel")
	public ResponseEntity<ApiResponse<Void>> cancelReportAction(
					@PathVariable Long reportCode,
					@PathVariable Long processLogCode,
					@RequestBody ReportActionMemoRequest request,
					HttpSession session) {

			// 1. 인증된 관리자 확인
			AuthProfile admin = authValidator.requireAdmin(session);

			// 2. 지정한 원본 처리의 조치 취소
			// 다른 신고로 적용된 제재가 있다면 함께 해제하지 않도록 검증
			adminReportService.cancelReportAction(
							reportCode, processLogCode, admin.getCode(), request);

			return ResponseEntity.ok(
							ApiResponse.<Void>success("신고 조치가 취소되었습니다.", null));
	}

	// 취소했던 신고 조치 복구
	// 회원 계정 복구가 아니라 기존 제재를 다시 적용하는 기능
	@PatchMapping("/{reportCode}/actions/{processLogCode}/restore")
	public ResponseEntity<ApiResponse<Void>> restoreReportAction(
					@PathVariable Long reportCode,
					@PathVariable Long processLogCode,
					@RequestBody ReportActionMemoRequest request,
					HttpSession session) {

			// 1. 인증된 관리자 확인
			AuthProfile admin = authValidator.requireAdmin(session);

			// 2. 취소된 원본 처리의 조치를 다시 적용
			adminReportService.restoreReportAction(
							reportCode, processLogCode, admin.getCode(), request);

			return ResponseEntity.ok(
							ApiResponse.<Void>success("신고 조치가 다시 적용되었습니다.", null));
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

