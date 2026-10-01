import styles from "./MarketManage.module.scss";

// status 탭
export const STATUS_TABS = [
  { value: "", label: "전체 상태" },
  { value: "ACTIVE", label: "활성" },
  { value: "PRIVATE", label: "비공개" },
  { value: "BLINDED", label: "블라인드" },
  { value: "REPORTED", label: "신고됨" },
  { value: "DELETED", label: "삭제" },
];

// 활성화 여부 라디오 버튼
export const DELETE_YN_OPTIONS = [
  { value: "", label: "전체" },
  { value: "0", label: "활성화" },
  { value: "1", label: "비활성화" },
];

// SearchBox.jsx 컴포넌트
export const SEARCH_OPTIONS = [
  { code: "", name: "전체 검색" },
  { code: "title", name: "제목" },
  { code: "author", name: "작성자 아이디" },
];

// DataTable도 혹시 몰라서 컴포넌트로 빼 놓음
export const getProductColumns = (navigate) => [
  { header: "상품 코드", accessor: "code" },
  {
    header: "제품",
    accessor: "title",
    render: (item) => (
      <span
        className={styles.clickTitle}
        onClick={() => navigate(`/admin/market_manage/${item.code}`)}
      >
        {item.title}
      </span>
    ),
  },
  {
    header: "가격",
    render: (item) => `${item.price?.toLocaleString() || 0}원`,
  },
  {
    header: "작성자 ID",
    render: (item) => `${item.m_id || item.createdBy || "-"}`,
  },
  { header: "상태", accessor: "status" },
  {
    header: "활성화여부",
    render: (item) =>
      `${item.deleteYn === true || item.deleteYn === "Y" || item.deleteYn === 1 ? "비활성화" : "활성화"}`,
  },
  {
    header: "등록일",
    render: (item) =>
      item.createdAt ? new Date(item.createdAt).toLocaleDateString() : "-",
  },
];

export const INFO_COLUMNS = [
  { header: "항목", accessor: "label" },
  {
    header: "내용",
    accessor: "value",
    render: (row) => {
      if (row.isBold) return <strong>{row.value}</strong>;
      if (row.isDanger) return <span className="danger-text">{row.value}</span>;
      return row.value;
    },
  },
];
