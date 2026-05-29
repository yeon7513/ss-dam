import cn from "classnames";
import styles from "./Modal.module.scss";

function Modal({ className, title, children }) {
  return (
    <div className={cn(styles.modal, className)}>
      <div>{title}</div>
      <div>{children}</div>
    </div>
  );
}

export default Modal;
