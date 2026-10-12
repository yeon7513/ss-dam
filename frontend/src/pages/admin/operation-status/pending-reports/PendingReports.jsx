import React from "react";
import Card from "../../../../components/common/card/Card.jsx";
import styles from "./PendingReports.module.scss";

const PendingReports = ({ pendingReportsData = [] }) => {
  /* 미처리 신고 목록 컴포넌트 */
  return (
    <Card className={styles.reportCard}>
      {/* 카드 헤더 영역 */}
      <div className={styles.cardHeader}>
        <h3>미처리 신고 ↗</h3>
      </div>

      {/* 신고 테이블 영역 */}
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
            {pendingReportsData.map((item) => (
              <tr key={item.id}>
                <td className={styles.dateTd}>{item.date}</td>
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

      {/* 페이지네이션 영역 */}
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
