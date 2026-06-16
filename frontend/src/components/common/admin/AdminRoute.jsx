import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const AdminRoute = () => {
  const userRole = sessionStorage.getItem("userRole");

  if (!userRole || userRole === "MEMBER") {
    alert("접근 권한이 없습니다");

    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default AdminRoute;
