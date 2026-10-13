package com.ss_dam.auth.admin.enums;

import com.fasterxml.jackson.annotation.JsonValue;

public enum AdminDept {
  OPERATION("운영·관리"),
  PLANNING("기획");

  private final String label;

  AdminDept(String label) {
    this.label = label;
  }

  @JsonValue
  public String getLabel() {
    return label;
  }
}
