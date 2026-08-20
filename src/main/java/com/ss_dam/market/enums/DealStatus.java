package com.ss_dam.market.enums;

// 거래 상태 관련 상수
public enum DealStatus {
  ON_SALE("ON_SALE", "판매중"),
  SOLD("SOLD", "판매완료"),
  IN_PROGRESS("IN_PROGRESS", "예약중");

  private final String code;
  private final String label;

  DealStatus(String code, String label) {
    this.code = code;
    this.label = label;
  }

  public String getCode() {
    return code;
  }

  public String getLabel() {
    return label;
  }
}
