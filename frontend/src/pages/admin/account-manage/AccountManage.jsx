import React from 'react';
import { useLoadData } from "../../../hooks/useLoadData.js";
import { useSearchQuery } from "../../../hooks/useSearchQuery.js";
import PanelHeader from "../../../layout/admin/panel-header/PanelHeader.jsx";
import Pagination from "../../../components/common/pagination/Pagination.jsx";
import { useNavigate } from "react-router-dom";
import MemberCard from "../../../components/dashboard/member-card/MemberCard.jsx";

function AccountManage() {
  const { data: adminAccounts } = useLoadData("/api/admin/account");
  const { handleSearch } = useSearchQuery({
    page: 1,
    perPage: 10,
    keyword: "",
    role: "",
    dept: "",
    deleted: null,
    fromDate: "",
    toDate: "",
  });

  const navigate = useNavigate();

  console.log(adminAccounts);

  return (
    <div>
      <PanelHeader
        title="관리자 계정 관리"
        onRefresh={() => console.log("Refresh")}
      />

      <div>
        {adminAccounts?.content.map((account) => (
          <MemberCard key={account.code} member={account} type={"admin"} />
        ))}
      </div>

      {/* 페이지네이션 */}
      <Pagination pager={adminAccounts?.pager} />
    </div>
  );
}

export default AccountManage;
