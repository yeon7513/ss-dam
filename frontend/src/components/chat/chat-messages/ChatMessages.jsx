import React, { useEffect, useRef } from "react";
import ChatBubble from "./chat-bubble/ChatBubble.jsx";
import TextInput from "../../forms/text-input/TextInput.jsx";
import styles from "./ChatMessages.module.scss";
import cn from "classnames";
import { IoShieldCheckmark } from "react-icons/io5";

function ChatMessages({ messages, onSend }) {
  // 스크롤 ref
  // -> 새로운 메시지 또는 최초 진입 시 스크롤을 최하단으로 이동
  const messagesRef = useRef(null);

  // 이전 메시지 목록의 "첫 번째 메시지 code"를 기록할 ref (방 변경 감지용)
  const prevFirstMsgCodeRef = useRef(null);

  const scrollToBottom = (behavior = "smooth") => {
    messagesRef.current?.scrollIntoView({
      behavior,
      block: "end",
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
    });
  }, [messages]);

  const handleSendChat = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();

      const newMessage = e.target.value;

      if (newMessage.trim() !== "") {
        onSend(newMessage);
        // 입력창 초기화
        e.target.value = "";
      }
    }
  };

  return (
    <div className={styles.content}>
      {messages.length === 0 ? (
        <div className={cn(styles.messageItems, styles.noMessage)}>
          <IoShieldCheckmark className={styles.icon} />
          <div className={styles.notice}>
            <strong className={styles.noticeTitle}>
              안전한 채팅을 위한 안내
            </strong>
            <p className={styles.noticeMessage}>
              서로 존중하는 말투로 대화해 주세요.
            </p>
            <p className={styles.noticeWarning}>
              욕설, 비방, 사기 등 부적절한 행위는 서비스 이용에 제한을 받을 수 있습니다.
            </p>
          </div>
        </div>
      ) : (
        <div className={styles.messageItems}>
          {messages?.map((msg, idx) => (
            <ChatBubble key={idx} message={msg} />
          ))}
          {/* 스크롤용 더미 div */}
          <div ref={messagesRef} />
        </div>
      )}
      <div className={styles.textInput}>
        <TextInput type="text" name="message" onKeyDown={handleSendChat} />
      </div>
    </div>
  );
}

export default ChatMessages;
