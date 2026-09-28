import React, { useEffect, useRef, useState } from 'react';
import ChatSideNav from "../../components/chat/side-nav/ChatSideNav.jsx";
import ChatContainer from "../../components/chat/ChatContainer.jsx";
import styles from "./Chat.module.scss";
import { useLoadData } from "../../hooks/useLoadData.js";
import { useNavigate, useSearchParams } from "react-router-dom";
import { connectWebSocket, subscribeToUsers } from "../../utils/webSocketService.js";
import { BsChatSquareDotsFill } from "react-icons/bs";

// 채팅방 최초 랜딩 페이지
function Chat() {
  const [searchParams] = useSearchParams();
  const roomId = searchParams.get("roomId");
  const navigate = useNavigate();

  // 현재 로그인한 회원의 PK를 세션에서 꺼내오기 (개인 구독에 사용하기 위해)
  const userCode = Number(sessionStorage.getItem("userCode"));

  // 기존 채팅방 불러옴 -> 즉 DB에 저장된 채팅방
  const { data } = useLoadData("/api/chat/rooms");
  const [chatRooms, setChatRooms] = useState([]);

  console.log(data);

  // 초기값 할당
  useEffect(() => {
    if (data?.content) {
      setChatRooms(data?.content);
    }
  }, [data?.content]);

  const activeRoomIdRef = useRef(roomId);

  useEffect(() => {
    activeRoomIdRef.current = roomId;
  }, [roomId])

  // 개인 웹소켓 구독 -> 실시간 목록&알림 업데이트
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

          // 새로 생성된 채팅방이라 목록에 없을 경우
          // 기존 목록 유지
          if (targetIndex === -1) {
            console.log("기존 목록 유지");
            return currentRooms;
          }
          const targetRoom = currentRooms[targetIndex];

          // 현재 활성화된 방인지 체크
          const isCurrentActiveRoom = activeRoomIdRef.current === roomId;
          const isFromOther = newMessage.senderCode !== userCode;

          // 현재 활성화된 방이면 0, 아니면 안 읽은 메시지 수 +1
          const updatedUnreadCount = isCurrentActiveRoom
            ? 0
            : isFromOther
              ? (targetRoom.unreadCount || 0) + 1
              : targetRoom.unreadCount || 0;

          // 수신된 최신 메시지 정보로 해당 방 갱신
          const updatedRoom = {
            ...targetRoom,
            lastMessage: newMessage.message,
            lastTime: newMessage.createdAt,
            unreadCount: updatedUnreadCount,
          };

          console.log("updatedRoom: ", updatedRoom);

          // 메시지가 온 채팅방을 상단으로 끌어올림
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
        <div className={styles.container}>
          <BsChatSquareDotsFill className={styles.icon} />
          <p>시작할 채팅을 선택해주세요.</p>
        </div>
      )}
    </div>
  );
}

export default Chat;
