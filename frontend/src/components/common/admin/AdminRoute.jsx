import React from "react";
import { Navigate, Outlet } from "react-router-dom";

// 인터셉터 잠시 꺼두려고 주석처리

const AdminRoute = () => {
  // const userRole = sessionStorage.getItem("userRole");

  // if (!userRole || userRole === "MEMBER") {
  //   alert("접근 권한이 없습니다");

  //   return <Navigate to="/" replace />;
  // }

  return <Outlet />;
};

export default AdminRoute;
