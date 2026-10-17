package com.ss_dam.point.model;

public class PaymentPoint {
  private int point; // 거래할 포인트
  private Long sellerCode; // 판매자
  private Long buyerCode; // 구매자

  public int getPoint() {
    return point;
  }

  public void setPoint(int point) {
    this.point = point;
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
}
