import React from 'react';
import styles from "./ChatBubble.module.scss";
import cn from "classnames";

function ChatBubble({ message }) {

  const isMine = message.senderCode === Number(sessionStorage.getItem('userCode'));

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
