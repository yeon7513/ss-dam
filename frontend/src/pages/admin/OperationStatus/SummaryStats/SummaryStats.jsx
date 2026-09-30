import React from "react";
import StatCard from "../../../../components/common/card/StatCard.jsx";
import styles from "./SummaryStats.module.scss";

const SummaryStats = ({ summaryData }) => {
  return (
    /* 요약 통계 정보 컴포넌트 */
    <div className={styles.statsContainer}>
      {summaryData.map((item, index) => (
        <StatCard key={index} {...item} />
      ))}
    </div>
  );
};

export default SummaryStats;
