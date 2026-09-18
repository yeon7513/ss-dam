import React from "react";
import { Link, useLocation } from "react-router-dom";

//import styles from "./Header.module.scss";
import styles from "./AdminSidebar.module.scss";

const AdminSidebar = () => {
  const location = useLocation();

  // 메뉴 데이터 배열 관리
  const menuItems = [
    { name: "대시보드", path: "/admin" },
    { name: "사용자 관리", path: "/admin/users" },
    { name: "상품 관리", path: "/admin/products" },
    { name: "주문 내역", path: "/admin/orders" },
    { name: "설정", path: "/admin/settings" },
  ];

  return (
    <aside className={styles.sidebar}>
      {/* 왼쪽 로고 영역 : '쓰담쓰담' 부분 */}
      <div className="logoArea">
        <h1 className={styles.logoText}>
          <Link to="/">쓰담쓰담</Link>
        </h1>
      </div>
      <nav className={styles.sidebarMenu}>
        <ul>
          {menuItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={location.pathname === item.path ? "active" : ""}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default AdminSidebar;
