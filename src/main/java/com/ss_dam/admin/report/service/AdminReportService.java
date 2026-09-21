package com.ss_dam.admin.report.service;

import com.ss_dam.admin.report.model.response.AdminMemberReportsView;
import com.ss_dam.common.pager.PageQuery;

public interface AdminReportService {
    
    //관리자 회원 상세 - 신고 내역 탭
    AdminMemberReportsView loadMemberReports(
            Long memberCode, PageQuery pageQuery);
}