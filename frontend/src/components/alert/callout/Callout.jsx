import React from 'react';
import styles from "./Callout.module.scss";
import cn from 'classnames';

// 폼 입력 실패 시 띄울 오류 메시지 컴포넌트
// -> 인라인 또는 영역 내부 경고 메시지 용도
function Callout({ type = "error", children, className }) {
  // type: error, warning, success, info

  return (
    <div className={cn(styles.callout, styles[type], className)}>
      <span className={styles.message}>{children}</span>
    </div>
  );
}

export default Callout;
