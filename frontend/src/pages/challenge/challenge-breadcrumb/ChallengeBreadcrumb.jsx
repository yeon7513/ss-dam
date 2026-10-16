import React from "react";
import { Link } from "react-router-dom";
import { IoChevronForward } from "react-icons/io5";

import styles from "./ChallengeBreadcrumb.module.scss";

const ChallengeBreadcrumb = ({ detail = {} }) => {
  /* detail.title 추출 (없을 경우 예외 처리) */
  const title = detail?.title || detail?.challengeTitle || detail?.name;

  return (
    <nav className={styles.breadcrumb} aria-label="breadcrumb">
      {/* 챌린지 전체 목록 링크 */}
      <Link to="/challenge">전체</Link>

      {/* 구분자 */}
      <IoChevronForward className={styles.separator} />

      {/* 챌린지 상세 제목 영역 */}
      <span className={styles.currentTitle}>{title || "현재글"}</span>
    </nav>
  );
};

export default ChallengeBreadcrumb;
