package com.ss_dam.common.chat.controller;

import com.ss_dam.auth.login.Login;
import com.ss_dam.common.chat.model.request.ChatMessageCreate;
import com.ss_dam.common.chat.model.response.ChatMessageView;
import com.ss_dam.common.chat.service.ChatService;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import java.util.Map;

// STOMP 컨트롤러
// 각각의 메시지를 DB에 저장하고,
// 해당 채팅방에 메시지를 뿌리는 역할을 수행하는 컨트롤러
@Controller
public class ChatMessageController {

  private final ChatService chatService;
  private final SimpMessagingTemplate messagingTemplate;

  public ChatMessageController(ChatService chatService, SimpMessagingTemplate messagingTemplate) {
    this.chatService = chatService;
    this.messagingTemplate = messagingTemplate;
  }

  // SimpMessagingTemplate
  // 웹소켓 환경에서 STOMP 프로토콜을 사용할 때,
  // 서버에서 클라이언트로 실시간 메시지를 쉽게 전송할 수 있게 해주는 클래스
  // 즉, convertAndSend() 메소드로 특정 경로를 구독한 클라이언트들에게 메시지를 전송하는 역할

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
  public void sendMessage(@Payload ChatMessageCreate chatMessageCreate,
      SimpMessageHeaderAccessor headerAccessor) {

    System.out.println("========== [웹소켓 요청 도달] ==========");
    System.out.println("RoomId: " + chatMessageCreate.getRoomId());
    System.out.println("Message: " + chatMessageCreate.getMessage());

    // HttpSessionHandshakeInterceptor를 통해
    // WebSocket attribute로 복사된 로그인한 사용자의 PK를 가져옴
    Map<String, Object> sessionAttributes = headerAccessor.getSessionAttributes();

    // 인터셉터를 걸었어도 혹시모를 상황에 대비해 2차 방어
    if (sessionAttributes == null) {
      return;
    }

    // 메시지를 보낸 회원의 고유 번호 설정
    Login sender = (Login) sessionAttributes.get("loginUser");
    Long senderCode = sender.getCode();

    // 전송된 메시지를 DB에 저장
    // 단, DTO에 값을 세팅하는 로직은 서비스에서 수행함
    ChatMessageView chatMessageView =
        chatService.registerChatMessage(chatMessageCreate, senderCode);

    String roomId = chatMessageCreate.getRoomId();

    // 해당 채팅방을 구독 중인 클라이언트들에게 실시간으로 전송
    // 즉 이 endpoint를 구독 중인 사용자들에게 전송하는 것!
    // 각각의 채팅방에 있는 사용자를 구분하기 위해...
    // 백엔드 컨트롤러가 아닌, 프론트엔드의 엔드포인트로 넘어감.
    // -> 이 코드는 채팅방 내부용 실시간 채팅
    messagingTemplate.convertAndSend("/sub/chat/room/" + roomId, chatMessageView);

    // 26.09.21 추가
    // 사이드바쪽에 채팅방 목록 리스트에도 실시간으로 갱신해줘야함.
    // + 알림 갱신 포함
    // 즉, 발신자와 수신자 각각의 개인 채널로 실시간 알림/
    // -> 개개인의 알림 및 실시간 렌더링용

    // 수신자(상대방) 회원 코드 조회
    Long receiverCode = chatService.findReceiverCodeByRoomId(roomId, senderCode);

    // 메시지를 직접 전송한 "내"가 받는 알림
    messagingTemplate.convertAndSend("/sub/chat/users/" + senderCode + "/rooms", chatMessageView);

    // 채팅을 받는 상대방이 존재한다면
    if (receiverCode != null) {
      messagingTemplate.convertAndSend("/sub/chat/users/" + receiverCode + "/rooms",
          chatMessageView);
    }
  }
}
