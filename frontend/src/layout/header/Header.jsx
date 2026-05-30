import React, { useEffect, useState } from "react";
import styles from "./Header.module.scss";
import { Link, Navigate } from "react-router-dom";

const Header = () => {
  const nevigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const userSession = sessionStorage.getItem("user");
    if (userSession) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogOut = () => {
    sessionStorage.removeItem("user");
    setIsLoggedIn(false);
    alert("로그아웃 되었습니다");
    navigate("/");
  };

  return (
    <header className={styles.container}>
      <div className={styles.inner}>
        {/* 왼쪽 로고 영역 : '쓰담쓰담' 부분 */}
        <div className="logoArea">
          <h1 className={styles.logoText}>
            <Link to="/">쓰담쓰담</Link>
          </h1>
        </div>

        {/* 오른쪽 영역 : 유틸리티 메뉴 + 메인 네비게이션 */}
        <div className={styles.menuArea}>
          <div className={styles.utilityNav}>
            {isLoggedIn ? (
              <>
                <span className={styles.navItem}>
                  <Link to="/myPage">마이페이지</Link>
                </span>
                <span className={styles.divider}> | </span>
                <span className={styles.navItem}>
                  <Link to="/">로그아웃</Link>
                </span>
              </>
            ) : (
              <>
                <span className={styles.navItem}>
                  <Link to="/myPage">마이페이지</Link>
                </span>
                <span className={styles.divider}> | </span>
                <span className={styles.navItem}>
                  <Link to="/logIn">로그인</Link>
                </span>
              </>
            )}
          </div>

          <nav className={styles.mainNav}>
            <ul className={styles.navList}>
              <li>
                <Link to="/about">소개</Link>
              </li>
              <li>
                <Link to="/market">다시쓰담</Link>
              </li>
              <li>
                <Link to="/feed">피드</Link>
              </li>
              <li>
                <Link to="challenge">챌린지</Link>
              </li>
              <li>
                <Link to="supports">고객센터</Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
