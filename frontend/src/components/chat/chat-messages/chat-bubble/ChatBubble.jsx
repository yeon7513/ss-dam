import React from "react";
import cn from "classnames";

import { useAuth } from "../../../../context/AuthContext.jsx";

import styles from "./ChatBubble.module.scss";

/**
 * 말풍선 컴포넌트
 */
function ChatBubble({ message }) {
  /* 회원 정보 조회 */
  const { user } = useAuth();

  // 본인 송신 여부를 판별함.
  const isMine = message.senderCode === user.code;

  return (
    /* 말풍선 감싸기 영역 */
    <div className={styles.wrap}>
      {/* 말풍선 항목 영역 */}
      <div className={cn(styles.bubble, isMine ? styles.mine : styles.other)}>
        {/* 말풍선 내용 영역 */}
        <div className={styles.text}>{message.message}</div>
        {/* 작성 시각 영역 */}
        <span className={styles.date}>{message.createdAt}</span>
      </div>
    </div>
  );
}

export default ChatBubble;
