package com.ss_dam.common.chat.model.response;

// 하나의 메시지에 대한 DTO
// ChatRoomDetail에서 List로 뽑아와 사용함.
public class ChatMessageView {
  private Long code; // 메시지 고유 번호 (PK)
  private Long senderCode; // 메시지를 전송한 회원의 PK -> 로그인한 사용자와 비교용
  private String message; // 메시지 본문
  private String createdAt; // 메시지 전송 시간


  // GETTER, SETTER
  public Long getCode() {
    return code;
  }

  public void setCode(Long code) {
    this.code = code;
  }

  public Long getSenderCode() {
    return senderCode;
  }

  public void setSenderCode(Long senderCode) {
    this.senderCode = senderCode;
  }

  public String getMessage() {
    return message;
  }

  public void setMessage(String message) {
    this.message = message;
  }

  public String getCreatedAt() {
    return createdAt;
  }

  public void setCreatedAt(String createdAt) {
    this.createdAt = createdAt;
  }
}
