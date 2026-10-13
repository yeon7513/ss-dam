package com.ss_dam.auth.admin.model.filter;

import com.ss_dam.common.pager.PageQuery;

public class AdminAccountSearchFilter extends PageQuery {
  private String role; // 권한별
  private String dept; // 부서별
  private Boolean deleted; // 삭제 여부
  private String fromDate; // 계정 생성일 검색 시작일
  private String toDate; // 계정 생성일 검색 종료일

  // GETTER, SETTER
  public String getRole() {
    return role;
  }

  public void setRole(String role) {
    this.role = role;
  }

  public String getDept() {
    return dept;
  }

  public void setDept(String dept) {
    this.dept = dept;
  }

  public Boolean isDeleted() {
    return deleted;
  }

  public void setDeleted(Boolean deleted) {
    this.deleted = deleted;
  }

  public String getFromDate() {
    return fromDate;
  }

  public void setFromDate(String fromDate) {
    this.fromDate = fromDate;
  }

  public String getToDate() {
    return toDate;
  }

  public void setToDate(String toDate) {
    this.toDate = toDate;
  }

}
