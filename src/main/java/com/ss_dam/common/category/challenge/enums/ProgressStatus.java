package com.ss_dam.common.category.challenge.enums;

import com.fasterxml.jackson.annotation.JsonValue;

public enum ProgressStatus {
  WAITING("대기"),
  IN_PROGRESS("진행중"),
  ENDED("종료");

  private final String label;

  ProgressStatus(String label) {
    this.label = label;
  }

  @JsonValue
  public String getLabel() {
    return label;
  }
}
