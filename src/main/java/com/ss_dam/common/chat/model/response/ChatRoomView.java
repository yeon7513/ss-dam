package com.ss_dam.common.chat.model.response;

import com.ss_dam.common.chat.model.core.ChatRoomInfo;

// 채팅방 목록 DTO
public class ChatRoomView {
  private Long code; // 채팅방 고유 번호 (PK, 개발 전용)
  private String roomId; // 채팅방 접근 고유 아이디 (엔드포인트 접근용)

  // 상대방 및 거래글용 채팅일 시 요약 정보
  private ChatRoomInfo info;

  // 마지막 메시지 요약
  private String lastMessage; // 최근 메시지 본문
  private String lastMessageTime; // 최근 메시지 전송 시간
  private int unreadCount; // 안 읽은 메시지 수


  // GETTER, SETTER
  public Long getCode() {
    return code;
  }

  public void setCode(Long code) {
    this.code = code;
  }

  public String getLastMessage() {
    return lastMessage;
  }

  public void setLastMessage(String lastMessage) {
    this.lastMessage = lastMessage;
  }

  public String getLastMessageTime() {
    return lastMessageTime;
  }

  public void setLastMessageTime(String lastMessageTime) {
    this.lastMessageTime = lastMessageTime;
  }

  public int getUnreadCount() {
    return unreadCount;
  }

  public void setUnreadCount(int unreadCount) {
    this.unreadCount = unreadCount;
  }

  public String getRoomId() {
    return roomId;
  }

  public void setRoomId(String roomId) {
    this.roomId = roomId;
  }

  public ChatRoomInfo getInfo() {
    return info;
  }

  public void setInfo(ChatRoomInfo info) {
    this.info = info;
  }
}
