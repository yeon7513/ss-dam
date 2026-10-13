import React from "react";
import styles from "./Footer.module.scss";

function Footer() {
  // 로고 클릭 시 화면 최상단 이동
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className={styles.container}>
      <p className={styles.copyright}>
        © 2026. RETURN ZERO All rights reserved.
      </p>
      <span
        className={styles.logoText}
        onClick={scrollToTop} // 로고 클릭 시 화면 최상단 이동
        title="현재 페이지 최상단으로 이동" // 마우스 호버 시 툴팁 문구
      >
        쓰담쓰담
      </span>
    </footer>
  );
}

export default Footer;
