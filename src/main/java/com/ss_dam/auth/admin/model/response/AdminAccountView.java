package com.ss_dam.auth.admin.model.response;

import com.ss_dam.auth.admin.enums.AdminDept;
import com.ss_dam.auth.admin.enums.AdminRoles;

public class AdminAccountView {
  private Long code; // 관리자 고유 번호
  private String empId; // 관리자 아이디
  private String name; // 이름
  private AdminDept dept; // 소속 부서
  private AdminRoles role; // 권한
  private String createdAt; // 계정 생성일
  private String loggedAt; // 마지막 로그인
  private boolean deleteYn; // 삭제 여부

  // GETTER & SETTER
  public Long getCode() {
    return code;
  }

  public void setCode(Long code) {
    this.code = code;
  }

  public String getEmpId() {
    return empId;
  }

  public void setEmpId(String empId) {
    this.empId = empId;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public AdminDept getDept() {
    return dept;
  }

  public void setDept(AdminDept dept) {
    this.dept = dept;
  }

  public AdminRoles getRole() {
    return role;
  }

  public void setRole(AdminRoles role) {
    this.role = role;
  }

  public String getCreatedAt() {
    return createdAt;
  }

  public void setCreatedAt(String createdAt) {
    this.createdAt = createdAt;
  }

  public String getLoggedAt() {
    return loggedAt;
  }

  public void setLoggedAt(String loggedAt) {
    this.loggedAt = loggedAt;
  }

  public boolean isDeleteYn() {
    return deleteYn;
  }

  public void setDeleteYn(boolean deleteYn) {
    this.deleteYn = deleteYn;
  }
}
