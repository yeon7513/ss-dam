import React, { useRef, useState } from 'react';
import ChatMessages from "./chat-messages/ChatMessages.jsx";

function ChatRoom({ responderCode, type, targetCode }) {
  const [roomId, setRoomId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState('');

  const stompClientRef = useRef(null);


  const handleSendMessage = () => {
    if (stompClient && stompClient.connected && inputValue.trim()) {
      // 백엔드 ChatMessageCreate DTO 스펙에 맞춰 전송
      stompClient.publish({
        destination: '/pub/send',
        body: JSON.stringify({
          roomId: roomId, // 외부 노출용 UUID
          senderCode: senderCode, // 메시지를 전송한 사람의 PK
          message: messageText, // 메시지 본문
        }),
      });

      setMessageText('');
    }
  };

  return (
    <div>
      <ChatMessages messages={messages} onSend={handleSendMessage} />
    </div>
  );
}

export default ChatRoom;
