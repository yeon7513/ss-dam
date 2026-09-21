import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ADMIN_MENU } from "../../lib/sideMenu";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

import styles from "./AdminSidebar.module.scss";

const AdminSidebar = () => {
  const { pathname } = useLocation();
  const [open, setOpen] = useState({
    "서비스 관리": true,
    "챌린지 관리": true,
    "시스템 관리": true,
  });

  const toggle = (cat) => setOpen((prev) => ({ ...prev, [cat]: !prev[cat] }));
  const isActive = (item) =>
    item.path
      ? pathname === item.path
      : item.subMenus?.some((s) => s.path && pathname === s.path);

  return (
    <aside className={styles.sidebar}>
      <div className={styles.sidebarInner}>
        <div className={`logoArea ${styles.logoContainer}`}>
          <h1 className={styles.logoText}>
            <Link to="/">쓰담쓰담</Link>
          </h1>
        </div>

        <nav className={styles.sidebarMenu}>
          {ADMIN_MENU.map((item) => {
            const active = isActive(item);
            const isSingle = Boolean(item.path);

            return (
              <div key={item.category} className={styles.categoryGroup}>
                {isSingle ? (
                  /* @수정: button과 내부 태그 구조(span)를 동일하게 맞춰서 CSS 정렬 위치를 수평선상에 완전히 일치시킴 */
                  <Link
                    to={item.path}
                    className={`${styles.categoryHeader} ${
                      active ? styles.active : ""
                    }`}
                  >
                    <span>{item.category}</span>
                  </Link>
                ) : (
                  <button
                    type="button"
                    className={`${styles.categoryHeader} ${
                      active ? styles.active : ""
                    }`}
                    onClick={() => toggle(item.category)}
                  >
                    <span>{item.category}</span>
                    <span className={styles.arrow}>
                      {open[item.category] ? (
                        <FiChevronDown />
                      ) : (
                        <FiChevronUp />
                      )}
                    </span>
                  </button>
                )}

                {!isSingle && open[item.category] && (
                  <ul>
                    {item.subMenus.map(({ name, path }) => (
                      <li key={name}>
                        <Link
                          to={path || "#"}
                          className={
                            path && pathname === path ? styles.subActive : ""
                          }
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
              </div>
            );
          })}
        </nav>
      </div>
    </aside>
  );
};

export default AdminSidebar;
