import { NavLink, Outlet } from "react-router-dom";
import styles from "./FindAccount.module.scss";

const FindAccount = () => {
  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <nav className={styles.tabs} aria-label="계정 찾기">
          <NavLink to="/supports/find_account/id"
            className={({ isActive }) => isActive ? styles.activeTab : undefined}>아이디 찾기</NavLink>
          <NavLink to="/supports/find_account/password"
            className={({ isActive }) => isActive ? styles.activeTab : undefined}>비밀번호 찾기</NavLink>
        </nav>
        <Outlet />
      </div>
    </main>
  );
};

export default FindAccount;
