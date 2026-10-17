import React from 'react';
import styles from "./SubInfoSection.module.scss";

function SubInfoSection({ role, dept }) {
  return (
    <div className={styles.subInfo}>
      {/* 부서 & 권한 정보 */}
      <div className={styles.dept}>
        <h4 className={styles.title}>부서 및 권한</h4>
        <div>
          <span className={styles.label}>부서</span>
          <span>{dept.label}</span>
        </div>
        <div>
          <span className={styles.label}>권한</span>
          <span>{role.label}</span>
        </div>
      </div>
    </div>
  );
}

export default SubInfoSection;
