import React, { useEffect, useRef } from 'react';
import ChatBubble from "./chat-bubble/ChatBubble.jsx";
import TextInput from "../../forms/text-input/TextInput.jsx";
import styles from "./ChatMessages.module.scss";

function ChatMessages({ messages, onSend }) {
  // 스크롤 ref
  // -> 새로운 메시지 또는 최초 진입 시 스크롤을 최하단으로 이동
  const messagesRef = useRef(null);

  // 이전 메시지 목록의 "첫 번째 메시지 code"를 기록할 ref (방 변경 감지용)
  const prevFirstMsgCodeRef = useRef(null);

  const scrollToBottom = (behavior = "smooth") => {
    messagesRef.current?.scrollIntoView({
      behavior,
      block: 'end',
    });
  };

  // 메시지 목록(messages)이 변경될 때마다 하단으로 이동
  useEffect(() => {
    // 메시지가 없으면 스크롤 실행 X
    if (!messages || messages.length === 0) {
      prevFirstMsgCodeRef.current = null;

    }

    const currentMessageCode = messages[0]?.code;
    const isRoomChanged = prevFirstMsgCodeRef.current !== currentMessageCode;

    requestAnimationFrame(() => {
      if (isRoomChanged) {
        // 방이 바뀌거나 최초 진입 시 스크롤 즉시 이동
        scrollToBottom("auto");
        prevFirstMsgCodeRef.current = currentMessageCode;
      } else {
        // 새로운 메시지가 추가될 경우 smooth 스크롤링
        scrollToBottom("smooth");
      }
    })
  }, [messages]);

  const handleSendChat = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();

      const newMessage = e.target.value;

      if (newMessage.trim() !== '') {
        onSend(newMessage);
        // 입력창 초기화
        e.target.value = '';
      }
    }
  }

  return (
    <div className={styles.content}>
      <div className={styles.messageItems}>
        {messages?.map((msg, idx) => (
          <ChatBubble key={idx} message={msg} />
        ))}
        {/* 스크롤용 더미 div */}
        <div ref={messagesRef} />
      </div>
      <div className={styles.textInput}>
        <TextInput
          type="text"
          name="message"
          onKeyDown={handleSendChat}
        />
      </div>
    </div>
  );
}

export default ChatMessages;
