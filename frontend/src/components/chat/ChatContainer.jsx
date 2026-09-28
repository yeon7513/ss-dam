import React, { useEffect, useRef, useState } from 'react';
import ChatMessages from "./chat-messages/ChatMessages.jsx";
import styles from "./ChatContainer.module.scss";
import { useLoadData } from "../../hooks/useLoadData.js";
import { connectWebSocket, disconnectWebSocket, sendMessage, subscribeToChatRoom } from "../../utils/webSocketService.js";

function ChatContainer({ roomId }) {
  const [messages, setMessages] = useState([]);
  const [roomInfo, setRoomInfo] = useState(null);
  const [productInfo, setProductInfo] = useState(null);

  const subscriptionRef = useRef(null);

  // 기존 과거 메시지 로그 받아오기
  const { data: chatData, loading, error } = useLoadData(roomId ? `/api/chat/rooms/${roomId}/messages` : null);

  useEffect(() => {
    if (chatData) {
      // 메시지 목록 배열 채우기
      if (Array.isArray(chatData.messages)) {
        setMessages(chatData.messages);
      }
      // 채팅방 상단 정보(상대방 프로필, 상품 thumbnail/title 등) 채우기
      if (chatData.info) {
        setRoomInfo(chatData.info);
      }

      // 거래 게시글이 있을 경우
      if (chatData.productInfo) {
        setProductInfo(chatData.productInfo);
      }
    }
  }, [chatData]);

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
      <div className={styles.header}>
        {roomInfo && (
          <div>
            <img src={roomInfo.profileImage} alt="" width={50} height={50} />
            <span>{roomInfo.id}</span>
          </div>
        )}
        {productInfo && (
          <div>
            <img src={productInfo.thumbnail} alt="" width={50} height={50} />
            <span>{productInfo.title}</span>
            <span>{productInfo.price.toLocaleString()}</span>
          </div>
        )}
      </div>
      <ChatMessages messages={messages} onSend={handleSendMessage} />
    </div>
  );
}

export default ChatContainer;
