import React from "react";
import { useNavigate } from "react-router-dom";
import { FiHome } from "react-icons/fi";
import Button from "../../common/button/Button";
import styles from "./AdminHeader.module.scss";

const AdminHeader = () => {
  /* 관리자 헤더 이동 로직 */
  const navigate = useNavigate();

  return (
    <header className={styles.topHeader}>
      {/* 홈 이동 버튼 영역 */}
      <div className={styles.homeBtn} onClick={() => navigate("/admin")}>
        <FiHome />
      </div>

      {/* 사용자 모드 전환 버튼 영역 */}
      <Button
        btnStyle="danger"
        size="sm"
        className={styles.userModeBtn}
        onClick={() => navigate("/mypage")}
      >
        사용자 모드 전환
      </Button>
    </header>
  );
};

export default AdminHeader;
