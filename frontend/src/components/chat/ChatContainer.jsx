import React, { useEffect, useRef, useState } from 'react';
import ChatMessages from "./chat-messages/ChatMessages.jsx";
import styles from "./ChatContainer.module.scss";
import { useLoadData } from "../../hooks/useLoadData.js";
import { connectWebSocket, sendMessage, subscribeToChatRoom } from "../../utils/webSocketService.js";

function ChatContainer({ roomId }) {
  const [messages, setMessages] = useState([]);
  const subscriptionRef = useRef(null);

  // 기존 과거 메시지 로그 받아오기
  const { data: chatLog, loading, error } = useLoadData(roomId ? `/api/chat/rooms/${roomId}/messages` : null);

  useEffect(() => {
    if (chatLog && Array.isArray(chatLog)) {
      setMessages(chatLog);
    }
  }, [chatLog]);

  // 방이 변경될 때마다 대화 내역 블러오기 및 웹소켓 구독
  useEffect(() => {
    if (!roomId) {
      return;
    }

// 웹소켓 연결 및 해당 채팅방 구독 시작
    connectWebSocket(() => {
      // 이전 채팅방 구독 시 해제
      if (subscriptionRef.current) {
        subscriptionRef.current.unsubscribe();
      }

      // 새로 선택된 채팅방 구독 시작
      subscriptionRef.current = subscribeToChatRoom(roomId, (newMessage) => {
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      });
    });

    return () => {
      if (subscriptionRef.current) {
        subscriptionRef.current.unsubscribe();
      }
    };
  }, [roomId]);

  // 메시지 전송 핸들러
  const handleSendMessage = (inputText) => {
    if (!inputText.trim()) return;

    const payload = {
      roomId: roomId,
      message: inputText,
    };

    // STOMP 엔드포인트로 전송
    sendMessage("/pub/send", payload);
  };

  if (loading && messages.length === 0) {
    return <div>대화 내역 불러오는 중...</div>;
  }

  if (error) {
    console.error("Error fetching chat log:", error);
    return <div>대화 내용을 불러오는 데 실패했습니다.</div>
  }

  return (
    <div className={styles.container}>
      <ChatMessages messages={messages} onSend={handleSendMessage} />
    </div>
  );
}

export default ChatContainer;
