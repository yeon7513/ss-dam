import cn from "classnames";
import styles from "./Hashtag.module.scss";

function Hashtag({ children, className }) {
  return <div className={cn(styles.hashtags, className)}>{children}</div>;
}

export default Hashtag;

