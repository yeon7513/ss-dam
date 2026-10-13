import React from "react";
import { Outlet } from "react-router-dom";
import DashboardHeader from "./dashboard-header/DashboardHeader.jsx";
import DashboardSidebar from "./dashboard-sidebar/DashboardSidebar.jsx";
import styles from "./AdminLayout.module.scss";

const AdminLayout = () => {
  return (
    <div className={styles.adminLayout}>
      {/* 사이드바 영역 */}
      <DashboardSidebar />

      {/* 우측 전체 영역 (헤더 + 메인 대시보드 콘텐츠) */}
      <div className={styles.mainContent}>
        {/* 헤더 영역 */}
        <DashboardHeader />

        {/* 콘텐츠 영역 */}
        <div className={styles.dashboardBody}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
