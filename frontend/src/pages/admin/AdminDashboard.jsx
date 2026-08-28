import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAdminAuth = async () => {
      try {
        const response = await fetch("/api/admin/check");

        if (response.ok) {
          return;
        }
        if (response.status === 403) {
          alert("관리자만 접근할 수 있는 페이지입니다.");
          navigate("/");
          return;
        }

        if (response.status === 401) {
          alert("로그인이 필요한 페이지입니다");
          navigate("/login");
          return;
        }

        console.warn("권한 확인 실패 (HTTP 상태)", response.status);
        navigate("/");
      } catch (error) {
        console.error("권한 확인 중 에러" + error);
      }
    };

    checkAdminAuth();
  }, [navigate]);
  return (
    <div>
      <h2>AdminDashboard</h2>
    </div>
  );
};

export default AdminDashboard;
