package com.ss_dam.auth.admin.model.response;

import com.fasterxml.jackson.annotation.JsonInclude;

public class AdminAccountDetail extends AdminAccountView {
  private String phone; // 연락처

  // 상사 정보 (있다면..)
  @JsonInclude(JsonInclude.Include.NON_NULL)
  private AdminSupervisorView supervisor;

  // GETTER, SETTER
  public String getPhone() {
    return phone;
  }

  public void setPhone(String phone) {
    this.phone = phone;
  }

  public AdminSupervisorView getSupervisor() {
    return supervisor;
  }

  public void setSupervisor(AdminSupervisorView supervisor) {
    this.supervisor = supervisor;
  }
}
