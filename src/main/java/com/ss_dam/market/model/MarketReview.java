package com.ss_dam.market.model;

public class MarketReview {
  private Long code; // 후기 고유 번호
  private Long dealCode; // 거래 이력 고유 번호
  private Long memCode; // 후기를 작성한 회원의 고유 번호
  private String content; // 후기 내용
  private String createdAt; // 작성일
  private boolean deleteYn; // 삭제 여부

  public Long getCode() {
    return code;
  }

  public void setCode(Long code) {
    this.code = code;
  }

  public Long getDealCode() {
    return dealCode;
  }

  public void setDealCode(Long dealCode) {
    this.dealCode = dealCode;
  }

  public Long getMemCode() {
    return memCode;
  }

  public void setMemCode(Long memCode) {
    this.memCode = memCode;
  }

  public String getContent() {
    return content;
  }

  public void setContent(String content) {
    this.content = content;
  }

  public String getCreatedAt() {
    return createdAt;
  }

  public void setCreatedAt(String createdAt) {
    this.createdAt = createdAt;
  }

  public boolean isDeleteYn() {
    return deleteYn;
  }

  public void setDeleteYn(boolean deleteYn) {
    this.deleteYn = deleteYn;
  }

}
