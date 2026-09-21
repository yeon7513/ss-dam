import React from 'react';
import ChatSideNav from "../../components/chat/side-nav/ChatSideNav.jsx";
import ChatContainer from "../../components/chat/ChatContainer.jsx";
import styles from "./Chat.module.scss";
import { useLoadData } from "../../hooks/useLoadData.js";
import { useSearchParams } from "react-router-dom";

// 채팅방 최초 랜딩 페이지
function Chat() {
  const [searchParams] = useSearchParams();
  const roomId = searchParams.get("roomId");

  const { data: chatRooms } = useLoadData("/api/chat/rooms");


  return (
    <div className={styles.chat}>
      <ChatSideNav chatRooms={chatRooms} />
      {roomId ? (
        <ChatContainer roomId={roomId} />
      ) : (
        <div>채팅방을 선택해주세요.</div>
      )}
    </div>
  );
}

export default Chat;
