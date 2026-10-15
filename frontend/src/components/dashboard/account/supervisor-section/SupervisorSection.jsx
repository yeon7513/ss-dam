import React from 'react';
import styles from "./SupervisorSection.module.scss";

function SupervisorSection({ supervisor }) {

  if (supervisor.code === null) {
    return (
      <div className={styles.supervisor}>
        담당 관리자가 없습니다.
      </div>
    );
  }

  return (
    <div className={styles.supervisor}>
      <h4 className={styles.title}>담당 관리자</h4>
      {supervisor.code}
      {supervisor.name}
      {supervisor.empId}
      {supervisor.dept.label}
      {supervisor.role.label}
    </div>
  );
}

export default SupervisorSection;
