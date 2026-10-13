package com.ss_dam.admin.report.service;

import com.ss_dam.admin.report.model.request.AdminReportQuery;
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

    // 관리자 회원 상세 - 신고내역 탭
    AdminMemberReportsView loadMemberReports(
            Long memberCode, PageQuery pageQuery);
}