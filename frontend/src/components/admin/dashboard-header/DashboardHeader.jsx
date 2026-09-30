import React from "react";
import { FaArrowsRotate } from "react-icons/fa6";
import styles from "./DashboardHeader.module.scss";

const DashboardHeader = ({
  title = "대시보드",
  lastUpdated,
  isSpinning,
  handleRefresh,
  className = "",
}) => {
  /* 대시보드 상단 헤더 컴포넌트 */
  return (
    <div className={`${styles.pageTitleRow} ${className}`}>
      {/* 대시보드 헤더 영역 */}
      <h1>
        {title}
        {/* 새로고침 아이콘 영역 */}
        <FaArrowsRotate
          size={18}
          className={`${styles.refreshIcon} ${
            isSpinning ? styles.spinning : ""
          }`}
          onClick={handleRefresh}
        />
      </h1>

      {/* 시각 정보 영역 */}
      <span className={styles.timeInfo}>{lastUpdated}</span>
    </div>
  );
};

export default DashboardHeader;
