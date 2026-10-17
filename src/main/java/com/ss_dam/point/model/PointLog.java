package com.ss_dam.point.model;

import com.ss_dam.point.enums.PointReason;
import com.ss_dam.point.enums.PointType;

public class PointLog {
  private Long code; // PK
  private Long memCode; // 회원 PK
  private PointType type; // 해당 ENUM 참조
  private int amount; // 포인트 수
  private PointReason reason; // 해당 ENUM 참조
  private String createdAt; // 생성일

  public Long getCode() {
    return code;
  }

  public void setCode(Long code) {
    this.code = code;
  }

  public Long getMemCode() {
    return memCode;
  }

  public void setMemCode(Long memCode) {
    this.memCode = memCode;
  }

  public PointType getType() {
    return type;
  }

  public void setType(PointType type) {
    this.type = type;
  }

  public int getAmount() {
    return amount;
  }

  public void setAmount(int amount) {
    this.amount = amount;
  }

  public PointReason getReason() {
    return reason;
  }

  public void setReason(PointReason reason) {
    this.reason = reason;
  }

  public String getCreatedAt() {
    return createdAt;
  }

  public void setCreatedAt(String createdAt) {
    this.createdAt = createdAt;
  }
}
