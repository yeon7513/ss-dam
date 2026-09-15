package com.ss_dam.report.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

//Admin: 전체 신고 조회, 신고 검토·처리, 처리 상태 변경

@RestController 
@RequestMapping ("/api/admin/reports")
public class AdminReportController {

/*
// 전체 신고 조회
// GET /api/admin/reports
// 접수된 신고 조회
// GET /api/admin/reports?status=PENDING
// 검토 중인 신고 조회
// GET /api/admin/reports?status=IN_REVIEW
// 처리 완료된 신고 조회
// GET /api/admin/reports?status=RESOLVED
// 기각된 신고 조회
// GET /api/admin/reports?status=REJECTED

// 피드 신고 조회
// GET /api/admin/reports?targetType=FEED
// 댓글 신고 조회
// GET /api/admin/reports?targetType=COMMENT
// 상품 신고 조회
// GET /api/admin/reports?targetType=PRODUCT

// 필터 조합: 접수 상태인 댓글 신고
// GET /api/admin/reports?status=PENDING&targetType=COMMENT
// 위 필터는 같은 @GetMapping에서 @RequestParam으로 받음
@GetMapping

// 신고 상세 조회
@GetMapping("/{reportCode}")

// 신고 검토 시작
@PatchMapping("/{reportCode}/review")

// 신고 처리 완료 (처리 내용·사유 기록)
@PatchMapping("/{reportCode}/resolve")

// 신고 기각 (기각 사유 기록)
@PatchMapping("/{reportCode}/reject")

// 신고 재검토를 위해 다시 열기
@PatchMapping("/{reportCode}/reopen")

// 신고 처리 이력 조회
@GetMapping("/{reportCode}/logs")
 */

//아직 신고 상태 정의가 없어서 아래 필터 이름과 상태값은 구성안
//신고 처리 완료와 게시물 숨김·삭제는 별개의 처리예요. 
//신고를 처리하면서 게시물도 숨길 정책이라면 서비스에서 두 작업을 연결
}
