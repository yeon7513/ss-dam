package com.ss_dam.point.enums;

import com.fasterxml.jackson.annotation.JsonFormat;

@JsonFormat(shape = JsonFormat.Shape.OBJECT)
public enum PointType {
  USED("USED", "사용"),
  SAVED("SAVED", "적립");

  private final String code;
  private final String label;

  PointType(String code, String label) {
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
