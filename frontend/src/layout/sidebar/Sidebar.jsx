import cn from "classnames";
import styles from "./Sidebar.module.scss";

function Sidebar({ children, isFixed = true, className }) {
  return (
    <div className={isFixed ? cn(styles.fixed, className) : className}>
      <ul>{children}</ul>
    </div>
  );
}

export default Sidebar;
