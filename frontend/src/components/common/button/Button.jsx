import cn from "classnames";
import styles from "./Button.module.scss";

function Button({
  className,
  btnStyle = "fill",
  size = "lg",
  fullWidth = false,
  children,
  onClick,
  type = "button",
  ...props
}) {
  return (
    <button
      className={cn(
        styles.button,
        styles[btnStyle],
        styles[size],
        { [styles.fullWidth]: fullWidth },
        className,
      )}
      type={type}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
