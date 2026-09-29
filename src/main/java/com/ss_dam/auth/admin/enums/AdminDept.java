package com.ss_dam.auth.admin.enums;

public enum AdminDept {
  OPERATION("운영/관리"),
  PLANNING("기획");

  private final String label;

  AdminDept(String label) {
    this.label = label;
  }

  public String getLabel() {
    return label;
  }
}
