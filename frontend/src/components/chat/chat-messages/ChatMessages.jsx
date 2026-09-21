import React from 'react';
import ChatBubble from "./chat-bubble/ChatBubble.jsx";
import TextInput from "../../forms/text-input/TextInput.jsx";

function ChatMessages({ messages, onSend }) {
  return (
    <div>
      {messages?.map((msg, idx) => (
        <ChatBubble key={idx} message={msg} />
      ))}
      <div>
        <TextInput
          onChange={e => onSend(e.target.value)}
        />
      </div>
    </div>
  );
}

export default ChatMessages;
