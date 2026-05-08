package com.ss_dam.global.likes;

public class CommentLike {
  // UPSERT 적용하면 필드 변경할 것!
  private Long cmtCode;
  private String memberId;
  private String createdAt;

  public Long getCmtCode() {
    return cmtCode;
  }

  public void setCmtCode(Long cmtCode) {
    this.cmtCode = cmtCode;
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
