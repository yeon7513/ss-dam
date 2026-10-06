import cn from "classnames";
import styles from "./Hashtag.module.scss";
import { IoIosClose } from "react-icons/io";

function Hashtag({ className, hashName, isButton = false, onDeleteHash }) {
  // 버튼 형식일 경우
  if (isButton) {
    return (
      <div className={cn(styles.hashtagItem, styles.tagButton, className)}>
        <button type="button" onClick={() => onDeleteHash(hashName)}>
          <span className={styles.tagName}># {hashName}</span>
          <IoIosClose className={styles.deleteIcon} />
        </button>
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

