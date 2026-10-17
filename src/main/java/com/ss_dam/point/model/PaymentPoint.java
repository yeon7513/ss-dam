package com.ss_dam.point.model;

public class PaymentPoint {
  private int amount; // 거래할 포인트
  private Long sellerCode; // 판매자
  private Long buyerCode; // 구매자
  private Long prodCode;

  public int getAmount() {
    return amount;
  }

  public void setAmount(int amount) {
    this.amount = amount;
  }

  public Long getSellerCode() {
    return sellerCode;
  }

  public void setSellerCode(Long sellerCode) {
    this.sellerCode = sellerCode;
  }

  public Long getBuyerCode() {
    return buyerCode;
  }

  public void setBuyerCode(Long buyerCode) {
    this.buyerCode = buyerCode;
  }

  public Long getProdCode() {
    return prodCode;
  }

  public void setProdCode(Long prodCode) {
    this.prodCode = prodCode;
  }
}
