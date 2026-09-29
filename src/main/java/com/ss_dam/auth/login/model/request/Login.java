package com.ss_dam.auth.login.model.request;

// 로그인 시 사용하는 DTO
// -> 이걸로 DB에 접근
public class Login {
  private String id;
  private String password;

  // GETTER, SETTER
  public String getId() {
    return id;
  }

  public void setId(String id) {
    this.id = id;
  }

  public String getPassword() {
    return password;
  }

  public void setPassword(String password) {
    this.password = password;
  }
}
