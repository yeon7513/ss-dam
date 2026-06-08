import cn from "classnames";
import styles from "./Button.module.scss";

function Button({ className, children, onClick, type = "button", ...props }) {
  return (
    <button
      className={cn(styles.button, className)}
      type={type}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
