package com.ss_dam.admin.report.model.response;

import java.time.LocalDateTime;

// 관리자 화면에서 사용하는 신고 한 건의 조회 응답
// 신고 한 건의 정보. 관리자 신고 목록과 회원 상세에서 함께 사용
public class ReportView {

    private Long code;                  // 신고 번호
    private Long reporterCode;          // 신고한 회원 번호
    private String targetType;          // 신고 대상 유형: feed, comment, market
    private Long targetCode;            // 신고 대상 번호
    private String reasonType;          // 신고 사유
    private String content;             // 신고 상세 내용
    private String status;              // 처리 상태
    private LocalDateTime createdAt;    // 신고일

    public Long getCode() {
        return code;
    }

    public void setCode(Long code) {
        this.code = code;
    }

    public Long getReporterCode() {
        return reporterCode;
    }

    public void setReporterCode(Long reporterCode) {
        this.reporterCode = reporterCode;
    }

    public String getTargetType() {
        return targetType;
    }

    public void setTargetType(String targetType) {
        this.targetType = targetType;
    }

    public Long getTargetCode() {
        return targetCode;
    }

    public void setTargetCode(Long targetCode) {
        this.targetCode = targetCode;
    }

    public String getReasonType() {
        return reasonType;
    }

    public void setReasonType(String reasonType) {
        this.reasonType = reasonType;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}