import React, { useEffect, useRef, useState } from "react";

import ChatMessages from "./chat-messages/ChatMessages.jsx";
import Button from "../common/button/Button.jsx";

import { useLoadData } from "../../hooks/useLoadData.js";
import { connectWebSocket, disconnectWebSocket, sendMessage, subscribeToChatRoom } from "../../utils/webSocketService.js";

import styles from "./ChatContainer.module.scss";
import ImageBox from "../common/image-box/ImageBox.jsx";
import { useNavigate } from "react-router-dom";

/**
 * 채팅 컨테이너 컴포넌트
 */
function ChatContainer({ roomId }) {
  /* 채팅 메시지 및 정보 상태 관리 */
  const [messages, setMessages] = useState([]);
  const [roomInfo, setRoomInfo] = useState(null);
  const [productInfo, setProductInfo] = useState(null);

  console.log(productInfo);

  const navigate = useNavigate();

  /* 웹소켓 구독 참조 설정 */
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
        setProductInfo(chatData.info.productInfo);
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
        // 수신된 새 메시지를 목록에 추가함.
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      });

      if (subscription) {
        // 웹소켓 구독 객체를 저장함.
        subscriptionRef.current = subscription;
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
    /* 채팅 컨테이너 영역 */
    <div className={styles.container}>
      {/* 상단 정보 헤더 영역 */}
      <div className={styles.header}>
        {/* 제품 대표 이미지 영역 */}
        <ImageBox
          className={styles.productImage}
          src={productInfo?.imagePaths[0] ?? null}
        />

        {/* 게시글 정보 영역 (클릭 시 상세 이동되면 좋을 듯) */}
        <div className={styles.productWrap}>
          {/* 게시글 제목 영역 */}
          <span className={styles.productTitle}>
            {productInfo?.title}
          </span>

          {/* 사용자 아이디 영역 (우측 배치) */}
          <div className={styles.userWrap}>
            <span className={styles.userId}>
              {productInfo?.memberProfile.id}
            </span>
          </div>
        </div>

        {/* 제품 가격 영역 */}
        <span className={styles.productPrice}>
          {productInfo?.price.toLocaleString()}
          <span className={styles.point}> 그루</span>
        </span>

        {/* 송금 버튼 영역 */}
        <Button
          btnStyle="fill"
          size="lg"
          className={styles.remitButton}
          onClick={() => navigate("/mypage/point/transfer", {
            state: {
              receiverCode: productInfo?.memberProfile.code,
              receiverId: productInfo?.memberProfile.id,
              targetProductCode: productInfo?.code,
              amount: productInfo?.price,
            },
          })}
        >
          송금하기
        </Button>
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
