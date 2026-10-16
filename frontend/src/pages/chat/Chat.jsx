import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { BsChatSquareDotsFill } from "react-icons/bs";

import ChatSideNav from "../../components/chat/side-nav/ChatSideNav.jsx";
import ChatContainer from "../../components/chat/ChatContainer.jsx";

import { useAuth } from "../../context/AuthContext.jsx";
import { useLoadData } from "../../hooks/useLoadData.js";
import { connectWebSocket, subscribeToUsers } from "../../utils/webSocketService.js";

import styles from "./Chat.module.scss";

/**
 * 채팅 페이지 컴포넌트
 */
function Chat() {
  /* URL 파라미터 조회 */
  const [searchParams] = useSearchParams();
  const roomId = searchParams.get("roomId");
  const navigate = useNavigate();

  /* 회원 정보 조회 */
  const { user } = useAuth();
  // 로그인 회원 식별 코드를 참조함.
  const userCode = user.code;

  /* 채팅방 목록 조회 */
  const { data } = useLoadData("/api/chat/rooms");
  const [chatRooms, setChatRooms] = useState([]);

  /* 채팅방 데이터 동기화 */
  useEffect(() => {
    if (data?.content) {
      setChatRooms(data?.content);
    }
  }, [data?.content]);

  /* 활성 채팅방 식별자 참조 */
  const activeRoomIdRef = useRef(roomId);

  useEffect(() => {
    activeRoomIdRef.current = roomId;
  }, [roomId]);

  /* 웹소켓 구독 설정 */
  useEffect(() => {
    if (!userCode) {
      console.log("userCode 없음.");
      return;
    }

    console.log("개인 구독 시도 -> useEffect 실행");
    let userSub = null;

    connectWebSocket(() => {
      console.log("개인 구독 시작 -> 웹소캣 연결");

      userSub = subscribeToUsers(userCode, (payload) => {
        const { roomId, message: newMessage } = payload;

        setChatRooms((prevRooms) => {
          const currentRooms = Array.isArray(prevRooms) ? prevRooms : [];

          const targetIndex = currentRooms.findIndex(
            (room) => room.roomId === roomId,
          );

          console.log("targetIndex: ", targetIndex);

          if (targetIndex === -1) {
            console.log("기존 목록 유지");
            return currentRooms;
          }
          const targetRoom = currentRooms[targetIndex];

          const isCurrentActiveRoom = activeRoomIdRef.current === roomId;
          const isFromOther = newMessage.senderCode !== userCode;

          const updatedUnreadCount = isCurrentActiveRoom
            ? 0
            : isFromOther
              ? (targetRoom.unreadCount || 0) + 1
              : targetRoom.unreadCount || 0;

          const updatedRoom = {
            ...targetRoom,
            lastMessage: newMessage.message,
            lastMessageTime: newMessage.createdAt,
            unreadCount: updatedUnreadCount,
          };

          console.log("updatedRoom: ", updatedRoom);

          const remainingRooms = currentRooms.filter(
            (room) => room.roomId !== roomId,
          );

          return [updatedRoom, ...remainingRooms];
        });
      });
    });

    return () => {
      if (userSub) {
        userSub.unsubscribe();
      }
    };
  }, [userCode]);

  /* 채팅방 선택 처리 */
  const handleClickChatRoom = (selectedRoomId) => {
    // 선택한 채팅방의 안 읽은 메시지 수를 초기화함.
    setChatRooms((prevRooms) =>
      prevRooms.map((room) =>
        room.roomId === selectedRoomId ? { ...room, unreadCount: 0 } : room,
      ),
    );

    // 선택한 채팅방 경로로 이동함.
    navigate(`/chat?roomId=${selectedRoomId}`);
  };

  return (
    <div className={styles.chat}>
      <ChatSideNav
        chatRooms={chatRooms}
        pager={data?.pager}
        activeRoomId={roomId}
        onClickChatRoom={handleClickChatRoom}
      />
      {roomId ? (
        <ChatContainer roomId={roomId} />
      ) : (
        <div className={styles.container}>
          {/* 말풍선 아이콘 영역 */}
          <BsChatSquareDotsFill className={styles.icon} />
          {/* 안내 문구 영역 */}
          <p>시작할 채팅을 선택해주세요.</p>
        </div>
      )}
    </div>
  );
}

export default Chat;
