package com.ss_dam.common.likes;

public class MarketProductPick {

  private Long prodCode;
  private String memberId;
  private String createdAt;

  public Long getProdCode() {
    return prodCode;
  }

  public void setProdCode(Long prodCode) {
    this.prodCode = prodCode;
  }

  public String getMemberId() {
    return memberId;
  }

  public void setMemberId(String memberId) {
    this.memberId = memberId;
  }

  public String getCreatedAt() {
    return createdAt;
  }

  public void setCreatedAt(String createdAt) {
    this.createdAt = createdAt;
  }
}
