import React from "react";
import Card from "./Card.jsx";
import styles from "../../../pages/admin/OperationStatus.module.scss";

// 차트 카드
const ChartCard = ({ title, legends, children }) => (
  <Card className={styles.chartCard}>
    <div className={styles.cardHeader}>
      <h3>{title}</h3>
      {legends && (
        <div className={styles.legend}>
          {legends.map((item, idx) => (
            <React.Fragment key={idx}>
              <span
                className={item.isDark ? styles.dotDark : styles.dotLight}
              ></span>
              {item.label}{" "}
            </React.Fragment>
          ))}
        </div>
      )}
    </div>
    <div className={styles.chartPlaceholder}>{children}</div>
  </Card>
);

export default ChartCard;
