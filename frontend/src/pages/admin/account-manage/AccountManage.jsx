import React from 'react';
import { useLoadData } from "../../../hooks/useLoadData.js";
import { useSearchQuery } from "../../../hooks/useSearchQuery.js";
import PanelHeader from "../../../layout/admin/panel-header/PanelHeader.jsx";
import Pagination from "../../../components/common/pagination/Pagination.jsx";

function AccountManage() {

  const { data } = useLoadData("/api/admin/account");
  const { handleSearch } = useSearchQuery({
    page: 1,
    perPage: 10,
    keyword: "",
    role: "",
    dept: "",
    deleted: false,
    fromDate: "",
    toDate: "",
  });

  console.log(data);


  return (
    <div>
      <PanelHeader
        title="관리자 계정 관리"
        onRefresh={() => console.log("Refresh")}
      />

      {/* 페이지네이션 */}
      <Pagination pager={data?.pager} />
    </div>
  );
}

export default AccountManage;
