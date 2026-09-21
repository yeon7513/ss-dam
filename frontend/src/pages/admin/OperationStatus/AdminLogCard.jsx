import React from "react";
import Card from "../../../components/common/card/Card.jsx";
import styles from "./AdminLogCard.module.scss";

const AdminLogCard = ({ adminLogsData }) => {
  return (
    // 관리자 활동 로그 카드
    <Card className={styles.logCard}>
      <div className={styles.cardHeader}>
        <h3>관리자 활동 로그 ↗</h3>
      </div>
      <ul className={styles.logList}>
        {adminLogsData.map((log, index) => (
          <li key={index}>{log}</li>
        ))}
      </ul>
    </Card>
  );
};

export default AdminLogCard;
