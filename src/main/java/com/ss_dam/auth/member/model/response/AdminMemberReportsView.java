package com.ss_dam.auth.member.model.response;

import com.ss_dam.admin.report.model.response.ReportView;
import com.ss_dam.common.pager.PageResult;

//회원의 신고 통계 3개와 PageResult<ReportView>를 묶는 DTO
public class AdminMemberReportsView {

    private Long totalReportCount;     // 전체 신고
    private Long pendingReportCount;   // 처리 대기
    private Long resolvedReportCount;  // 처리 완료

    // 기존 페이지 DTO + 신고 DTO 재사용
    private PageResult<ReportView> reports;


    // getter, setter
    public Long getTotalReportCount() {
        return totalReportCount;
    }

    public void setTotalReportCount(Long totalReportCount) {
        this.totalReportCount = totalReportCount;
    }

    public Long getPendingReportCount() {
        return pendingReportCount;
    }

    public void setPendingReportCount(Long pendingReportCount) {
        this.pendingReportCount = pendingReportCount;
    }

    public Long getResolvedReportCount() {
        return resolvedReportCount;
    }

    public void setResolvedReportCount(Long resolvedReportCount) {
        this.resolvedReportCount = resolvedReportCount;
    }

    public PageResult<ReportView> getReports() {
        return reports;
    }

    public void setReports(PageResult<ReportView> reports) {
        this.reports = reports;
    }

    
}