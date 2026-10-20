import { useState } from "react";

import DataTable from "../../../components/common/data-table/DataTable.jsx";
import Modal from "../../../components/common/modal/Modal.jsx";
import Pagination from "../../../components/common/pagination/Pagination.jsx";
import SearchBox from "../../../components/common/search-box/SearchBox.jsx";
import { useLoadData } from "../../../hooks/useLoadData.js";
import FeedDetail from "../../feed/feed-detail/FeedDetail.jsx";

import layout from "../activities/Activities.module.scss";
import styles from "./MyComments.module.scss";

// "2026-10-20 12:30:00" → "26.10.20"
const shortDate = (value) =>
  value ? String(value).slice(2, 10).replaceAll("-", ".") : "-";

// DataTable 컬럼 정의
const getCommentColumns = (onOpenDetail) => [
  {
    header: "작성일",
    accessor: "createdAt",
    render: (row) => (
      <strong className={layout.date}>
        {shortDate(row.createdAt)}
      </strong>
    ),
  },
  {
    header: "내가 쓴 댓글",
    accessor: "content",
    render: (row) => (
      <span className={styles.commentContent}>
        {row.content}
      </span>
    ),
  },
  {
    header: "원문 피드",
    accessor: "feedTitle",
    render: (row) => (
      <button
        type="button"
        className={`${layout.title} ${styles.feedTitle}`}
        title={row.feedTitle}
        onClick={() => onOpenDetail(row.feedCode)}
      >
        {row.feedTitle}
      </button>
    ),
  },
];

/* ---------- 마이페이지 - 댓글 모아보기 ---------- */
export default function MyComments() {
  const [page, setPage] = useState(1);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [selectedFeedCode, setSelectedFeedCode] = useState(null);

  // 조회 쿼리스트링
  const query = new URLSearchParams({
    page: String(page),
    perPage: "10",
  });

  if (searchKeyword) {
    query.set("keyword", searchKeyword);
  }

  const { data, loading, error, refetch } = useLoadData(
    `/api/mypage/comments?${query.toString()}`,
  );

  const pager = data?.pager;
  const rows = data?.content ?? [];
  const columns = getCommentColumns(setSelectedFeedCode);

  // 검색하면 첫 페이지로 이동
  const handleSearch = ({ keyword }) => {
    setPage(1);
    setSearchKeyword((keyword ?? "").trim());
  };

  // 상세 모달에서 댓글이 변경되었을 수 있으므로 목록 갱신
  const handleCloseDetail = () => {
    setSelectedFeedCode(null);
    refetch();
  };

  return (
    <section className={layout.wrap}>
      <h2 className={layout.pageTitle}>댓글 모아보기</h2>

      {/* 검색 */}
      <div className={layout.topBar}>
        <SearchBox
          className={layout.searchBox}
          name="search"
          initKeyword=""
          onSearch={handleSearch}
        />
      </div>

      {/* 목록 (공통 DataTable) */}
      <div className={layout.board}>
        {loading ? (
          <p className={layout.state} role="status">
            댓글을 불러오는 중입니다.
          </p>
        ) : error ? (
          <p className={layout.state} role="alert">
            댓글을 불러오지 못했습니다.
          </p>
        ) : (
          <>
            <DataTable
              className={`${layout.myPageTable} ${styles.commentTable}`}
              columns={columns}
              data={rows}
              totalCount={pager?.total ?? 0}
            />

            {/* 공통 Pagination */}
            {pager && pager.total > 0 && (
              <Pagination
                pager={pager}
                onChangePage={setPage}
              />
            )}
          </>
        )}
      </div>

      {/* 기존 피드 상세 모달 재사용 */}
      <Modal
        isOpen={selectedFeedCode !== null}
        onClose={handleCloseDetail}
      >
        {selectedFeedCode !== null && (
          <FeedDetail
            code={selectedFeedCode}
            onClose={handleCloseDetail}
          />
        )}
      </Modal>
    </section>
  );
}
