import React from "react";
import Card from "./Card.jsx";
import styles from "../../../pages/admin/AdminDashboard.module.scss";

// 2*2요약 카드
const StatCard = ({ title, value, rate }) => (
  <Card className={styles.statCard}>
    <span className={styles.statTitle}>{title}</span>
    <div className={styles.statValRow}>
      <span className={styles.statVal}>{value}</span>
      <span
        className={`${styles.statRate} ${
          rate.startsWith("-") ? styles.minus : styles.plus
        }`}
      >
        {rate}
      </span>
    </div>
  </Card>
);

export default StatCard;
