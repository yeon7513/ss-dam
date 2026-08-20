package com.ss_dam.common.likes;

public class FeedLike {
  private Long feedCode; // 피드 고유 번호
  private String memCode; // 회원 고유 번호
  private String createdAt; // 좋아요 등록일
  private boolean deleteYn; // 삭제 여부

  public Long getFeedCode() {
    return feedCode;
  }

  public void setFeedCode(Long feedCode) {
    this.feedCode = feedCode;
  }

  public String getMemCode() {
    return memCode;
  }

  public void setMemCode(String memCode) {
    this.memCode = memCode;
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
