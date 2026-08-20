package com.ss_dam.feed.model.response;

import com.ss_dam.admin.log.response.AdminActivitySummary;

// 일반 사용자용 조회 DTO 상속
public class AdminFeedView extends UserFeedView {

  // 관리자가 추가로 조회할 내용
  private String status; // 상태
  private String updatedBy; // 수정자 아이디
  private int countFeedReport; // 신고 누적 수
  private String authorStatus; // 작성자 활성 상태
  private String countAuthorReport; // 작성자 누적 신고 수

  // 관리자 활동 로그
  // 목록에서 간단하게 조회할 활동 내역
  private AdminActivitySummary adminActivitySummary;

  // GETTER, SETTER
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

  public int getCountFeedReport() {
    return countFeedReport;
  }

  public void setCountFeedReport(int countFeedReport) {
    this.countFeedReport = countFeedReport;
  }

  public String getAuthorStatus() {
    return authorStatus;
  }

  public void setAuthorStatus(String authorStatus) {
    this.authorStatus = authorStatus;
  }

  public String getCountAuthorReport() {
    return countAuthorReport;
  }

  public void setCountAuthorReport(String countAuthorReport) {
    this.countAuthorReport = countAuthorReport;
  }

  public AdminActivitySummary getAdminActivitySummary() {
    return adminActivitySummary;
  }

  public void setAdminActivitySummary(AdminActivitySummary adminActivitySummary) {
    this.adminActivitySummary = adminActivitySummary;
  }
}
