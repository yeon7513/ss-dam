package com.ss_dam.common.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;
import org.springframework.web.socket.server.support.HttpSessionHandshakeInterceptor;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

  // WebSocket 연결을 위한 엔드포인트를 등록하는 메소드
  @Override
  public void registerStompEndpoints(StompEndpointRegistry registry) {
    registry.addEndpoint("/ws") // 엔드포인트를 등록 -> 채팅방 접속 및 최초 연결 시 사용
        // 즉, http://서버주소/ws로 웹소켓 연결을 요청함
        .setAllowedOrigins("http://localhost:5173") // React Vite 기본 포트 설정 (CORS 설정)
        .addInterceptors(new HttpSessionHandshakeInterceptor())
        // HttpSession에 접근하기 위해 WebSocket이 기본으로 제공하는 인터셉터 추가
        .withSockJS(); // WebSocket을 지원하지 않는 브라우저를 위한 폴백 옵션
  }

  // 메시지를 주고받는 걸 도와줄 메시지 브로커
  @Override
  public void configureMessageBroker(MessageBrokerRegistry registry) {
    // prefix로 "/sub"가 붙으면 구독
    // -> 내장 브로커가 처리 (메시지 수신/구독용)
    // 즉, 서버가 해당 경로를 구독(Subscribe) 중인 클라이언트들에게 메시지를 뿌려줄 때 사용
    registry.enableSimpleBroker("/sub");

    // prefix로 "/pub"가 붙으면 메시지 송신
    // -> 컨트롤러(@MessageMapping)로 라우팅 (메시지 전송/발행용)
    // 즉, 클라이언트가 서버로 메시지를 보낼 때 사용 (Publish)
    registry.setApplicationDestinationPrefixes("/pub");
  }
}
