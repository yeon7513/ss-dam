import { useMemo } from "react";

// 공통 UI 컴포넌트
import DataTable from "../../../components/common/data-table/DataTable";
import Pagination from "../../../components/common/pagination/Pagination";
import SearchFilterBar from "../../../components/dashboard/search-filter-bar/SearchFilterBar.jsx";
import PanelHeader from "../../../layout/admin/panel-header/PanelHeader";

// 공통 훅 & 유틸
import { useLoadData } from "../../../hooks/useLoadData.js";
import { useSearchQuery } from "../../../hooks/useSearchQuery.js";
import { buildQueryString } from "../../../utils/buildQueryString.js";

// 상수
import {
  ADMIN_LOG_COLUMNS,
  ADMIN_LOG_INITIAL_FILTERS,
  ADMIN_LOG_PROCESS_SELECT,
  ADMIN_LOG_TABS,
  getProcessOptions,
} from "../../../constants/admin-log/AdminActivityLog.constants.jsx";

import styles from "./AdminActivityLogs.module.scss";

export default function AdminActivityLogs() {
  // 검색 조건 <-> 주소줄 쿼리스트링 동기화
  const { searchFilter, queryString, handleSearch, handleChangePages } =
    useSearchQuery(ADMIN_LOG_INITIAL_FILTERS);

  // 전체 탭에서는 처리 유형이 "feed:DELETE" 형태 -> 유형과 처리로 분리
  let requestTargetType = searchFilter.targetType;
  let requestProcessType = searchFilter.processType;

  if (!searchFilter.targetType && searchFilter.processType?.includes(":")) {
    [requestTargetType, requestProcessType] = searchFilter.processType.split(":");
  }

  // 공통 날짜 이름(fromDate, toDate) -> 활동 로그 API 이름(from, to)
  const apiQueryString = buildQueryString({
    ...searchFilter,
    targetType: requestTargetType,
    processType: requestProcessType,
    from: searchFilter.fromDate,
    to: searchFilter.toDate,
    fromDate: "",
    toDate: "",
  });

  // 활동 로그 조회
  const { data, loading, error, refetch } = useLoadData(
    `/api/admin/logs${apiQueryString}`,
  );

  // 처리 유형 셀렉트: 현재 탭 기준으로 옵션 조립
  const selectGroups = useMemo(
    () => [
      {
        ...ADMIN_LOG_PROCESS_SELECT,
        options: getProcessOptions(searchFilter.targetType),
      },
    ],
    [searchFilter.targetType],
  );

  const logs = data?.content || [];
  const pager = data?.pager || null;

  // 탭 변경 -> 이전 탭에서 고른 처리 유형은 해제
  const handleTabChange = (targetType) => {
    handleSearch({ targetType, processType: "" });
  };

  return (
    <main className={styles.page}>
      <PanelHeader
        title="관리자 활동 로그"
        onRefresh={refetch}
        className={styles.header}
      />

      {/* 공통 검색 필터 (유형 탭 + 기간 + 처리 유형 + 검색) */}
      {/* 검색어: 관리자 아이디 또는 처리 메모 */}
      <SearchFilterBar
        key={queryString}
        initFilter={ADMIN_LOG_INITIAL_FILTERS}
        searchFilter={searchFilter}
        tabMenu={{
          tabs: ADMIN_LOG_TABS,
          activeStatus: searchFilter.targetType,
          onTabChange: handleTabChange,
        }}
        selectGroups={selectGroups}
        onSearch={handleSearch}
      />

      {/* 활동 로그 목록 (공통 DataTable) */}
      <section className={styles.tableCard} aria-label="관리자 활동 이력">
        {loading ? (
          <p className={styles.message} role="status">
            활동 로그를 불러오는 중입니다.
          </p>
        ) : error ? (
          <div className={styles.message}>
            <p className={styles.error} role="alert">
              {error?.message || "관리자 활동 로그를 불러오지 못했습니다."}
            </p>
          </div>
        ) : (
          <DataTable
            columns={ADMIN_LOG_COLUMNS}
            data={logs}
            totalCount={pager?.total}
          />
        )}

        {!loading && !error && logs.length > 0 && pager && (
          <Pagination pager={pager} onChangePage={handleChangePages} />
        )}
      </section>
    </main>
  );
}