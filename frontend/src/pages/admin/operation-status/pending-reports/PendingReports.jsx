// frontend/src/pages/admin/operation-status/pending-reports/PendingReports.jsx

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Button from "../../../../components/common/button/Button";
import Card from "../../../../components/common/card/Card";
import DataTable from "../../../../components/common/data-table/DataTable";
import Pagination from "../../../../components/common/pagination/Pagination";

import {
  formatDate,
  loadReports,
  REASONS,
  STATUSES,
  TARGETS,
} from "../../../../api/adminReport";

import styles from "./PendingReports.module.scss";

// 공통 DataTable에 전달할 열 정의
const COLUMNS = [
  {
    header: "날짜",
    accessor: "createdAt",
    render: (report) => (
      <time
        dateTime={report.createdAt}
        title={formatDate(report.createdAt)}
      >
        {formatDate(report.createdAt).slice(0, 10)}
      </time>
    ),
  },
  {
    header: "신고 대상",
    accessor: "targetType",
    render: (report) => (
      <span>
        {TARGETS[report.targetType] ?? report.targetType}
        {" "}#{report.targetCode}
      </span>
    ),
  },
  {
    header: "사유",
    accessor: "reasonType",
    render: (report) => (
      <span
        className={styles.ellipsis}
        title={REASONS[report.reasonType] ?? report.reasonType}
      >
        {REASONS[report.reasonType] ?? report.reasonType}
      </span>
    ),
  },
  {
    header: "설명",
    accessor: "content",
    render: (report) => (
      <span
        className={styles.ellipsis}
        title={report.content || "상세 내용 없음"}
      >
        {report.content || "상세 내용 없음"}
      </span>
    ),
  },
  {
    header: "상태",
    accessor: "status",
    render: (report) => (
      <span className={styles.badge}>
        {STATUSES[report.status] ?? report.status}
      </span>
    ),
  },
];

export default function PendingReports({ refreshKey = 0 }) {
  const [page, setPage] = useState(1);
  const [retry, setRetry] = useState(0);

  // 응답이 어느 요청의 결과인지 함께 저장
  const [response, setResponse] = useState({
    key: null,
    data: null,
    error: "",
  });

  const requestKey = `${page}:${refreshKey}:${retry}`;

  // 현재 요청의 응답이 도착하기 전까지 로딩
  // useEffect에서 setLoading을 바로 호출할 필요 없음
  const loading = response.key !== requestKey;
  const error = loading ? "" : response.error;

  useEffect(() => {
    const controller = new AbortController();

    loadReports(
      {
        pendingOnly: true,
        page,
        perPage: 5,
        perGroup: 5,
      },
      controller.signal,
    )
      .then((data) => {
        if (controller.signal.aborted) return;

        // 처리로 신고 수가 줄어든 경우 페이지 보정
        const lastPage = Math.max(1, data?.pager?.last ?? 1);

        if (page > lastPage) {
          setPage(lastPage);
          return;
        }

        setResponse({
          key: requestKey,
          data,
          error: "",
        });
      })
      .catch((err) => {
        if (controller.signal.aborted) return;

        setResponse({
          key: requestKey,
          data: null,
          error: err.message || "미처리 신고를 불러오지 못했습니다.",
        });
      });

    return () => controller.abort();
  }, [page, requestKey]);

  function changePage(nextPage) {
    if (loading || nextPage === page) return;
    setPage(nextPage);
  }

  const reports = response.data?.content ?? [];
  const pager = response.data?.pager;

  return (
    <Card className={styles.reportCard}>
      {/* 카드 헤더 영역 */}
      <div className={styles.cardHeader}>
        <h3>
          <Link to="/admin/reports">
            미처리 신고 ↗
          </Link>
        </h3>

        {!loading && !error && (
          <span className={styles.total}>
            총 {pager?.total ?? 0}건
          </span>
        )}
      </div>

      {/* 신고 테이블 영역 */}
      <div className={styles.tableWrapper}>
        {loading ? (
          <p className={styles.message} role="status">
            신고 목록을 불러오는 중입니다.
          </p>
        ) : error ? (
          <div className={styles.message}>
            <p className={styles.error} role="alert">
              {error}
            </p>

            <Button
              btnStyle="outline"
              size="sm"
              onClick={() => setRetry((value) => value + 1)}
            >
              다시 시도
            </Button>
          </div>
        ) : reports.length === 0 ? (
          <p className={styles.message}>
            미처리 신고가 없습니다.
          </p>
        ) : (
          <DataTable
            columns={COLUMNS}
            data={reports}
            className={styles.reportTable}
          />
        )}
      </div>

      {/* 공통 페이지네이션 */}
      {!loading && !error && reports.length > 0 && (
        <div className={styles.paginationArea}>
          <Pagination
            pager={pager}
            onChangePage={changePage}
          />
        </div>
      )}
    </Card>
  );
}