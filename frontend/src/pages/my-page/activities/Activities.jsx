import { useMemo, useState } from "react";

import DataTable from "../../../components/common/data-table/DataTable.jsx";
import Modal from "../../../components/common/modal/Modal.jsx";
import Pagination from "../../../components/common/pagination/Pagination.jsx";
import SearchBox from "../../../components/common/search-box/SearchBox.jsx";
import { useLoadData } from "../../../hooks/useLoadData.js";
import FeedDetail from "../../feed/feed-detail/FeedDetail.jsx";

import styles from "./Activities.module.scss";

const PER_PAGE = 10;

// "2026-04-07 12:30:00" -> "26.04.07"
const toDateKey = (createdAt) => {
  if (!createdAt) return "-";

  const date = new Date(String(createdAt).replace(" ", "T"));
  if (Number.isNaN(date.getTime())) {
    return String(createdAt).slice(2, 10).replaceAll("-", ".");
  }

  const yy = String(date.getFullYear()).slice(2);
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  return `${yy}.${mm}.${dd}`;
};

const formatNumber = (value) => Number(value ?? 0).toLocaleString("ko-KR");

// DataTable 컬럼 정의 (상세 모달 열기 함수를 받아서 생성)
const getMyFeedColumns = (onOpenDetail) => [
  {
    header: "작성일",
    accessor: "dateKey",
    // 같은 날짜의 첫 행에만 날짜 표시 -> 날짜별로 묶인 것처럼 보이게
    render: (row) =>
      row.isFirstOfDate ? <strong className={styles.date}>{row.dateKey}</strong> : null,
  },
  {
    header: "제목",
    accessor: "title",
    render: (row) => (
      <button
        type="button"
        className={styles.title}
        title={row.title}
        onClick={() => onOpenDetail(row.code)}
      >
        {row.title}
      </button>
    ),
  },
  {
    header: "챌린지",
    accessor: "challengeName",
    render: (row) => <strong>{row.challengeName}</strong>,
  },
  {
    header: "조회수",
    accessor: "hitcount",
    render: (row) => <span className={styles.badge}>{formatNumber(row.hitcount)}회</span>,
  },
  {
    header: "댓글",
    accessor: "countFeedComment",
    render: (row) => (
      <button
        type="button"
        className={styles.commentLink}
        onClick={() => onOpenDetail(row.code)}
      >
        댓글보러가기
        {row.countFeedComment > 0 && (
          <i className={styles.commentCount}>{row.countFeedComment}</i>
        )}
      </button>
    ),
  },
  {
    header: "좋아요",
    accessor: "countFeedLike",
    render: (row) => <span className={styles.badge}>{formatNumber(row.countFeedLike)}회</span>,
  },
];

/* ---------- 마이페이지 - 내가 작성한 피드 ---------- */
const Activities = () => {
  const [page, setPage] = useState(1);
  const [searchKeyword, setSearchKeyword] = useState(""); // 적용된 검색어
  const [selectedFeedCode, setSelectedFeedCode] = useState(null); // 모달로 열 피드

  // 조회 쿼리스트링
  const query = new URLSearchParams({
    myFeedsOnly: "true",
    page: String(page),
    perPage: String(PER_PAGE),
  });
  if (searchKeyword) query.set("keyword", searchKeyword);

  // 내 피드 목록 + 요약 조회
  const { data, loading, error, refetch } = useLoadData(`/api/feeds?${query.toString()}`);
  const { data: summary, refetch: refetchSummary } = useLoadData("/api/feeds/my/summary");

  const pager = data?.pager;
  const columns = getMyFeedColumns(setSelectedFeedCode);

  // 날짜 표시용 값 추가 (최신순으로 내려오므로 직전 행과 날짜가 다르면 첫 행)
  const rows = useMemo(() => {
    const content = data?.content || [];

    return content.map((feed, idx) => {
      const dateKey = toDateKey(feed.createdAt);
      const prevDateKey = idx > 0 ? toDateKey(content[idx - 1].createdAt) : null;

      return { ...feed, dateKey, isFirstOfDate: dateKey !== prevDateKey };
    });
  }, [data]);

  /* 검색 처리 (SearchBox는 { [name]: 선택값, keyword } 형태로 넘겨줌) */
  const handleSearch = ({ keyword }) => {
    setPage(1);
    setSearchKeyword((keyword ?? "").trim());
  };

  /* 모달 닫기 -> 조회수·댓글 수가 바뀌었을 수 있으니 다시 조회 */
  const handleCloseDetail = () => {
    setSelectedFeedCode(null);
    refetch();
    refetchSummary();
  };

  return (
    <section className={styles.wrap}>
      <h2 className={styles.pageTitle}>내가 작성한 피드</h2>

      {/* 상단: 검색 + 요약 */}
      <div className={styles.topBar}>
        <SearchBox
          className={styles.searchBox}
          name="search"
          initKeyword=""
          onSearch={handleSearch}
        />

        <ul className={styles.summary}>
          <li>
            <span>총 등록 건수</span>
            <strong>{formatNumber(summary?.totalFeeds)}개</strong>
          </li>
          <li>
            <span>총 좋아요 개수</span>
            <strong>{formatNumber(summary?.totalLikes)}회</strong>
          </li>
          <li>
            <span>총 조회수</span>
            <strong>{formatNumber(summary?.totalHits)}회</strong>
          </li>
        </ul>
      </div>

      {/* 목록 (공통 DataTable) */}
      <div className={styles.board}>
        {loading && <p className={styles.state}>피드를 불러오고 있습니다.</p>}

        {!loading && error && (
          <p className={styles.state}>{error?.message || "피드를 불러오지 못했습니다."}</p>
        )}

        {!loading && !error && (
          <DataTable
            className={styles.myFeedTable}
            columns={columns}
            data={rows}
            totalCount={pager?.total}
          />
        )}

        {/* 공통 Pagination */}
        {pager && pager.total > 0 && (
          <Pagination pager={pager} onChangePage={setPage} />
        )}
      </div>

      {/* 피드 상세 모달 (피드 페이지와 동일한 컴포넌트 재사용) */}
      <Modal isOpen={selectedFeedCode !== null} onClose={handleCloseDetail}>
        {selectedFeedCode && (
          <FeedDetail code={selectedFeedCode} onClose={handleCloseDetail} />
        )}
      </Modal>
    </section>
  );
};

export default Activities;