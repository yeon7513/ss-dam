import React from "react";
import Card from "../../../../components/common/card/Card.jsx";
import styles from "./RegionParticipation.module.scss";

const RegionParticipation = ({ participationData }) => {
  return (
    <Card className={styles.bottomCard}>
      <div className={styles.cardHeader}>
        <h3>지역별 참여도</h3>
      </div>
      <ul className={styles.regionList}>
        {participationData.map((reg, index) => (
          <li key={index}>
            <span>{reg.name}</span>
            <div className={styles.regionVal}>
              <strong>{reg.percent || "0%"}</strong>
              <small>{reg.count || "(0명)"}</small>
            </div>
          </li>
        ))}
      </ul>
    </Card>
  );
};

export default RegionParticipation;
