package com.ss_dam.common.category.market.model.response;

import com.ss_dam.common.enums.PostStatus;

// 관리자용 카테고리 관리 DTO
public class AdminMarketCategoryView extends UserMarketCategoryView {
  private PostStatus status; // 카테고리 노출 상태
  private boolean deleteYn; // 카테고리 삭제 여부
  private String createdBy; // 생성한 관리자 아이디
  private String createdAt; // 카테고리 생성일
  private String updatedBy; // 수정한 관리자 아이디
  private String updatedAt; // 카테고리 수정일

  // GETTER, SETTER
  public PostStatus getStatus() {
    return status;
  }

  public void setStatus(PostStatus status) {
    this.status = status;
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
