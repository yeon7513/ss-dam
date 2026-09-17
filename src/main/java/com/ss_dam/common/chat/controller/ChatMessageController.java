package com.ss_dam.common.chat.controller;

import com.ss_dam.common.chat.model.request.ChatMessageCreate;
import com.ss_dam.common.chat.model.response.ChatMessageView;
import com.ss_dam.common.chat.service.ChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import java.util.Map;

// STOMP 컨트롤러
// 각각의 메시지를 DB에 저장하고,
// 해당 채팅방에 메시지를 뿌리는 역할을 수행하는 컨트롤러
@Controller
public class ChatMessageController {

  @Autowired
  ChatService chatService;
  SimpMessagingTemplate messagingTemplate;

  // @MessageMapping
  // 클라이언트가 특정 엔드포인트로 전송한 메시지를
  // 서버의 해당 메소드가 처리하도록 매핑을 진행하주는 어노테이션

  // @SendTo
  // @MessageMapping으로 처리한 후 메소드의 반환값을
  // 특정 목적지로 보내도록 지정하는 어노테이션
  // 지금은 사용하지 않음. 이 어노테이션을 사용하면
  // 한 곳으로만 흘러가기 때문에 각자 다른 roomCode로 보내줘야함!

  // 클라이언트에서 새로운 메시지를 보낼 경우,
  // 엔드포인트는 "/pub/send"로 요청
  @MessageMapping("/send")
  public void sendMessage(ChatMessageCreate chatMessageCreate,
      SimpMessageHeaderAccessor headerAccessor) {

    // HttpSessionHandshakeInterceptor를 통해
    // WebSocket attribute로 복사된 로그인한 사용자의 PK를 가져옴
    Map<String, Object> sessionAttributes = headerAccessor.getSessionAttributes();

    // 인터셉터를 걸었어도 혹시모를 상황에 대비해 2차 방어
    if (sessionAttributes == null) {
      return;
    }

    // 메시지를 보낸 회원의 고유 번호 설정
    Long senderCode = (Long) sessionAttributes.get("code");
    chatMessageCreate.setSenderCode(senderCode);

    // 전송된 메시지를 DB에 저장
    ChatMessageView chatMessageView = chatService.registerChatMessage(chatMessageCreate);

    String roomId = null;
    // 해당 채팅방을 구독 중인 클라이언트들에게 실시간으로 전송
    String endpoint = "/sub/chat/room/" + roomId;

    // 즉 이 endpoint를 구독 중인 사용자들에게 전송하는 것!
    // 각각의 채팅방에 있는 사용자를 구분하기 위해...
    // 백엔드 컨트롤러가 아닌, 프론트엔드의 엔드포인트로 넘어감.
    messagingTemplate.convertAndSend(endpoint, chatMessageView);

  }
}
