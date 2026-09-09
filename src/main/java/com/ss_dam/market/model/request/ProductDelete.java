package com.ss_dam.market.model.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class ProductDelete {

  @NotBlank(message = "처리 사유는 필수입니다.")
  @Size(max = 500, message = "처리 사유는 500자 이내로 입력해주세요.") //처리 사유 검증 어노테이션
  private String reason; //관리자 삭제 처리 사유

  //Getter&Setter
  public String getReason() {
    return reason;
  }

  public void setReason(String reason) {
    this.reason = reason;
  }


}
