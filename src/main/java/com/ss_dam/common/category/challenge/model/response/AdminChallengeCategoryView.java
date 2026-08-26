package com.ss_dam.common.category.challenge.model.response;

import com.ss_dam.common.enums.PostStatus;

public class AdminChallengeCategoryView extends UserChallengeCategoryView {
  private PostStatus postStatus; // 노출 상태
  private boolean deleteYn; // 삭제 여부
  private String createdBy; // 작성한 관리자
  private String createdAt; // 작성일
  private String updatedBy; // 수정한 관리자
  private String updatedAt; // 수정일

  // GETTER, SETTER
  public PostStatus getPostStatus() {
    return postStatus;
  }

  public void setPostStatus(PostStatus postStatus) {
    this.postStatus = postStatus;
  }

  public boolean isDeleteYn() {
    return deleteYn;
  }

  public void setDeleteYn(boolean deleteYn) {
    this.deleteYn = deleteYn;
  }

  public String getCreatedBy() {
    return createdBy;
  }

  public void setCreatedBy(String createdBy) {
    this.createdBy = createdBy;
  }

  public String getCreatedAt() {
    return createdAt;
  }

  public void setCreatedAt(String createdAt) {
    this.createdAt = createdAt;
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
}
