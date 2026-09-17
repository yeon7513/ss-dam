package com.ss_dam.common.chat.model.response;

import com.fasterxml.jackson.annotation.JsonInclude;

import java.util.List;

// 채팅방 접속 시 나올 메시지들 -> 즉, 대화 로그
// @JsonInclude를 붙인 이유
// -> 상속받은 ChatRoomView에 마지막 메시지 요약을 제외하기 위해..
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ChatRoomDetail extends ChatRoomView {
  private List<ChatMessageView> messages;

  // GETTER, SETTER
  public List<ChatMessageView> getMessages() {
    return messages;
  }

  public void setMessages(List<ChatMessageView> messages) {
    this.messages = messages;
  }
}
