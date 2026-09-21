package com.ss_dam.common.chat.model.response;

import java.util.List;

// 컨트롤러에서 ChatMessageView를 리스트로 받지 않고
// ChatDetailView를 따로 받는 이유
// -> ChatMessageView : 하나의 채팅 메시지 (즉, 채팅 버블에 해당)
// -> ChatDetailView
// --> 상대방 프로필 정보나 거래글 요약 정보 등을
//     채팅방 자체에서도 보기 위해 DTO를 따로 선언
public class ChatDetailView {
  private List<ChatMessageView> messages; // 지난 메시지 -> DB에 저장된 내역
  private String roomId;
  private ChatRoomInfo info;

  // GETTER, SETTER
  public List<ChatMessageView> getMessages() {
    return messages;
  }

  public void setMessages(List<ChatMessageView> messages) {
    this.messages = messages;
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
