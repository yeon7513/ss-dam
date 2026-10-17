package com.ss_dam.point.enums;

import com.fasterxml.jackson.annotation.JsonFormat;

@JsonFormat(shape = JsonFormat.Shape.OBJECT)
public enum PointReason {
  CHARGING("CHARGING", "충전"),
  CHARGE_CANCEL("CHARGE_CANCEL", "충전 취소"),
  MARKET_PURCHASE("MARKET_PURCHASE", "구매"),
  MARKET_SALES("MARKET_SALES", "판매"),
  MARKET_REFUND("MARKET_REFUND", "환불"),
  POINT_ESCROW("POINT_ESCROW", "차감"),
  EXCHANGE("EXCHANGE", "환전"),
  TRANSFER("TRANSFER", "송금"),
  TRANSFER_RECEIVED("TRANSFER_RECEIVED", "송금 받음"),
  CHALLENGE_REWARD("CHALLENGE_REWARD", "챌린지 보상"),
  ADMIN_ADJUSTMENT("ADMIN_ADJUSTMENT", "관리자 조정");

  private final String code;
  private final String label;

  PointReason(String code, String label) {
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
