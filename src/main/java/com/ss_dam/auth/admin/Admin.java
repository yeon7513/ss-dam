package com.ss_dam.auth.admin;

public class Admin {
  private String empId; // 아이디
  private String password; // 비밀번호
  private String name; // 이름
  private String phone; // 연락처
  private String dept; // 소속
  private String role; // 등급
  private String createdAt; // 가입일
  private String updatedAt; // 수정일
  private String loggedAt; // 마지막 로그인
  private boolean deleteYn; // 삭제 여부

  public String getEmpId() {
    return empId;
  }

  public void setEmpId(String empId) {
    this.empId = empId;
  }

  public String getPassword() {
    return password;
  }

  public void setPassword(String password) {
    this.password = password;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getPhone() {
    return phone;
  }

  public void setPhone(String phone) {
    this.phone = phone;
  }

  public String getDept() {
    return dept;
  }

  public void setDept(String dept) {
    this.dept = dept;
  }

  public String getRole() {
    return role;
  }

  public void setRole(String role) {
    this.role = role;
  }

  public String getCreatedAt() {
    return createdAt;
  }

  public void setCreatedAt(String createdAt) {
    this.createdAt = createdAt;
  }

  public String getUpdatedAt() {
    return updatedAt;
  }

  public void setUpdatedAt(String updatedAt) {
    this.updatedAt = updatedAt;
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
