package com.ss_dam.admin.report.model.request;

import java.time.LocalDate;

import org.springframework.format.annotation.DateTimeFormat;

import com.ss_dam.common.pager.PageQuery;

public class AdminReportQuery extends PageQuery{

  // PENDING, IN_REVIEW, RESOLVED, REJECTED
  private String status;

  // true: PENDING, IN_REVIEW를 함께 조회
  // status와 동시에 전달하면 서비스에서 잘못된 요청으로 처리
  private Boolean pendingOnly;

  // feed, comment, market
  private String targetType;

  private String reasonType;

  // 신고일 검색 시작일·종료일
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
    private LocalDate startDate;

    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
    private LocalDate endDate;

    public AdminReportQuery() {
        setPerPage(12);
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Boolean getPendingOnly() {
        return pendingOnly;
    }

    public void setPendingOnly(Boolean pendingOnly) {
        this.pendingOnly = pendingOnly;
    }

    public String getTargetType() {
        return targetType;
    }

    public void setTargetType(String targetType) {
        this.targetType = targetType;
    }

    public String getReasonType() {
        return reasonType;
    }

    public void setReasonType(String reasonType) {
        this.reasonType = reasonType;
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    public LocalDate getEndDate() {
        return endDate;
    }

    public void setEndDate(LocalDate endDate) {
        this.endDate = endDate;
    }
}
  

