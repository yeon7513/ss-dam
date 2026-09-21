import React from "react";
import StatCard from "../../../components/common/card/StatCard.jsx";
import styles from "./SummaryStats.module.scss";

const SummaryStats = ({ summaryData }) => {
  return (
    // 2x2 요약 카드
    <div className={styles.statsContainer}>
      {summaryData.map((item, index) => (
        <StatCard key={index} {...item} />
      ))}
    </div>
  );
};

export default SummaryStats;
