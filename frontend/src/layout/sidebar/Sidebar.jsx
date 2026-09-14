import cn from "classnames";
import styles from "./Sidebar.module.scss";

function Sidebar({ children, isFixed = true, className }) {
  return (
    // isFixed가 false여도 styles.sidebar 기본 클래스가 적용되도록 수정
    <div
      className={
        isFixed ? cn(styles.fixed, className) : cn(styles.sidebar, className)
      }
    >
      <ul>{children}</ul>
    </div>
  );
}

export default Sidebar;
