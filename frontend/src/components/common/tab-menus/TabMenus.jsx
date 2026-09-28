import styles from "./TabMenus.module.scss";
import cn from "classnames";

const TabMenus = ({ tabs, activeStatus, onTabChange, className }) => {
  return (
    <div className={cn(styles.tabContainer, className)}>
      {tabs.map((tab) => (
        <button
          key={tab.value}
          aria-current={activeStatus === tab.value ? 'page' : undefined}
          className={activeStatus === tab.value ? styles.activeTab : styles.tab}
          onClick={() => onTabChange(tab.value)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default TabMenus;
