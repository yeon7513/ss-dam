import React, { useEffect, useRef, useState } from "react";

import ChatMessages from "./chat-messages/ChatMessages.jsx";

import { useLoadData } from "../../hooks/useLoadData.js";
import {
  connectWebSocket,
  disconnectWebSocket,
  sendMessage,
  subscribeToChatRoom,
} from "../../utils/webSocketService.js";

import styles from "./ChatContainer.module.scss";

/**
 * 채팅 컨테이너 컴포넌트
 */
function ChatContainer({ roomId }) {
  /* 채팅 메시지 및 정보 상태 */
  const [messages, setMessages] = useState([]);
  const [roomInfo, setRoomInfo] = useState(null);
  const [productInfo, setProductInfo] = useState(null);

  /* 채팅 구독 참조 */
  const subscriptionRef = useRef(null);

  /* 채팅방 메시지 목록 조회 */
  const {
    data: chatData,
    loading,
    error,
  } = useLoadData(roomId ? `/api/chat/rooms/${roomId}/messages` : null);

  /* 채팅방 메시지 데이터 동기화 */
  useEffect(() => {
    if (chatData) {
      if (Array.isArray(chatData.messages)) {
        setMessages(chatData.messages);
      }
      if (chatData.info) {
        setRoomInfo(chatData.info);
      }
      if (chatData.productInfo) {
        setProductInfo(chatData.productInfo);
      }
    }
  }, [chatData]);

  /* 웹소켓 구독 및 메시지 수신 설정 */
  useEffect(() => {
    if (!roomId) {
      return;
    }

    connectWebSocket(() => {
      if (subscriptionRef.current) {
        subscriptionRef.current.unsubscribe();
      }

      const subscription = subscribeToChatRoom(roomId, (newMessage) => {
        console.log("수신된 새 메시지: ", newMessage);
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      });

      if (subscription) {
        console.log("subscription 객체 생성");
        subscriptionRef.current = subscription;
      } else {
        console.warn("stompClient가 연결되지 않았습니다.");
      }
    });

    return () => {
      if (subscriptionRef.current) {
        subscriptionRef.current.unsubscribe();
        disconnectWebSocket();
      }
    };
  }, [roomId]);

  /* 메시지 전송 처리 */
  const handleSendMessage = (inputText) => {
    if (!inputText.trim()) return;

    const payload = {
      roomId: roomId,
      message: inputText,
    };

    sendMessage("/pub/send", payload);
  };

  /* 대화 내역 로딩 화면 */
  if (loading && messages.length === 0) {
    return <div>대화 내역 불러오는 중...</div>;
  }

  /* 대화 내역 오류 화면 */
  if (error) {
    console.error("Error fetching chat log:", error);
    return <div>대화 내용을 불러오는 데 실패했습니다.</div>;
  }

  return (
    <div className={styles.container}>
      {/* 상단 정보 헤더 영역 */}
      <div className={styles.header}>
        {/* 사용자 정보 영역 */}
        {roomInfo && (
          <div>
            <img src={roomInfo.profileImage} alt="" width={50} height={50} />
            <span>{roomInfo.id}</span>
          </div>
        )}

        {/* 상품 정보 영역 */}
        {productInfo && (
          <div>
            <img src={productInfo.thumbnail} alt="" width={50} height={50} />
            <span>{productInfo.title}</span>
            <span>{productInfo.price.toLocaleString()}</span>
          </div>
        )}
      </div>

      {/* 대화 메시지 영역 */}
      <ChatMessages
        key={roomId}
        messages={messages}
        onSend={handleSendMessage}
      />
    </div>
  );
}

export default ChatContainer;
