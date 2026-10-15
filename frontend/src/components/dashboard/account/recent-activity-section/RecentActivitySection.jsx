import React from 'react';
import styles from "./RecentActivitySection.module.scss";
import { useLoadData } from "../../../../hooks/useLoadData.js";

function RecentActivitySection({ targetCode }) {
  const { data: recentActivities } =
    useLoadData(targetCode ? `/api/admin/account/${targetCode}/activities` : null);

  return (
    <div className={styles.recentActivity}>
      <h4 className={styles.title}>활동 내역</h4>
      {recentActivities ? (
        <ul>
          {recentActivities.map((activity, idx) => (
            <li key={idx}>
              <span>{activity.type}</span>
              <span>{activity.createdAt}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className={styles.noActivity}>활동 내역이 없습니다.</p>
      )}
    </div>
  );
}

export default RecentActivitySection;
