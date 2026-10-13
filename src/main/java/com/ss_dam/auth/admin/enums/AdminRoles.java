package com.ss_dam.auth.admin.enums;

import com.fasterxml.jackson.annotation.JsonFormat;

@JsonFormat(shape = JsonFormat.Shape.OBJECT)
public enum AdminRoles {
  ROLE_STAFF("ROLE_STAFF", "스태프"),
  ROLE_MANAGER("ROLE_MANAGER", "매니저"),
  ROLE_SUPER("ROLE_SUPER", "최고관리자");

  private final String code;
  private final String label;

  AdminRoles(String code, String label) {
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
