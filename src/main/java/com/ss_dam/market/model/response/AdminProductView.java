package com.ss_dam.market.model.response;

import com.ss_dam.admin.log.response.AdminActivitySummary;
import com.ss_dam.common.enums.PostStatus;

// 관리자용 상품 목록 조회 DTO
// 일반 사용자용 조회 DTO 상속
public class AdminProductView extends UserProductView{

// 관리자가 추가로 조회할 정보
// createdAt, updatedAt, dealStatus, 작성자 프로필, 조회수, Pick 수 등은 UserProductView에서 상속받음
private PostStatus status; // 게시글 노출 상태
private boolean deleteYn;  // 삭제 여부
private String createdBy;  // 작성자 아이디
private String updatedBy;  // 마지막 수정자 아이디

// 신고 관리 기능이 있을 때 필요한 정보
private int countProductReport; // 상품 게시글 신고 누적 수
private String authorStatus;    // 작성자 계정 상태
private int countAuthorReport;  // 작성자가 받은 누적 신고 수

// 관리자 활동 로그 요약
private AdminActivitySummary adminActivitySummary;

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

  public String getUpdatedBy() {
    return updatedBy;
  }

  public void setUpdatedBy(String updatedBy) {
    this.updatedBy = updatedBy;
  }

  public int getCountProductReport() {
    return countProductReport;
  }

  public void setCountProductReport(int countProductReport) {
    this.countProductReport = countProductReport;
  }

  public String getAuthorStatus() {
    return authorStatus;
  }

  public void setAuthorStatus(String authorStatus) {
    this.authorStatus = authorStatus;
  }

  public int getCountAuthorReport() {
    return countAuthorReport;
  }

  public void setCountAuthorReport(int countAuthorReport) {
    this.countAuthorReport = countAuthorReport;
  }

  public AdminActivitySummary getAdminActivitySummary() {
    return adminActivitySummary;
  }

  public void setAdminActivitySummary(AdminActivitySummary adminActivitySummary) {
    this.adminActivitySummary = adminActivitySummary;
  }

}
