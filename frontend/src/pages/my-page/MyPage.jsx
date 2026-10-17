import cn from "classnames";
import { useState } from "react";
import { FiBell, FiChevronDown, FiChevronUp, FiSettings } from "react-icons/fi";
import { Link, Outlet, useLocation } from "react-router-dom";
import ProfileCard from "../../components/auth/profile-card/ProfileCard.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
import Sidebar from "../../layout/default/sidebar/Sidebar.jsx";
import { MYPAGE_MENU } from "../../lib/sideMenu.js";
import styles from "./MyPage.module.scss";


/* ---------- 마이페이지 (왼쪽 메뉴 + 본문) ---------- */
function MyPage() {
  const { user } = useAuth();
  const { pathname } = useLocation();

  // 하위 메뉴가 있는 카테고리는 기본으로 펼침
  const [open, setOpen] = useState(() =>
    Object.fromEntries(
      MYPAGE_MENU.filter((m) => m.subMenus).map((m) => [m.category, true]),
    ),
  );
  const toggle = (category) =>
    setOpen((prev) => ({ ...prev, [category]: !prev[category] }));

  const isActive = (item) =>
    item.path
      ? pathname === item.path
      : item.subMenus?.some((s) => s.path && pathname === s.path);

  const alertCount = 9; // 더미: 알림 데이터가 정해지면 연결

  return (
    <main className={styles.wrap}>
      <div className={styles.sideNavWrap}>
        <Sidebar className={styles.nav} isFixed={false}>
          {/* 프로필 + 설정/알림 */}
          <li className={styles.profile}>
            <ProfileCard
              memberProfile={user && { ...user, path: user.profileImage }}
              isMinimal
              badge={
                <span className={styles.utils}>
                  <Link to="/mypage/edit_profile" aria-label="정보 변경">
                    <FiSettings />
                  </Link>
                  <button
                    type="button"
                    aria-label="알림"
                    className={styles.bell}
                  >
                    <FiBell />
                    {alertCount > 0 && (
                      <i className={styles.dot}>{alertCount}</i>
                    )}
                  </button>
                </span>
              }
            />
          </li>

          {/* 메뉴 */}
          {MYPAGE_MENU.map((item) => {
            const single = Boolean(item.path);

            return (
              <li key={item.category} className={styles.group}>
                {single ? (
                  <Link
                    to={item.path}
                    className={cn(
                      styles.header,
                      isActive(item) && styles.active,
                    )}
                  >
                    <span>{item.category}</span>
                  </Link>
                ) : (
                  <button
                    type="button"
                    className={cn(
                      styles.header,
                      isActive(item) && styles.active,
                    )}
                    onClick={() => toggle(item.category)}
                  >
                    <span>{item.category}</span>
                    {open[item.category] ? <FiChevronDown /> : <FiChevronUp />}
                  </button>
                )}

                {!single && open[item.category] && (
                  <ul className={styles.subMenu}>
                    {item.subMenus.map(({ name, path }) => (
                      <li key={name}>
                        <Link
                          to={path || "#"}
                          className={cn(
                            path && pathname === path && styles.subActive,
                          )}
                          onClick={(e) =>
                            !path &&
                            (e.preventDefault(),
                              alert("준비 중인 페이지입니다."))
                          }
                        >
                          {name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            );
          })}
        </Sidebar>
      </div>

      <div className={styles.container}>
        <Outlet />
      </div>
    </main>
  );
}

export default MyPage;
