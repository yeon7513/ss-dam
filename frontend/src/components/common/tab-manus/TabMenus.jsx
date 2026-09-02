import styles from "./TabMenus.module.scss";

const TabMenus = ({ tabs, activeStatus, onTabChange }) => {
  return (
    <div>
      {tabs.map((tab) => (
        <button
          key={tab.value}
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
