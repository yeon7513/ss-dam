package com.ss_dam.comment.model.request;

// 댓글 수정용 DTO
public class CommentUpdate {
  private String content; // 댓글 내용
  private String status; // 댓글 상태
  private String updatedBy; // 수정자
  private String updatedAt; // 수정일
  private boolean deleteYn; // 삭제 여부

  // GETTER, SETTER
  public String getContent() {
    return content;
  }

  public void setContent(String content) {
    this.content = content;
  }

  public String getStatus() {
    return status;
  }

  public void setStatus(String status) {
    this.status = status;
  }

  public String getUpdatedBy() {
    return updatedBy;
  }

  public void setUpdatedBy(String updatedBy) {
    this.updatedBy = updatedBy;
  }

  public String getUpdatedAt() {
    return updatedAt;
  }

  public void setUpdatedAt(String updatedAt) {
    this.updatedAt = updatedAt;
  }

  public boolean isDeleteYn() {
    return deleteYn;
  }

  public void setDeleteYn(boolean deleteYn) {
    this.deleteYn = deleteYn;
  }
}
