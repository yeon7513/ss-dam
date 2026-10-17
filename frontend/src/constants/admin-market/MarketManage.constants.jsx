import styles from "../../pages/admin/market/MarketManage.module.scss";

// 검색용 초기 쿼리 및 필터 기본값
export const ADMIN_MARKET_INITIAL_FILTERS = {
  page: 1,
  perPage: 10,
  status: "",
  deleteYn: "",
  fromDate: "",
  toDate: "",
  cateCode: "",
  dealStatus: "",
  region: "",
  keyword: "",
};

// 노출 상태 탭
export const ADMIN_MARKET_STATUS_TABS = [
  { value: "", label: "전체 상태" },
  { value: "ACTIVE", label: "활성" },
  { value: "PRIVATE", label: "비공개" },
  { value: "BLINDED", label: "블라인드" },
  { value: "REPORTED", label: "신고됨" },
  { value: "DELETED", label: "삭제" },
];

// 거래 상태 (백엔드 DealStatus enum)
export const ADMIN_MARKET_DEAL_STATUS_OPTIONS = [
  { code: "ON_SALE", name: "판매중" },
  { code: "IN_PROGRESS", name: "예약중" },
  { code: "SOLD", name: "판매완료" },
  { code: "SUSPENDED", name: "판매중지" },
];

// 지역 (작성자 주소 기준)
export const ADMIN_MARKET_REGION_OPTIONS = [
  { code: "서울", name: "서울특별시" },
  { code: "부산", name: "부산광역시" },
  { code: "대구", name: "대구광역시" },
  { code: "인천", name: "인천광역시" },
  { code: "광주", name: "광주광역시" },
  { code: "대전", name: "대전광역시" },
  { code: "울산", name: "울산광역시" },
  { code: "세종", name: "세종특별자치시" },
  { code: "경기", name: "경기도" },
  { code: "강원", name: "강원특별자치도" },
  { code: "충북", name: "충청북도" },
  { code: "충남", name: "충청남도" },
  { code: "전북", name: "전북특별자치도" },
  { code: "전남", name: "전라남도" },
  { code: "경북", name: "경상북도" },
  { code: "경남", name: "경상남도" },
  { code: "제주", name: "제주특별자치도" },
];

// 마켓 카테고리 셀렉트 (options는 API 응답으로 페이지에서 채움)
export const ADMIN_MARKET_CATEGORY_SELECT = {
  label: "마켓 카테고리",
  name: "cateCode",
};

// 거래 상태 · 지역 셀렉트 (카테고리 뒤에 붙음)
export const ADMIN_MARKET_SELECT_OPTIONS = [
  {
    label: "거래 상태",
    name: "dealStatus",
    options: ADMIN_MARKET_DEAL_STATUS_OPTIONS,
  },
  {
    label: "지역",
    name: "region",
    options: ADMIN_MARKET_REGION_OPTIONS,
  },
];

// 활성화 여부 (박스형 라디오 - 관리자 계정 관리와 동일)
export const ADMIN_MARKET_DELETE_YN = [
  {
    label: "활성화 여부",
    name: "deleteYn",
    options: [
      { code: "", name: "전체" },
      { code: "0", name: "활성화" },
      { code: "1", name: "비활성" },
    ],
  },
];

// 상품 목록 테이블 컬럼 (DataTable)
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
    header: "카테고리",
    render: (item) =>
      [item.mainCategoryName, item.subCategoryName].filter(Boolean).join(" > ") || "-",
  },
  {
    header: "가격",
    render: (item) => `${item.price?.toLocaleString() || 0}원`,
  },
  {
    header: "작성자 ID",
    render: (item) => `${item.memberProfile?.id || item.createdBy || "-"}`,
  },
  {
    header: "거래 상태",
    render: (item) =>
      ADMIN_MARKET_DEAL_STATUS_OPTIONS.find((opt) => opt.code === item.dealStatus)?.name
      ?? item.dealStatus ?? "-",
  },
  { header: "노출 상태", accessor: "status" },
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

// 상품 상세 정보 테이블 컬럼 (MarketManageDetail.jsx)
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