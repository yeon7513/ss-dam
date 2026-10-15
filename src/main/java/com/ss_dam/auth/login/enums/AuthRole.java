package com.ss_dam.auth.login.enums;

import com.fasterxml.jackson.annotation.JsonFormat;

@JsonFormat(shape = JsonFormat.Shape.OBJECT)
public enum AuthRole {
  ROLE_MEMBER("MEMBER", "일반회원"),
  ROLE_STAFF("ROLE_STAFF", "스태프"),
  ROLE_MANAGER("ROLE_MANAGER", "매니저"),
  ROLE_SUPER("ROLE_SUPER", "최고관리자");

  private final String code;
  private final String label;

  AuthRole(String code, String label) {
    this.code = code;
    this.label = label;
  }

  public String getCode() {
    return code;
  }

  public String getLabel() {
    return label;
  }
}
