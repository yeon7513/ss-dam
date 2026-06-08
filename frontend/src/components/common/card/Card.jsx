import cn from "classnames";
import styles from "./Card.module.scss";

function Card({ className, children, ...props }) {
  return (
    <div className={cn(styles.card, className)} {...props}>
      {children}
    </div>
  );
}

export default Card;
