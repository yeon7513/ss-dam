import React, { useEffect, useState } from 'react';
import ChatSideNav from "../../components/chat/side-nav/ChatSideNav.jsx";
import ChatContainer from "../../components/chat/ChatContainer.jsx";
import styles from "./Chat.module.scss";
import { useLoadData } from "../../hooks/useLoadData.js";
import { useNavigate, useSearchParams } from "react-router-dom";
import { connectWebSocket, subscribeToUsers } from "../../utils/webSocketService.js";

// 채팅방 최초 랜딩 페이지
function Chat() {
  const [searchParams] = useSearchParams();
  const roomId = searchParams.get("roomId");
  const navigate = useNavigate();

  // 현재 로그인한 회원의 PK를 세션에서 꺼내오기 (개인 구독에 사용하기 위해)
  const userCode = Number(sessionStorage.getItem("userCode"));

  // 기존 채팅방 불러옴
  const { data } = useLoadData("/api/chat/rooms");
  const [chatRooms, setChatRooms] = useState([]);

  // 초기값 할당
  useEffect(() => {
    if (data) {
      setChatRooms(data?.content);
    }
  }, [data]);

  // 개인 웹소켓 구독 -> 실시간 목록&알림 업데이트
  useEffect(() => {
    if (!userCode) return;

    let userSub = null;

    connectWebSocket(() => {
      userSub = subscribeToUsers(userCode, (newMessage) => {
        setChatRooms((prevRooms) => {
          const currentRooms = Array.isArray(prevRooms) ? prevRooms : [];

          const targetIndex = currentRooms.findIndex(
            (room) => room.roomId === newMessage.roomId,
          );

          if (targetIndex === -1) return currentRooms;

          const targetRoom = currentRooms[targetIndex];
          const isCurrentActiveRoom = roomId === newMessage.roomId;
          const isFromOther = newMessage.senderCode !== userCode;

          // 현재 활성화된 방이면 0, 아니면 안 읽은 메시지 수 +1
          const updatedUnreadCount = isCurrentActiveRoom
            ? 0
            : isFromOther
              ? (targetRoom.unreadCount || 0) + 1
              : targetRoom.unreadCount || 0;

          const updatedRoom = {
            ...targetRoom,
            lastMessage: newMessage.message,
            lastTime: newMessage.createdAt,
            unreadCount: updatedUnreadCount,
          };

          const remainingRooms = currentRooms.filter(
            (room) => room.roomId !== newMessage.roomId,
          );

          // 최신 메시지가 도착한 방을 맨 위로 올림
          return [updatedRoom, ...remainingRooms];
        });
      });
    });

    return () => {
      if (userSub) {
        userSub.unsubscribe();
      }
    };
  }, [userCode, roomId]);

  // 채팅방 클릭 이벤트 핸들러
  const handleClickChatRoom = (selectedRoomId) => {
    // 클릭한 방의 안 읽은 메시지 수(unreadCount) 0으로 초기화
    setChatRooms((prevRooms) =>
      prevRooms.map((room) =>
        room.roomId === selectedRoomId ? { ...room, unreadCount: 0 } : room,
      ),
    );

    // 활성화된 방 전환
    navigate(`/chat?roomId=${selectedRoomId}`);
  };


  return (
    <div className={styles.chat}>
      <ChatSideNav
        chatRooms={chatRooms}
        pager={data?.pager}
        activeRoomId={roomId}
        onClickChatRoom={handleClickChatRoom} />
      {roomId ? (
        <ChatContainer roomId={roomId} />
      ) : (
        <div>채팅방을 선택해주세요.</div>
      )}
    </div>
  );
}

export default Chat;
