// frontend/src/pages/admin/reports/AdminReports.jsx

import { useEffect, useState } from "react";

import {
  formatDate,
  loadReports,
  REASONS,
  STATUSES,
  TARGETS,
} from "../../../api/adminReport";

import { useAuth } from "../../../context/AuthContext";

import Button from "../../../components/common/button/Button";
import Card from "../../../components/common/card/Card";
import Pagination from "../../../components/common/pagination/Pagination";

import PanelHeader from "../../../layout/admin/panel-header/PanelHeader";

import AdminReportFilters from "./AdminReportFilters";
import styles from "./AdminReports.module.scss";
import ReportDetailModal from "./ReportDetailModal";

const INITIAL_FILTER = {
  date: "",
  status: "pending",
  targetType: "",
  reasonType: "",
  keyword: "",
};

export default function AdminReports() {
  const { user } = useAuth();

  // 입력 중인 검색 조건
  const [draft, setDraft] = useState(INITIAL_FILTER);

  // 실제 조회에 적용한 검색 조건
  const [filter, setFilter] = useState(INITIAL_FILTER);

  const [page, setPage] = useState(1);
  const [version, setVersion] = useState(0);

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [selectedCode, setSelectedCode] = useState(null);

  const isAdmin = [
    "ROLE_SUPER",
    "ROLE_MANAGER",
    "ROLE_STAFF",
  ].includes(user?.role);

  // 관리자 신고 목록 조회
  useEffect(() => {
    if (!isAdmin) return;

    const controller = new AbortController();
    let movingToLastPage = false;

    const params = {
      page,
      perPage: 12,
      perGroup: 5,
      targetType: filter.targetType,
      reasonType: filter.reasonType,
      keyword: filter.keyword.trim(),
      startDate: filter.date,
      endDate: filter.date,
    };

    // 미처리 조건과 특정 상태 조건은 동시에 보내지 않음
    // 빈 문자열은 전체 상태 조회
    if (filter.status === "pending") {
      params.pendingOnly = true;
    } else if (filter.status) {
      params.status = filter.status;
    }

    loadReports(params, controller.signal)
      .then((data) => {
        if (controller.signal.aborted) return;

        // 신고 처리 후 마지막 페이지가 비면 페이지 보정
        const lastPage = Math.max(1, data?.pager?.last ?? 1);

        if (page > lastPage) {
          movingToLastPage = true;
          setPage(lastPage);
          return;
        }

        setResult(data);
        setError("");
      })
      .catch((err) => {
        if (controller.signal.aborted) return;

        setError(
          err.message || "신고 목록을 불러오지 못했습니다.",
        );
      })
      .finally(() => {
        // 페이지 보정 중에는 다음 조회까지 로딩 유지
        if (!controller.signal.aborted && !movingToLastPage) {
          setLoading(false);
        }
      });

    return () => controller.abort();
  }, [filter, page, version, isAdmin]);

  // 필터 입력값 변경
  function changeFilter(event) {
    const { name, value } = event.target;

    setDraft((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  // 검색 조건 적용
  function search(event) {
    event.preventDefault();

    setLoading(true);
    setError("");
    setPage(1);
    setFilter({ ...draft });
  }

  // 목록 새로고침
  // 모달에서 신고 처리에 성공한 경우에도 호출
  function refreshList() {
    setLoading(true);
    setError("");
    setVersion((value) => value + 1);
  }

  // 공통 Pagination에서 호출
  function changePage(nextPage) {
    if (nextPage === page || loading) return;

    setLoading(true);
    setError("");
    setPage(nextPage);
  }

  if (!isAdmin) {
    return <p role="alert">관리자로 로그인해 주세요.</p>;
  }

  const reports = result?.content ?? [];
  const pager = result?.pager;

  return (
    <main className={styles.page}>
      {/* 회원 관리와 같은 공통 헤더 */}
      <PanelHeader
        title="미처리 신고"
        onRefresh={refreshList}
        className={styles.header}
      />


      {/* 신고 검색 필터 */}
      <AdminReportFilters
        filters={draft}
        onChange={changeFilter}
        onSearch={search}
        loading={loading}
      />

      {/* 오류 메시지 */}
      {error && (
        <p className={styles.error} role="alert">
          {error}
        </p>
      )}

      {/* 목록 조회 상태 */}
      {loading ? (
        <p role="status">신고 목록을 불러오는 중입니다.</p>
      ) : error ? (
        <Button
          btnStyle="outline"
          size="sm"
          onClick={refreshList}
        >
          다시 시도
        </Button>
      ) : reports.length === 0 ? (
        <p className={styles.empty}>
          조회된 신고가 없습니다.
        </p>
      ) : (
        <>
          {/* 공통 Card를 이용한 신고 목록 */}
          <section
            className={styles.grid}
            aria-label="신고 목록"
          >
            {reports.map((report) => (
              <Card
                key={report.code}
                className={styles.card}
              >
                <div className={styles.badges}>
                  <span>
                    {STATUSES[report.status] ?? report.status}
                  </span>
                  <span>
                    {TARGETS[report.targetType] ?? report.targetType}
                  </span>
                </div>

                <h3>
                  {REASONS[report.reasonType] ?? report.reasonType}
                </h3>

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
          <Pagination
            pager={pager}
            onChangePage={changePage}
            disabled={loading}
          />
        </>
      )}

      {/* 기존 신고 상세 모달 재사용 */}
      {selectedCode !== null && (
        <ReportDetailModal
          key={selectedCode}
          reportCode={selectedCode}
          onClose={() => setSelectedCode(null)}
          onChanged={refreshList}
        />
      )}
    </main>
  );
}