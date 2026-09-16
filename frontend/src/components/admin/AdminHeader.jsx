import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./AdminHeader.module.scss";
import Button from "../common/button/Button";

const AdminHeader = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/admin");
  };

  const handleSwitchToUserMode = () => {
    navigate("/mypage"); // 사용자 페이지로 변경 예정
  };

  return (
    <header className={styles.topHeader}>
      <div
        className={styles.homeIcon}
        onClick={handleGoHome}
        title="관리자 메인으로 이동"
      >
        🏠
      </div>

      <Button
        type="button"
        btnStyle="danger"
        size="sm"
        className={styles.userModeBtn}
        onClick={handleSwitchToUserMode}
      >
        사용자 모드 전환
      </Button>
    </header>
  );
};

export default AdminHeader;
