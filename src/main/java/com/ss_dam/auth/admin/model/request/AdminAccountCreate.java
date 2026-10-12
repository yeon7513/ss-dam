package com.ss_dam.auth.admin.model.request;

public class AdminAccountCreate {
  private Long code; // 새로 만들어진 관리자 계정의 PK
  private Long admCode; // 관리자 계정을 생성한 관리자의 PK
  private String empId;
  private String password;
  private String name;
  private String dept;
  private String role;

  // GETTER, SETTER
  public Long getCode() {
    return code;
  }

  public void setCode(Long code) {
    this.code = code;
  }

  public Long getAdmCode() {
    return admCode;
  }

  public void setAdmCode(Long admCode) {
    this.admCode = admCode;
  }

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

}
