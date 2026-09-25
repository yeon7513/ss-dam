import React from "react";
import { FaArrowsRotate } from "react-icons/fa6";
import styles from "./DashboardHeader.module.scss";

const DashboardHeader = ({ title = '운영 현황', lastUpdated, isSpinning, handleRefresh }) => {
  return (
    // 페이지 타이틀
    <div className={styles.pageTitleRow}>
      <h1>
        {title}
        <FaArrowsRotate
          className={`${styles.refreshIcon} ${isSpinning ? styles.spinning : ""}`}
          onClick={handleRefresh}
          size={18}
        />
      </h1>
      {/* 동적으로 업데이트되는 시각 바인딩 */}
      <span className={styles.timeInfo}>{lastUpdated}</span>
    </div>
  );
};

export default DashboardHeader;
