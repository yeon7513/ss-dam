import cn from "classnames";
import styles from "./Hashtag.module.scss";
import CloseButton from "../../common/button/close/CloseButton.jsx";

function Hashtag({ className, hashName, isButton = false, onDeleteHash }) {
  // 버튼 형식일 경우
  if (isButton) {
    return (
      <div className={cn(styles.hashtagItem, styles.tagButton, className)}>
        <div className={styles.registeredTag} onClick={() => onDeleteHash(hashName)}>
          <span className={styles.tagName}># {hashName}</span>
          <CloseButton />
        </div>
      </div>
    )
  }

  return (
    <div className={cn(styles.hashtagItem, styles.tagText, className)}>
      <span className={styles.tagName}>#{hashName}</span>
    </div>
  );
}

export default Hashtag;

