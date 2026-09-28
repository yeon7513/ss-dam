import React from "react";
import Card from "../../../../components/common/card/Card.jsx";
import styles from "./PendingReports.module.scss";

const PendingReports = ({ pendingReportsData }) => {
  return (
    //  미처리 신고 카드
    <Card className={styles.reportCard}>
      <div className={styles.cardHeader}>
        <h3>미처리 신고 ↗</h3>
      </div>
      <div className={styles.tableWrapper}>
        <table className={styles.reportTable}>
          <thead>
            <tr>
              <th>날짜</th>
              <th>회원 구분</th>
              <th>사유</th>
              <th>설명</th>
            </tr>
          </thead>
          <tbody>
            {pendingReportsData.map((item, index) => (
              <tr key={index}>
                <td>{item.date}</td>
                <td>
                  <div className={styles.userInfo}>
                    <div className={styles.avatar}>👤</div>
                    <div className={styles.userText}>
                      <strong>{item.user}</strong>
                      <small>{item.role}</small>
                    </div>
                  </div>
                </td>
                <td>
                  <span className={styles.badge}>{item.reason}</span>
                </td>
                <td className={styles.descTd}>{item.desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className={styles.pagination}>
        <span>&lt; 처음</span>
        <span>1</span>
        <span className={styles.activePage}>2</span>
        <span>3</span>
        <span>4</span>
        <span>5</span>
        <span>...</span>
        <span>11</span>
        <span>마지막 &gt;</span>
      </div>
    </Card>
  );
};

export default PendingReports;
