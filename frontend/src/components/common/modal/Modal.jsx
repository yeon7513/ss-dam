import cn from "classnames";
import styles from "./Modal.module.scss";
import { useEffect } from "react";

function Modal({ className, title, children, isOpen = false, onClose }) {
  // 모달 Open 상태에 따른 body 스크롤 제어
  useEffect(() => {
    if (isOpen) {
      // 모달이 열리면 body 스크롤 차단
      document.body.style.overflow = 'hidden';
    } else {
      // 모달이 닫히면 스크롤 원복
      document.body.style.overflow = 'unset';
    }

    // 컴포넌트가 언마운트(삭제)될 때 cleanup 처리
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);


  if (!isOpen) return null;

  return (
    <div className={cn(styles.modalOverlay, className)} onClick={onClose}>
      <div
        className={styles.modalContent}
        onClick={(e) => e.stopPropagation()}
      >
        {
          title && (
            <div>
              <div>{title}</div>
              <button onClick={onClose}>X</button>
            </div>
          )
        }
        <div>{children}</div>
      </div>
    </div>
  );
}

export default Modal;
