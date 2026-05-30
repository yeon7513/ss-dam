import cn from "classnames";
import styles from "./Hashtag.module.scss";

function Hashtag({ key, children, className, handleClick = null }) {
  return (
    <div key={key} className={cn(styles.hashtags, className)}>
      <button type="button" onClick={handleClick}>
        {children}
      </button>
    </div>
  );
}

export default Hashtag;
