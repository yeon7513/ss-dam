package com.ss_dam.auth.admin.enums;

import com.fasterxml.jackson.annotation.JsonFormat;

@JsonFormat(shape = JsonFormat.Shape.OBJECT)
public enum AdminDept {
  OPERATION("OPERATION", "운영·관리"),
  PLANNING("PLANNING", "기획");

  private final String code;
  private final String label;

  AdminDept(String code, String label) {
    this.code = code;
    this.label = label;
  }

  public String getLabel() {
    return label;
  }

  public String getCode() {
    return code;
  }
}
