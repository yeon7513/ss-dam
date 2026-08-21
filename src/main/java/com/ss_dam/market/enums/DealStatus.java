package com.ss_dam.market.enums;

import com.fasterxml.jackson.annotation.JsonValue;

// 거래 상태 관련 상수
public enum DealStatus {
  ON_SALE("판매중"),
  SOLD("판매완료"),
  IN_PROGRESS("예약중");

  private final String label;

  DealStatus(String label) {
    this.label = label;
  }

  @JsonValue
  public String getLabel() {
    return label;
  }
}
