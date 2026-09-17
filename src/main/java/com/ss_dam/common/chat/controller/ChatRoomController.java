package com.ss_dam.common.chat.controller;

import com.ss_dam.common.ApiResponse;
import com.ss_dam.common.chat.model.request.ChatRoomRequest;
import com.ss_dam.common.chat.service.ChatService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

// 채팅방을 생성하거나 조회하는 컨트롤러
// 여기서는 메시지 전송이 실제로 일어나지 않는다..
// 즉, 프론트엔드에서 "대화하기" 버튼을 눌렀을 때 호출되는 컨트롤러이다.
@RestController
@RequestMapping("/api/chat")
public class ChatRoomController {

  @Autowired
  private ChatService chatService;

  // 기존 채팅방이 있는지 확인 후 roomCode를 반환받아야 함.
  // 있으면? -> SELECT, 없으면? -> INSERT
  @PostMapping("/room")
  public ResponseEntity<ApiResponse<String>> loadOrCreateChatRoom(ChatRoomRequest chatRoomRequest,
      HttpServletRequest httpServletRequest) {

    HttpSession session = httpServletRequest.getSession(false);

    // [HttpServletRequest으로 세션을 꺼내오는 이유]
    // -> HttpSession을 선언하면, 스프링은 세션이 존재하지 않는
    // 비로그인 사용자에게도 새로운 세션을 즉시 생성해 버린다.
    // HttpServletRequest을 사용하면 false 옵션을 줘서
    // "이미 로그인해서 존재하는 세션만 가져오고 없으면 null을 반환하라"고
    // 제어할 수 있음!!

    // [요약]
    // HttpSession
    // - 세션이 없으면 서버 메모리에 새로운 세션 객체를 만듦.
    // HttpServletRequest
    // - request.getSession(false)를 통해 세션이 없을 때
    //   null을 반환받아 비로그인 상태를 깔끔하게 분기

    // 즉, HttpServletRequest(부모), HttpSession(자식)

    // 현재 로그인한 회원의 Pk 추출
    Long memberCode = (Long) session.getAttribute("loginUser");
    // 요청 데이터에 본인(Requester)의 PK를 설정
    chatRoomRequest.setRequesterCode(memberCode);

    String roomId = chatService.loadOrCreateChatRoom(chatRoomRequest);

    return ResponseEntity.ok(ApiResponse.success("채팅방 생성 및 조회 성공", roomId));
  }
}
