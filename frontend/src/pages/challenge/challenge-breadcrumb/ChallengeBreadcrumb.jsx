import { Link } from "react-router-dom";
import { IoChevronForward } from "react-icons/io5";
import styles from "./ChallengeBreadcrumb.module.scss";

const ChallengeBreadcrumb = ({ title, detail }) => {
  const currentTitle = title || detail?.title || "상세";

  return (
    /* 브레드크럼 영역 */
    <nav className={styles.breadcrumb} aria-label="breadcrumb">
      {/* 홈 링크 영역 */}
      <Link to="/">홈</Link>

      {/* 구분자 영역 */}
      <IoChevronForward className={styles.separator} />

      {/* 챌린지 목록 링크 영역 */}
      <Link to="/challenge">챌린지</Link>

      {/* 구분자 영역 */}
      <IoChevronForward className={styles.separator} />

      {/* 챌린지 상세 제목 영역 */}
      <span className={styles.currentTitle}>{currentTitle}</span>
    </nav>
  );
};

export default ChallengeBreadcrumb;
