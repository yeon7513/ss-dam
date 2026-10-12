import React, { useEffect, useState } from "react";
import { FaArrowsRotate } from "react-icons/fa6";
import styles from "./DashboardHeader.module.scss";
import cn from "classnames";

const DashboardHeader = ({
  title = "대시보드",
  onRefresh,
  className,
}) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(`${new Date().toLocaleString("sv-SE")} 기준`);

  const updateCurrentTime = () =>
    setLastUpdated(`${new Date().toLocaleString("sv-SE")} 기준`);

  const handleRefresh = async () => {
    if (isSpinning) return;

    try {
      await onRefresh();
      setIsSpinning(true);
      updateCurrentTime();
    } catch (error) {
      console.error("데이터 갱신 실패: ", error);
    } finally {
      setTimeout(() => {
        setIsSpinning(false);
      }, 1000);
    }
  }

  useEffect(() => {
    // 1분마다 현재 시각을 자동 갱신함.
    const timer = setInterval(() => {
      onRefresh();
      updateCurrentTime();
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  /* 대시보드 상단 헤더 컴포넌트 */
  return (
    <div className={cn(styles.pageTitleRow, className)}>
      {/* 대시보드 헤더 영역 */}
      <h1>
        {title}
        {/* 새로고침 아이콘 영역 */}
        <FaArrowsRotate
          size={18}
          className={cn(styles.refreshIcon, isSpinning ? styles.spinning : "")}
          onClick={() => handleRefresh()}
        />
      </h1>

      {/* 시각 정보 영역 */}
      <span className={styles.timeInfo}>{lastUpdated}</span>
    </div>
  );
};

export default DashboardHeader;
