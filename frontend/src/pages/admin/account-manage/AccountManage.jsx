import React, { useState } from 'react';
import { useLoadData } from "../../../hooks/useLoadData.js";
import { useSearchQuery } from "../../../hooks/useSearchQuery.js";
import PanelHeader from "../../../layout/admin/panel-header/PanelHeader.jsx";
import Pagination from "../../../components/common/pagination/Pagination.jsx";
import { useNavigate } from "react-router-dom";
import MemberCard from "../../../components/dashboard/member-card/MemberCard.jsx";
import styles from "./AccountManage.module.scss";
import AccountManageDetail from "./account-manage-detail/AccountManageDetail.jsx";
import Button from "../../../components/common/button/Button.jsx";

function AccountManage() {
  const [detailCode, setDetailCode] = useState(null);


  const navigate = useNavigate();
  const { data: adminAccounts, refetch } = useLoadData("/api/admin/account");
  const { handleSearch } = useSearchQuery({
    page: 1,
    perPage: 6,
    keyword: "",
    role: "",
    dept: "",
    deleted: null,
    fromDate: "",
    toDate: "",
  });

  // 새로고침
  const handleRefresh = () => {
    refetch();
  }

  const handleClickDetail = (code) => {
    setDetailCode(code);
  }

  console.log(adminAccounts);

  return (
    <div className={styles.wrap}>
      <PanelHeader
        title="관리자 계정 관리"
        onRefresh={handleRefresh}
      />

      {/**/}
      <div>
        검색용 필터 영역

        <div>
          <Button type="button">관리자 계정 생성</Button>
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
          <Pagination pager={adminAccounts?.pager} />
        </div>

        {/* 상세 정보 조회 영역 */}
        <AccountManageDetail code={detailCode} />
      </div>

    </div>
  );
}

export default AccountManage;
