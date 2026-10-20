import { useState } from "react";
import { Link } from "react-router-dom";
import DataTable from "../../../components/common/data-table/DataTable.jsx";
import Pagination from "../../../components/common/pagination/Pagination.jsx";
import SearchBox from "../../../components/common/search-box/SearchBox.jsx";
import { useLoadData } from "../../../hooks/useLoadData.js";
import layout from "../activities/Activities.module.scss";
import styles from "../deal/Deal.module.scss";

const number = (value) => Number(value ?? 0).toLocaleString("ko-KR");
const date = (value) => value ? String(value).slice(2, 10).replaceAll("-", ".") : "-";

const columns = [
  { header: "구매일", accessor: "purchasedAt", render: (row) => row.firstOfDate
    ? <strong className={layout.date}>{date(row.purchasedAt)}</strong> : null },
  { header: "제목", accessor: "title", render: (row) => (
    <Link className={layout.title} to={`/market/${row.code}`} title={row.title}>{row.title}</Link>
  ) },
  { header: "금액", accessor: "price", render: (row) => `${number(row.price)}그루` },
  { header: "구매현황", accessor: "dealStatus", render: (row) => (
    <span className={`${layout.badge} ${row.dealStatus === "SOLD" ? styles.sold : ""}`}>
      {row.dealStatus === "SOLD" ? "구매완료" : "구매중"}
    </span>
  ) },
  { header: "채팅", accessor: "roomId", render: (row) => row.roomId ? (
    <Link className={layout.commentLink} to={`/chat?roomId=${encodeURIComponent(row.roomId)}`}>
      채팅방 보기
    </Link>
  ) : <span>-</span> },
  { header: "PICK", accessor: "countPick", render: (row) => (
    <span className={layout.badge}>{number(row.countPick)}회</span>
  ) },
];

/* ---------- 마이페이지 - 구매 내역 (판매 관리 공통 스타일 재사용) ---------- */
export default function Purchases() {
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState("");
  const query = new URLSearchParams({ page, perPage: 10, keyword });
  const { data, loading, error } = useLoadData(`/api/mypage/purchases?${query}`);
  const { data: summary, loading: summaryLoading, error: summaryError } =
    useLoadData("/api/mypage/purchases/summary");

  // 같은 날짜의 첫 행에만 구매일 표시
  const rows = (data?.content ?? []).map((row, index, content) => ({
    ...row,
    firstOfDate: index === 0 || date(row.purchasedAt) !== date(content[index - 1].purchasedAt),
  }));
  const summaryValue = (value) => summaryLoading || summaryError ? "-" : number(value);

  return (
    <section className={layout.wrap}>
      <h2 className={layout.pageTitle}>구매 내역</h2>

      {/* 검색 + 전체 구매 요약 (검색어와 무관) */}
      <div className={layout.topBar}>
        <SearchBox className={layout.searchBox} name="search" initKeyword=""
          onSearch={({ keyword: value }) => { setPage(1); setKeyword((value ?? "").trim()); }} />
        <ul className={layout.summary}>
          <li><span>구매 등록 건수</span><strong>{summaryValue(summary?.totalProducts)}개</strong></li>
          <li><span>총 구매 금액</span><strong title="구매완료 건 기준">{summaryValue(summary?.totalAmount)}그루</strong></li>
          <li><span>다시쓰담 활동 (판매+구매)</span><strong title="판매·구매 완료 건수">{summaryValue(summary?.totalActivity)}회</strong></li>
        </ul>
      </div>

      {/* 공통 표 + 페이지네이션 */}
      <div className={layout.board}>
        {loading ? <p className={layout.state} role="status">구매 내역을 불러오고 있습니다.</p>
          : error ? <p className={layout.state} role="alert">{error.message || "구매 내역을 불러오지 못했습니다."}</p>
            : <DataTable className={`${layout.myPageTable} ${styles.table}`} columns={columns} data={rows} totalCount={data?.pager?.total} />}
        {!loading && !error && data?.pager?.total > 0 && (
          <Pagination pager={data.pager} onChangePage={setPage} />
        )}
      </div>
    </section>
  );
}
