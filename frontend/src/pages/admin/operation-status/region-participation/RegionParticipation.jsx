import React from "react";
import Card from "../../../../components/common/card/Card.jsx";
import styles from "./RegionParticipation.module.scss";

const RegionParticipation = ({ participationData = [] }) => {
  /* 지역별 참여도 현황 컴포넌트 */
  return (
    <Card className={styles.bottomCard}>
      {/* 카드 헤더 영역 */}
      <div className={styles.cardHeader}>
        <h3>지역별 참여도</h3>
      </div>

      {/* 지역 목록 영역 */}
      <ul className={styles.regionList}>
        {participationData.map((reg, index) => (
          <li key={index}>
            <span>{reg.name}</span>
            <div className={styles.regionVal}>
              <strong>{reg.percent}</strong>
              <small>{reg.count}</small>
            </div>
          </li>
        ))}
      </ul>
    </Card>
  );
};

export default RegionParticipation;
