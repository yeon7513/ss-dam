package com.ss_dam.common.chat.controller;

import com.ss_dam.common.chat.model.request.ChatMessageCreate;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.stereotype.Controller;

// STOMP 컨트롤러
// 각각의 메시지를 DB에 저장하고,
// 해당 채팅방에 메시지를 뿌리는 역할을 수행하는 컨트롤러
@Controller
public class ChatMessageController {


  // @MessageMapping
  // 클라이언트가 특정 엔드포인트로 전송한 메시지를
  // 서버의 해당 메소드가 처리하도록 매핑을 진행하주는 어노테이션

  // @SendTo
  // @MessageMapping으로 처리한 후 메소드의 반환값을
  // 특정 목적지로 보내도록 지정하는 어노테이션
  // 지금은 사용하지 않음. 이 어노테이션을 사용하면
  // 한 곳으로만 흘러가기 때문에 각자 다른 roomCode로 보내줘야함!

  @MessageMapping("/send")
  public String sendMessage(Long roomCode, ChatMessageCreate chatMessageCreate) {
    // roomCode: 어떤 채팅방인지
    // inputMessage: 들어온 메시지 (텍스트)

    // 세션에서 현재 로그인한 사용자의 정보를 가져와
    // 누가 메시지를 전송했는지 DB에 저장

    //    chatService.registerChatMessage(roomCode, inputMessage);

    // 실제 출력은 입력된 메시지를 반환
    return chatMessageCreate.getMessage();
  }
}
