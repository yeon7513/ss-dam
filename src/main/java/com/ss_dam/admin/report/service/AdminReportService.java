package com.ss_dam.admin.report.service;

import com.ss_dam.admin.report.model.request.AdminReportQuery;
import com.ss_dam.admin.report.model.request.ReportActionMemoRequest;
import com.ss_dam.admin.report.model.request.ResolveReportRequest;
import com.ss_dam.admin.report.model.response.AdminMemberReportsView;
import com.ss_dam.admin.report.model.response.AdminReportDetailView;
import com.ss_dam.admin.report.model.response.ReportView;
import com.ss_dam.common.pager.PageQuery;
import com.ss_dam.common.pager.PageResult;

public interface AdminReportService {

    // 관리자 신고 목록
    PageResult<ReportView> loadReports(AdminReportQuery query);

    // 관리자 신고 상세
    AdminReportDetailView loadReport(Long reportCode);

    // 신고 검토 시작
    void reviewReport(Long reportCode, Long admCode);

    // 신고 처리 완료 및 제재 등록
    void resolveReport(
            Long reportCode,
            Long admCode,
            ResolveReportRequest request);

    // 신고 기각
    void rejectReport(
            Long reportCode,
            Long admCode,
            ReportActionMemoRequest request);

    // 신고 제재 취소 — 강제 탈퇴 취소 시 계정 이용 복구
    void cancelReportAction(
            Long reportCode,
            Long processLogCode,
            Long admCode,
            ReportActionMemoRequest request);

    // 취소했던 신고 제재 재적용
    void restoreReportAction(
            Long reportCode,
            Long processLogCode,
            Long admCode,
            ReportActionMemoRequest request);

    // 관리자 회원 상세 - 신고내역 탭
    AdminMemberReportsView loadMemberReports(
            Long memberCode, PageQuery pageQuery);
}