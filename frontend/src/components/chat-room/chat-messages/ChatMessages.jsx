import React from 'react';
import ChatBubble from "../chat-bubble/ChatBubble.jsx";

function ChatMessages({ messages, onSend }) {
  return (
    <div>
      {messages?.map((msg, idx) => (
        <ChatBubble key={idx} message={msg} />
      ))}
      <div>
        <input
          type="text"
          onChange={e => onSend(e.target.value)}
        />
      </div>
    </div>
  );
}

export default ChatMessages;
