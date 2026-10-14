package com.ss_dam.admin.report.model.response;

import java.time.LocalDateTime;

// 관리자 신고 상세 조회 응답
// 처리 전·후 상세 화면에서 공통 사용

// 처리 전에는 처리 이력·관리자·조치 관련 필드가 null이면 ok
// actionStatus는 REPORT_LOG에 있는 컬럼이 아니라, 서비스에서 이력을 확인해 설정하는 값

public class AdminReportDetailView extends ReportView {

    // 신고자 로그인 ID
    private String reporterId;

    // 신고 대상 콘텐츠 작성자 정보
    // ReportView.targetCode는 콘텐츠 번호
    private Long targetMemberCode;
    private String targetMemberId;

    // 원본 처리 이력 번호 — REPORT_LOG.CODE
    private Long processLogCode;

    // 처리 관리자 번호 — REPORT_LOG.ADM_CODE
    private Long admCode;

    // 처리 관리자 정보 — ADMIN_ACCOUNT에서 조회
    private String processedAdminId;
    private String processedAdminName;
    private String processedAdminRole;

    // 원본 처리 시각 — REPORT_LOG.CREATED_AT
    private LocalDateTime processedAt;

    // 조치 종류: REJECT, WARNING, SUSPEND, WITHDRAW
    private String actionType;

    // 원본 처리 메모
    private String processMemo;

    // 조치 적용 상태: ACTIVE, CANCELED
    // 관련 처리·취소·복구 이력으로 계산
    // 미처리·반려는 null, 정지 만료는 suspendedUntil로 별도 판단
    private String actionStatus;

    // 정지 기간: THREE_DAYS, ONE_WEEK, ONE_MONTH
    // 정지 조치가 아니면 null
    private String suspensionPeriod;

    // 정지 종료 시각
    private LocalDateTime suspendedUntil;

    public String getReporterId() {
        return reporterId;
    }

    public void setReporterId(String reporterId) {
        this.reporterId = reporterId;
    }

    public Long getTargetMemberCode() {
        return targetMemberCode;
    }

    public void setTargetMemberCode(Long targetMemberCode) {
        this.targetMemberCode = targetMemberCode;
    }

    public String getTargetMemberId() {
        return targetMemberId;
    }

    public void setTargetMemberId(String targetMemberId) {
        this.targetMemberId = targetMemberId;
    }

    public Long getProcessLogCode() {
        return processLogCode;
    }

    public void setProcessLogCode(Long processLogCode) {
        this.processLogCode = processLogCode;
    }

    public Long getAdmCode() {
        return admCode;
    }

    public void setAdmCode(Long admCode) {
        this.admCode = admCode;
    }

    public String getProcessedAdminId() {
        return processedAdminId;
    }

    public void setProcessedAdminId(String processedAdminId) {
        this.processedAdminId = processedAdminId;
    }

    public String getProcessedAdminName() {
        return processedAdminName;
    }

    public void setProcessedAdminName(String processedAdminName) {
        this.processedAdminName = processedAdminName;
    }

    public String getProcessedAdminRole() {
        return processedAdminRole;
    }

    public void setProcessedAdminRole(String processedAdminRole) {
        this.processedAdminRole = processedAdminRole;
    }

    public LocalDateTime getProcessedAt() {
        return processedAt;
    }

    public void setProcessedAt(LocalDateTime processedAt) {
        this.processedAt = processedAt;
    }

    public String getActionType() {
        return actionType;
    }

    public void setActionType(String actionType) {
        this.actionType = actionType;
    }

    public String getProcessMemo() {
        return processMemo;
    }

    public void setProcessMemo(String processMemo) {
        this.processMemo = processMemo;
    }

    public String getActionStatus() {
        return actionStatus;
    }

    public void setActionStatus(String actionStatus) {
        this.actionStatus = actionStatus;
    }

    public String getSuspensionPeriod() {
        return suspensionPeriod;
    }

    public void setSuspensionPeriod(String suspensionPeriod) {
        this.suspensionPeriod = suspensionPeriod;
    }

    public LocalDateTime getSuspendedUntil() {
        return suspendedUntil;
    }

    public void setSuspendedUntil(LocalDateTime suspendedUntil) {
        this.suspendedUntil = suspendedUntil;
    }
}