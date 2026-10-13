package com.ss_dam.auth.admin.model.response;

import com.ss_dam.auth.admin.enums.AdminDept;

// 상사 전용 DTO
public class AdminSupervisorView {
  private Long code; // 관리자 고유 번호
  private String empId; // 관리자 아이디
  private String name; // 이름
  private AdminDept dept; // 소속 부서
  private String role; // 권한

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

  public String getRole() {
    return role;
  }

  public void setRole(String role) {
    this.role = role;
  }
}
