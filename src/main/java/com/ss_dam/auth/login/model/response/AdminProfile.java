package com.ss_dam.auth.login.model.response;

import com.ss_dam.auth.admin.enums.AdminDept;

public class AdminProfile implements AuthProfile {
  private Long code;
  private String empId;
  private String role;
  private String name;
  private AdminDept dept;

  // getter, setter
  @Override
  public Long getCode() {
    return code;
  }

  @Override
  public String getId() {
    return empId;
  }

  @Override
  public String getRole() {
    return role;
  }

  @Override
  public String getName() {
    return name;
  }

  public AdminDept getDept() {
    return dept;
  }

  public void setDept(AdminDept dept) {
    this.dept = dept;
  }
}
