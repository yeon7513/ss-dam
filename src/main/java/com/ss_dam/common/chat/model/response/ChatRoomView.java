package com.ss_dam.common.chat.model.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.ss_dam.auth.member.MemberProfile;
import com.ss_dam.common.chat.enums.ChatType;
import com.ss_dam.market.model.response.UserProductView;

// 채팅방 목록 DTO
public class ChatRoomView {
  private Long code; // 채팅방 고유 번호 (PK, 개발 전용)
  private String roomId; // 채팅방 접근 고유 아이디 (엔드포인트 접근용)
  private ChatType type; // 채팅방 타입 (DEAL, ADMIN, DIRECT)

  // 상대방 프로필 정보
  private MemberProfile otherMemberProfile;

  // 마지막 메시지 요약
  private String lastMessage; // 최근 메시지 본문
  private String lastMessageTime; // 최근 메시지 전송 시간
  private int unreadCount; // 안 읽은 메시지 수

  // 거래글일 경우 요약 정보 (type == DEAL일 때만 사용)
  @JsonInclude(JsonInclude.Include.NON_NULL)
  private UserProductView productInfo;


  // GETTER, SETTER
  public Long getCode() {
    return code;
  }

  public void setCode(Long code) {
    this.code = code;
  }

  public ChatType getType() {
    return type;
  }

  public void setType(ChatType type) {
    this.type = type;
  }

  public MemberProfile getOtherMemberProfile() {
    return otherMemberProfile;
  }

  public void setOtherMemberProfile(MemberProfile otherMemberProfile) {
    this.otherMemberProfile = otherMemberProfile;
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

  public UserProductView getProductInfo() {
    return productInfo;
  }

  public void setProductInfo(UserProductView productInfo) {
    this.productInfo = productInfo;
  }

  public String getRoomId() {
    return roomId;
  }

  public void setRoomId(String roomId) {
    this.roomId = roomId;
  }
}
