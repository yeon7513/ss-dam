package com.ss_dam.common.chat.model.request;

// 하나의 채팅을 등록할 때 사용할 DTO
public class ChatMessageCreate {
  private Long roomCode; // 어떤 채팅방 소속인지 (DB 저장용)
  private String roomId; // 소속된 채팅방의 아이디 (엔드포인트용)
  private Long senderCode; // 보낸 사람이 누구인지
  private String message; // 메시지 본문


  // GETTER, SETTER
  public Long getRoomCode() {
    return roomCode;
  }

  public void setRoomCode(Long roomCode) {
    this.roomCode = roomCode;
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

  public String getRoomId() {
    return roomId;
  }

  public void setRoomId(String roomId) {
    this.roomId = roomId;
  }
}
