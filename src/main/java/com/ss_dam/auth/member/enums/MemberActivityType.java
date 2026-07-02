package com.ss_dam.auth.member.enums;

// 나중에 수정할 것!!
public enum MemberActivityType {
  SIGNUP_WELCOME_POINT("신규 가입 웰컴 포인트 지급"),
  USER_PROFILE_UPDATE("사용자 프로필 변경"),
  ADMIN_LEVEL_ADJUST("관리자에 의한 등급 조정");

  private String description;

  MemberActivityType(String description) {
    this.description = description;
  }

  public String getDescription() {
    return description;
  }

  public void setDescription(String description) {
    this.description = description;
  }
}
