import React from "react";
import styles from "./Header.module.scss";

const Header = () => {
  return (
    <header className={styles.container}>
      <div className={styles.inner}>
        {/* 왼쪽 로고 영역 : '쓰담쓰담' 부분 */}
        <div className="logoArea">
          <h1 className={styles.logoText}>쓰담쓰담</h1>
        </div>

        {/* 오른쪽 영역 : 유틸리티 메뉴 + 메인 네비게이션 */}
        <div className={styles.menuArea}>
          <div className={styles.utilityNav}>
            <span className={styles.navItem}>마이페이지</span>
            <span className={styles.divider}> | </span>
            <span className={styles.navItem}>로그아웃</span>
          </div>

          <nav className={styles.mainNav}>
            <ul className={styles.navList}>
              <li>소개</li>
              <li>다시쓰담</li>
              <li>피드</li>
              <li>챌린지</li>
              <li>고객센터</li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
