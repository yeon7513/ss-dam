import cn from "classnames";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

import DataTable from "../../../components/common/data-table/DataTable.jsx";
import Pagination from "../../../components/common/pagination/Pagination.jsx";
import SearchBox from "../../../components/common/search-box/SearchBox.jsx";
import TabMenus from "../../../components/common/tab-menus/TabMenus.jsx";
import { useLoadData } from "../../../hooks/useLoadData.js";
import { formatShortDate } from "../../../utils/formatDate.js";

// 상단 요약·목록 박스 스타일은 "내가 작성한 피드"와 공유
import layout from "../activities/Activities.module.scss";
import styles from "./MyChallenges.module.scss";

const PER_PAGE = 10;

// 참여 상태 탭 (CHALLENGE_ENTRY.STATUS)
const STATUS_TABS = [
  { label: "전체", value: "" },
  { label: "참여 중", value: "JOINED" },
  { label: "완료", value: "COMPLETED" },
  { label: "취소", value: "CANCELED" },
];

// 챌린지 진행 상태 (CHALLENGE.PROGRESS_STATUS)
const PROGRESS_LABEL = {
  WAITING: "시작 전",
  IN_PROGRESS: "진행 중",
  ENDED: "종료",
};

// 내 참여 상태 라벨 + 뱃지 색상 클래스
const ENTRY_STATUS = {
  JOINED: { label: "참여 중", className: styles.joined },
  COMPLETED: { label: "완료", className: styles.completed },
  CANCELED: { label: "취소", className: styles.canceled },
};

const formatNumber = (value) => Number(value ?? 0).toLocaleString("ko-KR");

// "2026-06-01" -> "26.06.01"
const shortDay = (value) => (value ? formatShortDate(value) : "-");

// DataTable 컬럼 정의
const MY_CHALLENGE_COLUMNS = [
  {
    header: "참여일",
    accessor: "dateKey",
    // 같은 날짜의 첫 행에만 날짜 표시
    render: (row) =>
      row.isFirstOfDate ? <strong className={layout.date}>{row.dateKey}</strong> : null,
  },
  {
    header: "챌린지명",
    accessor: "title",
    render: (row) => (
      <Link to={`/challenge/${row.chalCode}`} className={layout.title} title={row.title}>
        {row.title}
      </Link>
    ),
  },
  {
    header: "기간",
    accessor: "startDate",
    render: (row) => (
      <span className={styles.period}>
        {shortDay(row.startDate)} ~ {shortDay(row.endDate)}
      </span>
    ),
  },
  {
    header: "진행 상태",
    accessor: "progressStatus",
    render: (row) => PROGRESS_LABEL[row.progressStatus] ?? "-",
  },
  {
    header: "내 상태",
    accessor: "entryStatus",
    render: (row) => {
      const status = ENTRY_STATUS[row.entryStatus];
      return status ? (
        <span className={cn(layout.badge, status.className)}>{status.label}</span>
      ) : (
        "-"
      );
    },
  },
  {
    header: "인증",
    accessor: "proofCount",
    render: (row) => <span className={layout.badge}>{formatNumber(row.proofCount)}회</span>,
  },
  {
    header: "획득 그루",
    accessor: "pointEarned",
    render: (row) => (row.pointEarned > 0 ? `${formatNumber(row.pointEarned)} 그루` : "-"),
  },
];

/* ---------- 마이페이지 - 참여한 챌린지 ---------- */
const MyChallenges = () => {
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState(""); // 참여 상태 탭
  const [searchKeyword, setSearchKeyword] = useState(""); // 적용된 검색어

  // 조회 쿼리스트링
  const query = new URLSearchParams({
    page: String(page),
    perPage: String(PER_PAGE),
  });
  if (status) query.set("status", status);
  if (searchKeyword) query.set("keyword", searchKeyword);

  // 목록 + 요약 조회
  const { data, loading, error } = useLoadData(`/api/mypage/challenges?${query.toString()}`);
  const { data: summary } = useLoadData("/api/mypage/challenges/summary");

  const pager = data?.pager;

  // 참여일 그룹 표시용 값 추가 (참여일 최신순으로 내려옴)
  const rows = useMemo(() => {
    const content = data?.content || [];

    return content.map((item, idx) => {
      const dateKey = formatShortDate(item.joinedAt);
      const prevDateKey = idx > 0 ? formatShortDate(content[idx - 1].joinedAt) : null;

      return { ...item, dateKey, isFirstOfDate: dateKey !== prevDateKey };
    });
  }, [data]);

  /* 탭 변경 */
  const handleChangeTab = (value) => {
    setPage(1);
    setStatus(value);
  };

  /* 검색 (SearchBox는 { [name]: 선택값, keyword } 형태로 넘겨줌) */
  const handleSearch = ({ keyword }) => {
    setPage(1);
    setSearchKeyword((keyword ?? "").trim());
  };

  return (
    <section className={layout.wrap}>
      <h2 className={layout.pageTitle}>참여한 챌린지</h2>

      {/* 상단: 검색 + 요약 */}
      <div className={layout.topBar}>
        <SearchBox
          className={layout.searchBox}
          name="search"
          initKeyword=""
          onSearch={handleSearch}
        />

        <ul className={layout.summary}>
          <li>
            <span>총 참여</span>
            <strong>{formatNumber(summary?.totalCount)}개</strong>
          </li>
          <li>
            <span>참여 중</span>
            <strong>{formatNumber(summary?.joinedCount)}개</strong>
          </li>
          <li>
            <span>완료</span>
            <strong>{formatNumber(summary?.completedCount)}개</strong>
          </li>
          <li>
            <span>획득 그루</span>
            <strong>{formatNumber(summary?.totalPoint)}</strong>
          </li>
        </ul>
      </div>

      {/* 참여 상태 탭 (공통 TabMenus) */}
      <TabMenus
        className={styles.tabs}
        tabs={STATUS_TABS}
        activeStatus={status}
        onTabChange={handleChangeTab}
      />

      {/* 목록 (공통 DataTable) */}
      <div className={layout.board}>
        {loading && <p className={layout.state}>참여한 챌린지를 불러오고 있습니다.</p>}

        {!loading && error && (
          <p className={layout.state}>{error?.message || "챌린지 목록을 불러오지 못했습니다."}</p>
        )}

        {!loading && !error && (
          <DataTable
            className={cn(layout.myPageTable, styles.myChallengeTable)}
            columns={MY_CHALLENGE_COLUMNS}
            data={rows}
            totalCount={pager?.total}
          />
        )}

        {/* 공통 Pagination */}
        {pager && pager.total > 0 && (
          <Pagination pager={pager} onChangePage={setPage} />
        )}
      </div>
    </section>
  );
};

export default MyChallenges;
