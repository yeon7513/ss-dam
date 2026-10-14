package com.ss_dam.admin.report.model.request;

// 신고 처리 완료 요청
public class ResolveReportRequest {

    // WARNING: 경고, SUSPEND: 정지, WITHDRAW: 강제 탈퇴
    private String actionType;

    // 신고 처리 메모
    private String processMemo;

    // 정지 시 필수: THREE_DAYS, ONE_WEEK, ONE_MONTH
    // 경고·강제 탈퇴 시에는 null
    private String suspensionPeriod;

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

    public String getSuspensionPeriod() {
        return suspensionPeriod;
    }

    public void setSuspensionPeriod(String suspensionPeriod) {
        this.suspensionPeriod = suspensionPeriod;
    }
}