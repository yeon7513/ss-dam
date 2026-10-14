import cn from "classnames";
import { useEffect, useId, useRef } from "react";
import { createPortal } from "react-dom";

import styles from "./Modal.module.scss";

function Modal({
  className,
  contentClassName, // 모달 내부 박스에 적용할 추가 스타일
  title,
  children,
  isOpen = false,
  onClose,
  closeDisabled = false, // 처리 중 모달 닫기 방지
}) {
  const contentRef = useRef(null);
  const titleId = useId();

  // 이벤트에서 최신 닫기 함수와 처리 상태를 사용
  const closeRef = useRef({ onClose, closeDisabled });

  useEffect(() => {
    closeRef.current = { onClose, closeDisabled };
  }, [onClose, closeDisabled]);

  // 모달 Open 상태에 따른 body 스크롤 및 키보드 제어
  useEffect(() => {
    if (!isOpen) return;

    const content = contentRef.current;
    const previousOverflow = document.body.style.overflow;
    const previousFocus = document.activeElement;

    // 모달이 열리면 body 스크롤 차단
    document.body.style.overflow = "hidden";

    // 모달 내부에서 포커스를 받을 수 있는 요소 조회
    const getFocusableElements = () =>
      [
        ...content.querySelectorAll(
          'a[href], button, input, select, textarea, ' +
          '[tabindex]:not([tabindex="-1"])',
        ),
      ].filter(
        (element) =>
          !element.matches(":disabled") &&
          element.tabIndex >= 0 &&
          element.getClientRects().length > 0,
      );

    // 모달이 열리면 내부로 포커스 이동
    const focusFirstElement = () => {
      const first = getFocusableElements()[0];
      (first ?? content).focus();
    };

    focusFirstElement();

    const handleKeyDown = (event) => {
      // Escape 키로 닫기
      if (event.key === "Escape") {
        event.preventDefault();

        if (!closeRef.current.closeDisabled) {
          closeRef.current.onClose?.();
        }

        return;
      }

      // Tab 키로 모달 밖으로 이동하지 않도록 제어
      if (event.key !== "Tab") return;

      const elements = getFocusableElements();
      const first = elements[0];
      const last = elements[elements.length - 1];
      const active = document.activeElement;

      if (!first) {
        event.preventDefault();
        content.focus();
        return;
      }

      if (
        event.shiftKey &&
        (active === first ||
          active === content ||
          !content.contains(active))
      ) {
        event.preventDefault();
        last.focus();
      } else if (
        !event.shiftKey &&
        (active === last ||
          active === content ||
          !content.contains(active))
      ) {
        event.preventDefault();
        first.focus();
      }
    };

    // 다른 코드가 배경으로 포커스를 이동해도 모달 내부로 복귀
    const handleFocusIn = (event) => {
      if (!content.contains(event.target)) {
        focusFirstElement();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("focusin", handleFocusIn);

    // 모달이 닫히거나 컴포넌트가 언마운트될 때 cleanup 처리
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("focusin", handleFocusIn);

      // 모달이 열리기 전 스크롤 상태로 원복
      document.body.style.overflow = previousOverflow;

      // 모달을 열었던 요소로 포커스 복귀
      if (
        previousFocus instanceof HTMLElement &&
        previousFocus.isConnected
      ) {
        previousFocus.focus();
      }
    };
  }, [isOpen]);

  if (!isOpen) return null;

  // 배경 또는 닫기 버튼 클릭
  const handleClose = () => {
    if (!closeDisabled) {
      onClose?.();
    }
  };

  // 부모 레이아웃의 영향을 받지 않도록 body에 표시
  return createPortal(
    <div
      className={cn(styles.modalOverlay, className)}
      onClick={handleClose}
    >
      <div
        ref={contentRef}
        className={cn(styles.modalContent, contentClassName)}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
        aria-label={title ? undefined : "상세 창"}
        tabIndex={-1}
      >
        {/* 모달 제목 및 닫기 버튼 */}
        {title && (
          <div className={styles.modalHeader}>
            <div id={titleId}>{title}</div>

            <button
              type="button"
              className={styles.closeButton}
              onClick={handleClose}
              disabled={closeDisabled}
              aria-label="모달 닫기"
            >
              ×
            </button>
          </div>
        )}

        {/* 모달 본문 */}
        <div>{children}</div>
      </div>
    </div>,
    document.body,
  );
}

export default Modal;