package com.ss_dam.market.enums;

import com.fasterxml.jackson.annotation.JsonValue;

// 거래 상태 관련 상수
public enum DealStatus {
  ON_SALE("판매중"),
  IN_PROGRESS("예약중"),
  SOLD("판매완료"),
  SUSPENDED("판매중지"); // 관리자가 거래를 막았을 경우
  // ex: 불법 물품 판매, 사행성 거래 등 신고를 받고 처리된 거래글일 경우

  private final String label;

  DealStatus(String label) {
    this.label = label;
  }

  @JsonValue
  public String getLabel() {
    return label;
  }
}
