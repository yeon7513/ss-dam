package com.ss_dam.common.chat.enums;

public enum ChatType {
  DEAL("DEAL", "다시쓰담"),
  ADMIN("ADMIN", "관리자 알림"),
  DIRECT("DIRECT", "1:1 채팅");

  private final String code; // DB 저장용
  private final String label; // 클라이언트 렌더링용

  ChatType(String code, String label) {
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
