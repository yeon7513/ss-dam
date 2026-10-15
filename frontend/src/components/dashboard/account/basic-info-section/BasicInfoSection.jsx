import React from 'react';
import styles from "./BasicInfoSection.module.scss";
import { formatDateTime } from "../../../../utils/formatDate.js";

function BasicInfoSection({ basicInfo }) {
  return (
    <div className={styles.profile}>
      {/* 아이디 & 이름 & 연락처 */}
      <h4 className={styles.title}>기본 정보</h4>
      <ul className={styles.info}>
        <li>
          <span className={styles.label}>이름</span>
          <span>
            {basicInfo.name}
          </span>
        </li>
        <li>
          <span className={styles.label}>아이디</span>
          <span>
            {basicInfo.empId}
          </span>
        </li>
        <li>
          <span className={styles.label}>연락처</span>
          <span>
            {basicInfo.phone}
          </span>
        </li>
        <li>
          <span className={styles.label}>계정 생성일</span>
          <span>{formatDateTime(basicInfo.createdAt)}</span>
        </li>
        <li>
          <span className={styles.label}>마지막 로그인</span>
          <span>{formatDateTime(basicInfo.loggedAt)}</span>
        </li>
      </ul>
    </div>
  );
}

export default BasicInfoSection;
