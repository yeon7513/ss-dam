import React from 'react';
import ChatBubble from "./chat-bubble/ChatBubble.jsx";
import TextInput from "../../forms/text-input/TextInput.jsx";

function ChatMessages({ messages, onSend }) {

  const handleSendChat = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();

      const newMessage = e.target.value;

      console.log("newMessage: ", newMessage);

      if (newMessage.trim() !== '') {
        onSend(newMessage);
        // 입력창 초기화
        e.target.value = '';
      }
    }
  }

  return (
    <div>
      {messages?.map((msg, idx) => (
        <ChatBubble key={idx} message={msg} />
      ))}
      <div>
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
