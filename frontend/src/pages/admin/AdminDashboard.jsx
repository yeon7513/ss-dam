import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/api/admin/check")
      .then((res) => {
        if (res.status === 403) {
          alert("관리자만 접근할 수 있는 페이지입니다.");
          navigate("/");
          return;
        }

        if (res.status === 401) {
          alert("로그인이 필요한 페이지입니다");
          navigate("/login");
          return;
        }
      })
      .catch((err) => {
        console.error("권한 확인 중 에러" + err);
      });
  }, [navigate]);
  return (
    <div>
      <h2>AdminDashboard</h2>
    </div>
  );
};

export default AdminDashboard;
