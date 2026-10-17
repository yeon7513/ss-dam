// frontend/src/pages/admin/reports/AdminReports.jsx

import { useState } from "react";

import { formatDate, REASONS, STATUSES, TARGETS } from "../../../api/adminReport";
import { useAuth } from "../../../context/AuthContext";

// 공통 UI 컴포넌트
import Button from "../../../components/common/button/Button";
import Card from "../../../components/common/card/Card";
import Pagination from "../../../components/common/pagination/Pagination";
import SearchFilterBar from "../../../components/dashboard/search-filter-bar/SearchFilterBar.jsx";
import PanelHeader from "../../../layout/admin/panel-header/PanelHeader";

// 공통 훅 & 유틸
import { useLoadData } from "../../../hooks/useLoadData.js";
import { useSearchQuery } from "../../../hooks/useSearchQuery.js";
import { buildQueryString } from "../../../utils/buildQueryString.js";

// 상수
import {
  ADMIN_REPORT_INITIAL_FILTERS,
  ADMIN_REPORT_SELECT_OPTIONS,
  ADMIN_REPORT_STATUS_TABS,
  toStatusParams,
} from "../../../constants/admin-report/AdminReport.constants.js";

import styles from "./AdminReports.module.scss";
import ReportDetailModal from "./ReportDetailModal";

export default function AdminReports() {
  const { user } = useAuth();

  // 상세 모달로 열 신고 번호
  const [selectedCode, setSelectedCode] = useState(null);

  // role은 { code, label } 객체로 내려오므로 code로 비교함.
  const isAdmin = [
    "ROLE_SUPER",
    "ROLE_MANAGER",
    "ROLE_STAFF",
  ].includes(user?.role?.code);

  // 검색 조건 <-> 주소줄 쿼리스트링 동기화
  const { searchFilter, queryString, handleSearch, handleChangePages } =
    useSearchQuery(ADMIN_REPORT_INITIAL_FILTERS);

  // 공통 필터 -> 신고 API 파라미터로 변환
  // -> 날짜: fromDate, toDate -> startDate, endDate
  // -> 상태: pending / ALL / 개별 상태 -> pendingOnly, status
  const apiQueryString = buildQueryString({
    ...searchFilter,
    ...toStatusParams(searchFilter.status),
    startDate: searchFilter.fromDate,
    endDate: searchFilter.toDate,
    fromDate: "",
    toDate: "",
  });

  // 신고 목록 조회 (관리자가 아니면 요청하지 않음)
  const { data, loading, error, refetch } = useLoadData(
    isAdmin ? `/api/admin/reports${apiQueryString}` : null,
  );

  // 처리 상태 탭 변경
  const handleTabChange = (status) => {
    handleSearch({ status });
  };

  if (!isAdmin) {
    return <p role="alert">관리자로 로그인해 주세요.</p>;
  }

  const reports = data?.content ?? [];
  const pager = data?.pager;

  return (
    <main className={styles.page}>
      {/* 회원 관리와 같은 공통 헤더 */}
      <PanelHeader
        title="미처리 신고"
        onRefresh={refetch}
        className={styles.header}
      />

      {/* 공통 검색 필터 (처리 상태 탭 + 신고 기간 + 대상·사유 + 검색) */}
      {/* 검색어: 신고 번호 또는 신고 내용 */}
      <SearchFilterBar
        key={queryString}
        initFilter={ADMIN_REPORT_INITIAL_FILTERS}
        searchFilter={searchFilter}
        tabMenu={{
          tabs: ADMIN_REPORT_STATUS_TABS,
          activeStatus: searchFilter.status,
          onTabChange: handleTabChange,
        }}
        selectGroups={ADMIN_REPORT_SELECT_OPTIONS}
        onSearch={handleSearch}
      />

      {/* 목록 조회 상태 */}
      {loading ? (
        <p role="status">신고 목록을 불러오는 중입니다.</p>
      ) : error ? (
        <div>
          <p className={styles.error} role="alert">
            {error?.message || "신고 목록을 불러오지 못했습니다."}
          </p>
          <Button btnStyle="outline" size="sm" onClick={refetch}>
            다시 시도
          </Button>
        </div>
      ) : reports.length === 0 ? (
        <p className={styles.empty}>조회된 신고가 없습니다.</p>
      ) : (
        <>
          {/* 공통 Card를 이용한 신고 목록 */}
          <section className={styles.grid} aria-label="신고 목록">
            {reports.map((report) => (
              <Card key={report.code} className={styles.card}>
                <div className={styles.badges}>
                  <span>{STATUSES[report.status] ?? report.status}</span>
                  <span>{TARGETS[report.targetType] ?? report.targetType}</span>
                </div>

                <h3>{REASONS[report.reasonType] ?? report.reasonType}</h3>

                <div className={styles.cardMeta}>
                  <span>
                    {TARGETS[report.targetType] ?? report.targetType}
                    {" "}#{report.targetCode}
                  </span>

                  <time dateTime={report.createdAt}>
                    {formatDate(report.createdAt).slice(0, 10)}
                  </time>
                </div>

                <p className={styles.preview}>
                  {report.content || "상세 내용 없음"}
                </p>

                <Button
                  btnStyle="outline"
                  size="sm"
                  onClick={() => setSelectedCode(report.code)}
                >
                  조회
                </Button>
              </Card>
            ))}
          </section>

          {/* 공통 페이지네이션 */}
          {pager && (
            <Pagination pager={pager} onChangePage={handleChangePages} />
          )}
        </>
      )}

      {/* 기존 신고 상세 모달 재사용 (처리 성공 시 목록 다시 조회) */}
      {selectedCode !== null && (
        <ReportDetailModal
          key={selectedCode}
          reportCode={selectedCode}
          onClose={() => setSelectedCode(null)}
          onChanged={refetch}
        />
      )}
    </main>
  );
}