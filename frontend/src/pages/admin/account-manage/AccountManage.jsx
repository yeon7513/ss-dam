import React, { useState } from 'react';
import { useLoadData } from "../../../hooks/useLoadData.js";
import { useSearchQuery } from "../../../hooks/useSearchQuery.js";
import PanelHeader from "../../../layout/admin/panel-header/PanelHeader.jsx";
import Pagination from "../../../components/common/pagination/Pagination.jsx";
import { useNavigate, useSearchParams } from "react-router-dom";
import MemberCard from "../../../components/dashboard/member-card/MemberCard.jsx";
import styles from "./AccountManage.module.scss";
import AccountManageDetail from "./account-manage-detail/AccountManageDetail.jsx";
import Button from "../../../components/common/button/Button.jsx";
import SearchFilterBar from "../../../components/dashboard/search-filter-bar/SearchFilterBar.jsx";

function AccountManage() {
  const [detailCode, setDetailCode] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedCode = searchParams.get("selectedCode") || null;
  const navigate = useNavigate();

  const { handleSearch, searchFilter, queryString, handleChangePages } = useSearchQuery({
    page: 1,
    perPage: 6,
    keyword: "",
    role: "",
    dept: "",
    deleted: null,
    fromDate: "",
    toDate: "",
    selectedCode,
  });
  const { data: adminAccounts, refetch } = useLoadData(`/api/admin/account${queryString}`);

  // 새로고침
  const handleRefresh = () => {
    refetch();
  }

  // 주소줄의 쿼리스트링 동기화
  const handleClickDetail = (code) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("selectedCode", code);

    setSearchParams(newParams);
    setDetailCode(code);
  }

  console.log(adminAccounts);

  return (
    <div className={styles.wrap}>
      <PanelHeader
        title="관리자 계정 관리"
        onRefresh={handleRefresh}
      />

      {/* 검색 필터 & 관리자 등록 */}
      <div>
        <SearchFilterBar onSearch={handleSearch} searchFilter={searchFilter} />

        <div>
          <Button
            type="button"
            action="submit"
            onClick={() => navigate("account_register")}
          >
            관리자 계정 생성
          </Button>
        </div>

      </div>

      <div className={styles.container}>
        <div className={styles.accounts}>
          <div className={styles.items}>
            {adminAccounts?.content.map((account) => (
              <MemberCard
                key={account.code}
                member={account} type={"admin"}
                onClickDetail={() => handleClickDetail(account.code)}
              />
            ))}
          </div>
          {/* 페이지네이션 */}
          <Pagination pager={adminAccounts?.pager} onChangePage={handleChangePages} />
        </div>

        {/* 상세 정보 조회 영역 */}
        <AccountManageDetail code={selectedCode || detailCode} />
      </div>

    </div>
  );
}

export default AccountManage;
