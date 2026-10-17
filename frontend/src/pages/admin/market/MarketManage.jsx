import { useMemo } from "react";
import { useNavigate } from "react-router-dom";

// 공통 UI 컴포넌트
import DataTable from "../../../components/common/data-table/DataTable";
import Pagination from "../../../components/common/pagination/Pagination";
import SearchFilterBar from "../../../components/dashboard/search-filter-bar/SearchFilterBar.jsx";
import PanelHeader from "../../../layout/admin/panel-header/PanelHeader.jsx";

// 공통 훅
import { useLoadData } from "../../../hooks/useLoadData.js";
import { useSearchQuery } from "../../../hooks/useSearchQuery.js";

// 상수
import {
  ADMIN_MARKET_CATEGORY_SELECT,
  ADMIN_MARKET_DELETE_YN,
  ADMIN_MARKET_INITIAL_FILTERS,
  ADMIN_MARKET_SELECT_OPTIONS,
  ADMIN_MARKET_STATUS_TABS,
  getProductColumns,
} from "../../../constants/admin-market/MarketManage.constants.jsx";

import styles from "./MarketManage.module.scss";

export default function MarketManage() {
  const navigate = useNavigate();
  const columns = getProductColumns(navigate);

  // 검색 조건 <-> 주소줄 쿼리스트링 동기화
  const { searchFilter, queryString, handleSearch, handleChangePages } =
    useSearchQuery(ADMIN_MARKET_INITIAL_FILTERS);

  // 상품 목록 조회 (백엔드 파라미터 이름이 공통 필터와 같아서 그대로 전송)
  const { data, loading, error, refetch } = useLoadData(
    `/api/admin/products${queryString}`,
  );

  // 마켓 카테고리 조회 (대분류만 셀렉트 옵션으로 사용)
  const { data: categories } = useLoadData("/api/market/categories");

  // 셀렉트 그룹 조립: 카테고리(API) + 거래 상태 + 지역(상수)
  const selectGroups = useMemo(
    () => [
      {
        ...ADMIN_MARKET_CATEGORY_SELECT,
        options: (categories || []).map((cat) => ({
          code: String(cat.code),
          name: cat.name,
        })),
      },
      ...ADMIN_MARKET_SELECT_OPTIONS,
    ],
    [categories],
  );

  const products = data?.content || [];
  const pager = data?.pager || null;

  // 상태 탭 변경
  const handleTabChange = (statusValue) => {
    handleSearch({ status: statusValue });
  };

  return (
    <div className={styles.container}>
      <PanelHeader title="마켓 거래" onRefresh={refetch} />

      {/* 공통 검색 필터 (탭 + 등록일 + 카테고리·거래상태·지역 + 활성화 여부 + 검색) */}
      {/* key: 탭 변경·필터 삭제 등으로 쿼리가 바뀌면 내부 draft 상태를 새로 맞춤 */}
      <SearchFilterBar
        key={queryString}
        initFilter={ADMIN_MARKET_INITIAL_FILTERS}
        searchFilter={searchFilter}
        tabMenu={{
          tabs: ADMIN_MARKET_STATUS_TABS,
          activeStatus: searchFilter.status,
          onTabChange: handleTabChange,
        }}
        selectGroups={selectGroups}
        radioGroups={ADMIN_MARKET_DELETE_YN}
        onSearch={handleSearch}
      />

      {/* 상품 목록 */}
      <div className={styles.tableCard}>
        {loading ? (
          <p className={styles.state}>상품 목록을 불러오는 중입니다.</p>
        ) : error ? (
          <p className={styles.state} role="alert">
            {error?.message || "상품 목록을 불러오지 못했습니다."}
          </p>
        ) : (
          <DataTable
            columns={columns}
            data={products}
            totalCount={pager?.total}
          />
        )}

        {!loading && !error && pager && (
          <Pagination pager={pager} onChangePage={handleChangePages} />
        )}
      </div>
    </div>
  );
}