package com.ss_dam.admin.report.model.request;

// 신고 기각·조치 취소·조치 복구 요청
public class ReportActionMemoRequest {

    // 기각 또는 조치 변경 사유
    private String processMemo;

    public String getProcessMemo() {
        return processMemo;
    }

    public void setProcessMemo(String processMemo) {
        this.processMemo = processMemo;
    }
}