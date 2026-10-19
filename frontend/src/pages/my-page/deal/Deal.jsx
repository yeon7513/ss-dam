import { useState } from "react";
import { Link } from "react-router-dom";
import DataTable from "../../../components/common/data-table/DataTable.jsx";
import Pagination from "../../../components/common/pagination/Pagination.jsx";
import SearchBox from "../../../components/common/search-box/SearchBox.jsx";
import { useLoadData } from "../../../hooks/useLoadData.js";
import layout from "../activities/Activities.module.scss";
import styles from "./Deal.module.scss";

const number = (value) => Number(value ?? 0).toLocaleString("ko-KR");
const date = (value) => value ? String(value).slice(2, 10).replaceAll("-", ".") : "-";
const statusLabels = { ON_SALE: "판매중", IN_PROGRESS: "예약중", SOLD: "판매완료", SUSPENDED: "판매중지" };

const columns = [
  { header: "등록일", accessor: "createdAt", render: (row) => row.firstOfDate
    ? <strong className={layout.date}>{date(row.createdAt)}</strong> : null },
  { header: "제목", accessor: "title", render: (row) => (
    <Link className={layout.title} to={`/market/${row.code}`} title={row.title}>{row.title}</Link>
  ) },
  { header: "금액", accessor: "price", render: (row) => `${number(row.price)}그루` },
  { header: "판매현황", accessor: "dealStatus", render: (row) => (
    <span className={`${layout.badge} ${row.dealStatus === "SOLD" ? styles.sold : ""}`}>
      {statusLabels[row.dealStatus] ?? row.dealStatus}
    </span>
  ) },
  { header: "채팅", accessor: "countChatRoom", render: (row) => row.countChatRoom > 0 ? (
    <Link className={layout.commentLink} to="/chat" title="내 채팅방 목록 열기">
      채팅방 보기 <i className={layout.commentCount}>{number(row.countChatRoom)}</i>
    </Link>
  ) : <span>-</span> },
  { header: "PICK", accessor: "countPick", render: (row) => <span className={layout.badge}>{number(row.countPick)}회</span> },
];

export default function Deal() {
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState("");
  const query = new URLSearchParams({ page, perPage: 10, keyword });
  const { data, loading, error } = useLoadData(`/api/mypage/sales?${query}`);
  const { data: summary, error: summaryError } = useLoadData("/api/mypage/sales/summary");
  const rows = (data?.content ?? []).map((row, index, content) => ({
    ...row, firstOfDate: index === 0 || date(row.createdAt) !== date(content[index - 1].createdAt),
  }));

  return (
    <section className={layout.wrap}>
      <h2 className={layout.pageTitle}>판매 관리</h2>
      <div className={layout.topBar}>
        <SearchBox className={layout.searchBox} name="search" initKeyword=""
          onSearch={({ keyword: value }) => { setPage(1); setKeyword((value ?? "").trim()); }} />
        <ul className={layout.summary}>
          <li><span>판매 등록 건수</span><strong>{summaryError ? "-" : number(summary?.totalProducts)}개</strong></li>
          <li><span>총 판매 금액</span><strong>{summaryError ? "-" : number(summary?.totalAmount)}그루</strong></li>
          <li><span>다시쓰담 활동 (판매 채팅)</span><strong>{summaryError ? "-" : number(summary?.totalChats)}회</strong></li>
        </ul>
      </div>
      <div className={layout.board}>
        {loading ? <p className={layout.state} role="status">판매 목록을 불러오고 있습니다.</p>
          : error ? <p className={layout.state} role="alert">{error.message || "판매 목록을 불러오지 못했습니다."}</p>
            : <DataTable className={`${layout.myPageTable} ${styles.table}`} columns={columns} data={rows} totalCount={data?.pager?.total} />}
        {!loading && !error && data?.pager?.total > 0 && (
          <Pagination pager={data.pager} onChangePage={setPage} />
        )}
      </div>
    </section>
  );
}
