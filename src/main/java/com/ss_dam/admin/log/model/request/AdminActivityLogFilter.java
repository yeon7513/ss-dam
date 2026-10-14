package com.ss_dam.admin.log.model.request;

import java.time.LocalDate;

import org.springframework.format.annotation.DateTimeFormat;

import com.ss_dam.common.pager.PageQuery;

public class AdminActivityLogFilter extends PageQuery {

    private String targetType;
    private String processType;
    private Long admCode;
    private Long targetCode;
    private Long reportCode;

    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
    private LocalDate from;

    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
    private LocalDate to;

    public String getTargetType() {
        return targetType;
    }

    public void setTargetType(String targetType) {
        this.targetType = targetType;
    }

    public String getProcessType() {
        return processType;
    }

    public void setProcessType(String processType) {
        this.processType = processType;
    }

    public Long getAdmCode() {
        return admCode;
    }

    public void setAdmCode(Long admCode) {
        this.admCode = admCode;
    }

    public Long getTargetCode() {
        return targetCode;
    }

    public void setTargetCode(Long targetCode) {
        this.targetCode = targetCode;
    }

    public Long getReportCode() {
        return reportCode;
    }

    public void setReportCode(Long reportCode) {
        this.reportCode = reportCode;
    }

    public LocalDate getFrom() {
        return from;
    }

    public void setFrom(LocalDate from) {
        this.from = from;
    }

    public LocalDate getTo() {
        return to;
    }

    public void setTo(LocalDate to) {
        this.to = to;
    }
}