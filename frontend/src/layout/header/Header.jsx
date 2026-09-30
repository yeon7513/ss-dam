import { Link } from "react-router-dom";
import styles from "./Header.module.scss";
import { useAuth } from "../../context/AuthContext.jsx";

const Header = () => {
  const { isLoggedIn, logout } = useAuth();

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
                  <Link to="/mypage">마이페이지</Link>
                </span>
                <span className={styles.divider}> | </span>
                <span className={styles.navItem} onClick={logout}>
                  로그아웃
                </span>
              </>
            ) : (
              <>
                {/* <span className={styles.navItem}>
                  <Link to="/mypage">마이페이지</Link>
                  </span>
                  <span className={styles.divider}> | </span> */}
                <span className={styles.navItem}>
                  <Link to="/login">로그인</Link>
                </span>
                <span className={styles.divider}> | </span>
                <span className={styles.navItem}>
                  <Link to="/signup">회원가입</Link>
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
                <Link to="/challenge">챌린지</Link>
              </li>
              <li>
                <Link to="/supports">고객센터</Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
