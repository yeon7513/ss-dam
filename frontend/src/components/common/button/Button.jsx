import cn from "classnames";
import styles from "./Button.module.scss";

function Button({
  className,
  btnStyle = "fill",
  children,
  onClick,
  type = "button",
  ...props
}) {
  return (
    <button
      className={cn(styles.button, className, styles[btnStyle])}
      type={type}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
