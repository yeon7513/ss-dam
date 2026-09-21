package com.ss_dam.common.chat.controller;

import com.ss_dam.auth.login.Login;
import com.ss_dam.common.ApiResponse;
import com.ss_dam.common.chat.model.filter.ChatRoomSearchFilter;
import com.ss_dam.common.chat.model.request.ChatRoomRequest;
import com.ss_dam.common.chat.model.response.ChatDetailView;
import com.ss_dam.common.chat.model.response.ChatRoomView;
import com.ss_dam.common.chat.service.ChatService;
import com.ss_dam.common.pager.PageResult;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

// 채팅방을 생성하거나 조회하는 컨트롤러
// 여기서는 메시지 전송이 실제로 일어나지 않는다..
// 즉, 프론트엔드에서 "대화하기" 버튼을 눌렀을 때 호출되는 컨트롤러이다.
@RestController
@RequestMapping("/api/chat/rooms")
public class ChatRoomController {

  @Autowired
  private ChatService chatService;

  // 기존 채팅방이 있는지 확인 후 roomCode를 반환받아야 함.
  // 있으면? -> SELECT, 없으면? -> INSERT
  @PostMapping
  public ResponseEntity<ApiResponse<String>> loadOrCreateChatRoom(
      @RequestBody ChatRoomRequest chatRoomRequest, HttpServletRequest httpServletRequest) {

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
    // 현재 로그인한 회원의 코드를 받아와 구독중인 채팅방 추출
    Login loginUser = (Login) session.getAttribute("loginUser");

    if (loginUser == null) {
      return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
          .body(ApiResponse.fail("로그인이 필요한 서비스 입니다."));
    }

    Long memberCode = loginUser.getCode();
    // 요청 데이터에 본인(Requester)의 PK를 설정
    chatRoomRequest.setRequesterCode(memberCode);

    String roomId = chatService.loadOrCreateChatRoom(chatRoomRequest);

    return ResponseEntity.ok(ApiResponse.success("채팅방 생성 및 조회 성공", roomId));
  }

  // 참여하고 있는 채팅방 목록 조회
  @GetMapping
  public ResponseEntity<ApiResponse<PageResult<ChatRoomView>>> loadChatRoomsByMemberCode(
      HttpServletRequest httpServletRequest, ChatRoomSearchFilter filter) {

    HttpSession session = httpServletRequest.getSession(false);

    // 현재 로그인한 회원의 코드를 받아와 구독중인 채팅방 추출
    Login loginUser = (Login) session.getAttribute("loginUser");
    Long memberCode = (loginUser != null) ? loginUser.getCode() : null;

    PageResult<ChatRoomView> chatRooms = chatService.loadChatRoomsByMemberCode(memberCode, filter);

    return ResponseEntity.ok(ApiResponse.success("참여중인 채팅방 목록 조회 성공", chatRooms));
  }

  // 특정 채팅방의 메시지 내역 조회
  @GetMapping("/{roomId}/messages")
  public ResponseEntity<ApiResponse<ChatDetailView>> loadChatMessages(@PathVariable String roomId,
      HttpServletRequest httpServletRequest) {

    HttpSession session = httpServletRequest.getSession(false);

    // 현재 로그인한 회원의 코드를 받아와 메시지 내역 추출
    Login loginUser = (Login) session.getAttribute("loginUser");
    Long memberCode = (loginUser != null) ? loginUser.getCode() : null;

    ChatDetailView chatDetailView = chatService.loadChatMessages(roomId, memberCode);

    return ResponseEntity.ok(ApiResponse.success("채팅 내역 조회 성공", chatDetailView));
  }
}
