import React from 'react';
import { useAuth } from "../../../context/AuthContext.jsx";
import { Navigate, Outlet } from "react-router-dom";

// 비로그인 사용자가 비정삭적인 방법으로 회원 전용 페이지에 접근할 시
// 이를 막기 위한 컴포넌트
// 관리자 페이지 포함!
function ProtectedRoute({ requiredRole }) {
  const { user, isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    alert("로그인이 필요한 서비스입니다.");
    return <Navigate to="/login" />;
  }

  // 권한 검사
  if (requiredRole && user.role === "MEMBER") {
    return <Navigate to="/error/403" replace />;
  }

  return (
    <Outlet />
  );
}

export default ProtectedRoute;
