import { useNavigate } from "react-router-dom";

// 공통 UI 컴포넌트
import Pagination from "../../../components/common/pagination/Pagination";
import MemberCard from "../../../components/dashboard/member-card/MemberCard";
import SearchFilterBar from "../../../components/dashboard/search-filter-bar/SearchFilterBar.jsx";
import PanelHeader from "../../../layout/admin/panel-header/PanelHeader.jsx";

// 공통 훅 & 유틸
import { useLoadData } from "../../../hooks/useLoadData.js";
import { useSearchQuery } from "../../../hooks/useSearchQuery.js";
import { buildQueryString } from "../../../utils/buildQueryString.js";

// 상수
import {
  ADMIN_USER_INITIAL_FILTERS,
  ADMIN_USER_SELECT_OPTIONS,
  ADMIN_USER_STATUS_TABS,
} from "../../../constants/admin-user/UserManage.constants.js";

// 이 페이지에서 사용하는 스타일
import styles from "./UserManage.module.scss";

export default function UserManage() {
  const navigate = useNavigate();

  // 검색 조건 <-> 주소줄 쿼리스트링 동기화
  const { searchFilter, queryString, handleSearch, handleChangePages } =
    useSearchQuery(ADMIN_USER_INITIAL_FILTERS);

  // SearchFilterBar 공통 날짜 이름(fromDate, toDate)을
  // 회원 API 파라미터 이름(joinedFrom, joinedTo)으로 변환
  const apiQueryString = buildQueryString({
    ...searchFilter,
    joinedFrom: searchFilter.fromDate,
    joinedTo: searchFilter.toDate,
    fromDate: "",
    toDate: "",
  });

  // 회원 목록 조회
  const { data, loading, error, refetch } = useLoadData(
    `/api/admin/members${apiQueryString}`,
  );

  const members = data?.content || [];
  const pager = data?.pager || null;

  // 상태 탭 변경
  const handleTabChange = (statusValue) => {
    handleSearch({ status: statusValue });
  };

  return (
    <div className={styles.container}>
      {/* 제목 + 새로고침 + 현재 시각 */}
      <div className={styles.header}>
        <PanelHeader title="관리자 회원 관리" onRefresh={refetch} />
      </div>

      {/* 공통 검색 필터 (탭 + 가입일 + 셀렉트 + 키워드) */}
      {/* key: 탭 변경·필터 삭제 등으로 쿼리가 바뀌면 내부 draft 상태를 새로 맞춤 */}
      <SearchFilterBar
        key={queryString}
        initFilter={ADMIN_USER_INITIAL_FILTERS}
        searchFilter={searchFilter}
        tabMenu={{
          tabs: ADMIN_USER_STATUS_TABS,
          activeStatus: searchFilter.status,
          onTabChange: handleTabChange,
        }}
        selectGroups={ADMIN_USER_SELECT_OPTIONS}
        onSearch={handleSearch}
      />

      {/* 회원 카드 목록 */}
      {loading ? (
        <p className={styles.state}>회원 목록을 불러오는 중입니다.</p>
      ) : error ? (
        <p className={styles.state} role="alert">
          {error?.message || "회원 목록을 불러오지 못했습니다. 다시 시도해주세요."}
        </p>
      ) : members.length === 0 ? (
        <p className={styles.state}>조회된 회원이 없습니다.</p>
      ) : (
        <div className={styles.memberGrid}>
          {members.map((member) => (
            <MemberCard
              key={member.code}
              member={member}
              onClickDetail={() => navigate(`/admin/user_manage/${member.code}`)}
            />
          ))}
        </div>
      )}

      {/* 페이지 이동 */}
      {!loading && !error && pager && (
        <Pagination pager={pager} onChangePage={handleChangePages} />
      )}
    </div>
  );
}