import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import { HOST } from "../lib/url.js";

let stompClient = null;

export const connectWebSocket = (onConnectCallback, onErrorCallback) => {
  if (stompClient && stompClient.connected) {
    if (onConnectCallback) {
      onConnectCallback(stompClient);
    }
    return;
  }

  // SockJS를 사용한 웹소켓 클라이언트 생성
  stompClient = new Client({
    webSocketFactory: () => new SockJS(`${HOST}/ws`),
    reconnectDelay: 5000,
    debug: (str) => console.log("STOMP: ", str),
    onConnect: () => {
      console.log("웹소켓 연결 성공");
      if (onConnectCallback) {
        onConnectCallback(stompClient);
      }
    },
    onStompError: (frame) => {
      console.error("STOMP Error: ", frame);
      if (onErrorCallback) {
        onErrorCallback(frame);
      }
    },
  });

  stompClient.activate();
};

// 특정 채팅방 구독
export const subscribeToChatRoom = (roomId, onMessageCallback) => {
  if (!stompClient || !stompClient.connected) {
    return null;
  }

  return stompClient.subscribe(`/sub/chat/room/${roomId}`, (message) => {
    const data = JSON.parse(message.body);
    onMessageCallback(data);
  });
};

// 메시지 전송
export const sendMessage = (destination, payload) => {
  if (stompClient && stompClient.connected) {
    stompClient.publish({
      destination,
      body: JSON.stringify(payload),
    });
  }
};

// 웹소켓 연결 종료
export const disconnectWebSocket = () => {
  if (stompClient && stompClient.connected) {
    stompClient.disconnect();
    console.log("웹소켓 연결 종료");
  }
};
