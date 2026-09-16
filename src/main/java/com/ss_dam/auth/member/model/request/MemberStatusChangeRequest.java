package com.ss_dam.auth.member.model.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class MemberStatusChangeRequest {
  //정지·해제는 /restrict, /release 주소로 구분하므로 이 DTO에는 사유만

  @NotBlank (message = "상태 변경 사유를 입력해주세요")
  @Size(max = 255, message = "상태 변경 사유는 255자 이내로 입력해주세요")
  private String reason;

   public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }

  
}
