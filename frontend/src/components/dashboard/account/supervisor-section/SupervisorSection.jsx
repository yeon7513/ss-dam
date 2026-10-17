import React from 'react';
import styles from "./SupervisorSection.module.scss";

function SupervisorSection({ supervisor }) {
  const hasSupervisor = supervisor?.code != null;

  return (
    <div className={styles.supervisor}>
      <h4>담당 관리자</h4>

      {hasSupervisor ? (
        <div className={styles.info}>
          <span className={styles.code}>{supervisor.code}</span>
          <span className={styles.name}>{supervisor.name}</span>
          <span className={styles.empId}>{supervisor.empId}</span>
          <span className={styles.dept}>
            {supervisor.dept?.label ?? "-"}
          </span>
          <span className={styles.role}>
            {supervisor.role?.label ?? "-"}
          </span>
        </div>
      ) : (
        <p className={styles.empty}>담당 관리자가 없습니다.</p>
      )}
    </div>
  );
}

export default SupervisorSection;
