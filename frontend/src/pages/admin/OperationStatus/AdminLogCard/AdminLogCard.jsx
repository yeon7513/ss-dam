import React from "react";
import Card from "../../../../components/common/card/Card.jsx";
import styles from "./AdminLogCard.module.scss";

const AdminLogCard = ({ adminLogsData = [] }) => {
  /* 관리자 활동 로그 컴포넌트 */
  return (
    <Card className={styles.logCard}>
      {/* 카드 헤더 영역 */}
      <div className={styles.cardHeader}>
        <h3>관리자 활동 로그 ↗</h3>
      </div>

      {/* 로그 목록 영역 */}
      <ul className={styles.logList}>
        {adminLogsData.map((log, index) => (
          <li key={index}>{log}</li>
        ))}
      </ul>
    </Card>
  );
};

export default AdminLogCard;
