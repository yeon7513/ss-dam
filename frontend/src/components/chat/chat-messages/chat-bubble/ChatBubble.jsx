import React from 'react';
import styles from "./ChatBubble.module.scss";
import cn from "classnames";
import { useAuth } from "../../../../context/AuthContext.jsx";

function ChatBubble({ message }) {
  const { user } = useAuth();

  const isMine = message.senderCode === user.code;

  return (
    <div className={styles.wrap}>
      <div className={cn(styles.bubble, isMine ? styles.mine : styles.other)}>
        <div className={styles.text}>
          {message.message}
        </div>
        <span className={styles.date}>{message.createdAt}</span>
      </div>
    </div>
  );
}

export default ChatBubble;
