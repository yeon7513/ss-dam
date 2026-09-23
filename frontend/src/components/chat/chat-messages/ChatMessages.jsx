import React from 'react';
import ChatBubble from "./chat-bubble/ChatBubble.jsx";
import TextInput from "../../forms/text-input/TextInput.jsx";
import styles from "./ChatMessages.module.scss";

function ChatMessages({ messages, onSend }) {

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
