import React from 'react';
import DashboardHeader from "../../../components/admin/dashboard-header/DashboardHeader.jsx";
import { useLoadData } from "../../../hooks/useLoadData.js";
import { useSearchQuery } from "../../../hooks/useSearchQuery.js";

function AccountManage() {

  const { data } = useLoadData("/api/admin/account");
  const { handleSearch } = useSearchQuery();

  return (
    <div>
      <DashboardHeader
        title="관리자 계정 관리"
        onRefresh={() => console.log("Refresh")}
      />
    </div>
  );
}

export default AccountManage;
