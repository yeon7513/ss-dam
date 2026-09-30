import styles from "./TabMenus.module.scss";
import cn from "classnames";

const TabMenus = ({ tabs, activeStatus, onTabChange, className }) => {
  return (
    <div className={cn(styles.tabContainer, className)}>
      {tabs.map((tab) => {
        const isActive = activeStatus === tab.value;
        return (
          <button
            key={tab.value}
            type="button"
            aria-current={isActive ? "page" : undefined}
            className={cn(styles.tab, isActive && styles.activeTab)}
            onClick={() => onTabChange(tab.value)}
          >
            <span>{tab.label}</span>
            {Boolean(tab.badge) && (
              <span className={styles.badge}>{tab.badge}</span>
            )}
          </button>
        );
      })}
    </div>
  );
};

export default TabMenus;
