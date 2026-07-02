package com.ss_dam.auth.login;

public class Login {
  private Long code;
  private String memberId;
  private String password;
  private String name;
  private String role;

  public Long getCode() {
    return code;
  }

  public void setCode(Long code) {
    this.code = code;
  }
  
  public String getMemberId() {
    return memberId;
  }

  public void setMemberId(String memberId) {
    this.memberId = memberId;
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

  public String getRole() {
    return role;
  }

  public void setRole(String role) {
    this.role = role;
  }


}
