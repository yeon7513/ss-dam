package com.ss_dam.auth.admin.model.request;

import com.ss_dam.auth.admin.enums.AdminDept;
import com.ss_dam.auth.login.enums.AuthRole;

public class AdminAccountUpdate {
  private Long code;
  private String password;
  private String phone;
  private AdminDept dept;
  private AuthRole role;
  private boolean deleteYn;

  // GETTER, SETTER
  public Long getCode() {
    return code;
  }

  public void setCode(Long code) {
    this.code = code;
  }

  public String getPassword() {
    return password;
  }

  public void setPassword(String password) {
    this.password = password;
  }

  public String getPhone() {
    return phone;
  }

  public void setPhone(String phone) {
    this.phone = phone;
  }

  public AdminDept getDept() {
    return dept;
  }

  public void setDept(AdminDept dept) {
    this.dept = dept;
  }

  public AuthRole getRole() {
    return role;
  }

  public void setRole(AuthRole role) {
    this.role = role;
  }

  public boolean isDeleteYn() {
    return deleteYn;
  }

  public void setDeleteYn(boolean deleteYn) {
    this.deleteYn = deleteYn;
  }
}
