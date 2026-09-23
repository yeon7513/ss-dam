import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import { HOST } from "../lib/url.js";

let stompClient = null;
let isConnected = false;
const connectCallbacks = []; // 연결 완료 시 실행할 콜백 큐

export const connectWebSocket = (onConnectCallback, onErrorCallback) => {
  if (onConnectCallback) {
    connectCallbacks.push(onConnectCallback);
  }

  // 이미 연결되어 있는 경우 -> 콜백 즉시 실행
  if (stompClient && stompClient.connected) {
    flushCallbacks();
    return;
  }

  // 이미 연결 진행 중인 경우 -> 큐에 등록되어 있으므로 대기
  if (stompClient && stompClient.active) {
    return;
  }

  // SockJS를 사용한 웹소켓 클라이언트 생성
  stompClient = new Client({
    webSocketFactory: () => new SockJS(`${HOST}/ws`),
    debug: (str) => console.log("[STOMP DEBUG]: ", str),
    reconnectDelay: 5000,
    heartbeatIncoming: 4000,
    heartbeatOutgoing: 4000,
    onConnect: (frame) => {
      console.log("STOMP Connected: ", frame);
      isConnected = true;
      flushCallbacks(); // 대기 중인 모든 구독 콜백 일괄 실행
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

// 등록된 모든 콜백 실행
const flushCallbacks = () => {
  while (connectCallbacks.length > 0) {
    const callback = connectCallbacks.shift();
    if (typeof callback === "function") {
      callback();
    }
  }
};

// 특정 채팅방 구독
export const subscribeToChatRoom = (roomId, onMessageCallback) => {
  if (!stompClient || !stompClient.connected) {
    return null;
  }

  return stompClient.subscribe(`/sub/chat/room/${roomId}`, (message) => {
    const parseData = typeof message.body === "string"
      ? JSON.parse(message.body) : message;

    onMessageCallback(parseData);
  });
};

// 개인용 목록 & 알림 채널 구독
export const subscribeToUsers = (memberCode, onUpdateCallback) => {
  if (!stompClient || !stompClient.connected) {
    return null;
  }

  return stompClient.subscribe(`/sub/chat/users/${memberCode}/rooms`, (message) => {
      const parseData = typeof message.body === "string"
        ? JSON.parse(message.body) : message;

      onUpdateCallback(parseData);
    },
  )
}

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
