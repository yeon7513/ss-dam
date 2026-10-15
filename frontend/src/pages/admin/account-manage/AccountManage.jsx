import React from 'react';
import { useLoadData } from "../../../hooks/useLoadData.js";
import { useSearchQuery } from "../../../hooks/useSearchQuery.js";
import PanelHeader from "../../../layout/admin/panel-header/PanelHeader.jsx";
import Pagination from "../../../components/common/pagination/Pagination.jsx";
import { useNavigate, useSearchParams } from "react-router-dom";
import MemberCard from "../../../components/dashboard/member-card/MemberCard.jsx";
import styles from "./AccountManage.module.scss";
import AccountManageDetail from "./account-manage-detail/AccountManageDetail.jsx";
import SearchFilterBar from "../../../components/dashboard/search-filter-bar/SearchFilterBar.jsx";
import { ADMIN_ACCOUNT_INITIAL_FILTERS, ADMIN_ACCOUNT_SELECT_OPTIONS, ADMIN_ACCOUNT_STATUS } from "../../../constants/admin-account/AccountManage.constants.js";
import { useSubmitData } from "../../../hooks/useSubmitData.js";

function AccountManage() {
  const [searchParams] = useSearchParams();
  const detailCode = searchParams.get("selectedCode") || null;
  const navigate = useNavigate();

  // 검색 수행
  const { handleSearch: onSearch, searchFilter, queryString, handleChangePages } = useSearchQuery({
    ...ADMIN_ACCOUNT_INITIAL_FILTERS,
    selectedCode: detailCode,
  });

  // 목록 정보 조회
  const { data: adminAccounts, refetch: listRefetch } = useLoadData(`/api/admin/account${queryString}`);

  // 상세 정보 조회
  const {
    data: adminAccountDetail,
    refetch: detailRefetch,
  } = useLoadData(detailCode ? `/api/admin/account/${detailCode}` : null);


  const { handleSubmit } = useSubmitData(`/api/account`, "PUT");

  // 목록 새로고침 -> PanelHeader용
  const handleRefresh = () => {
    listRefetch();
  }

  // 목록 카드 클릭시 주소줄의 쿼리스트링 동기화
  const handleClickDetail = (code) => {
    onSearch({
      ...searchFilter,
      selectedCode: code,
    });
  }

  // 전체 검색
  const handleSearch = (newFilters) => {
    onSearch({
      ...newFilters,
      selectedCode: null, // 선택된 상세 화면은 초기화
    });
  }

  const handleUpdateAccount = (updatedAccount) => {


    listRefetch();
    detailRefetch();
  }

  return (
    <div className={styles.wrap}>
      <PanelHeader
        title="관리자 계정 관리"
        onRefresh={handleRefresh}
      />

      {/* 검색 필터 & 관리자 등록 */}
      <div>
        <SearchFilterBar
          ctaButton={{
            onClick: () => navigate("account_register"),
            label: "관리자 계정 생성",
          }}
          initFilter={ADMIN_ACCOUNT_INITIAL_FILTERS}
          selectGroups={ADMIN_ACCOUNT_SELECT_OPTIONS}
          radioGroups={ADMIN_ACCOUNT_STATUS}
          searchFilter={searchFilter}
          onSearch={handleSearch}
        />
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
        <AccountManageDetail detail={adminAccountDetail} />
      </div>

    </div>
  );
}

export default AccountManage;
