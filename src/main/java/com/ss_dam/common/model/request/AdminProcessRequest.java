package com.ss_dam.common.model.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

// 관리자 처리 사유를 받는 공통 요청 DTO
public class AdminProcessRequest {

    @NotBlank(message = "처리 사유를 입력해주세요.")
    @Size(max = 255, message = "처리 사유는 255자 이내로 입력해주세요.")
    private String reason;

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }
}
