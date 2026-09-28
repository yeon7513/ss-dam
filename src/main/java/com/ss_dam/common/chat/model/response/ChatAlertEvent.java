package com.ss_dam.common.chat.model.response;

// 개인 알림 및 목록 갱신용 DTO
public class ChatAlertEvent {
  private String roomId;
  private ChatMessageView message;

  // GETTER, SETTER
  public String getRoomId() {
    return roomId;
  }

  public void setRoomId(String roomId) {
    this.roomId = roomId;
  }

  public ChatMessageView getMessage() {
    return message;
  }

  public void setMessage(ChatMessageView message) {
    this.message = message;
  }
}
