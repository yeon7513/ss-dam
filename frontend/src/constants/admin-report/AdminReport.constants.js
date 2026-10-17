import { REASONS, STATUSES, TARGETS } from "../../api/adminReport";

// { CODE: "이름" } -> [{ code, name }]
const toOptions = (values) =>
  Object.entries(values).map(([code, name]) => ({ code, name }));

// 검색용 초기 쿼리 및 필터 기본값
// -> status: "pending"(미처리) 기본, "ALL"이면 전체 상태
// -> fromDate, toDate는 SearchFilterBar 공통 이름 (API 전송 시 startDate, endDate로 변환)
export const ADMIN_REPORT_INITIAL_FILTERS = {
  page: 1,
  perPage: 12,
  status: "pending",
  fromDate: "",
  toDate: "",
  targetType: "",
  reasonType: "",
  keyword: "",
};

// 처리 상태 탭
export const ADMIN_REPORT_STATUS_TABS = [
  { value: "pending", label: "미처리" },
  { value: "ALL", label: "전체" },
  ...Object.entries(STATUSES).map(([value, label]) => ({ value, label })),
];

// 신고 대상 · 신고 사유 셀렉트
export const ADMIN_REPORT_SELECT_OPTIONS = [
  {
    label: "신고 대상",
    name: "targetType",
    options: toOptions(TARGETS),
  },
  {
    label: "신고 사유",
    name: "reasonType",
    options: toOptions(REASONS),
  },
];

// 처리 상태 탭 값 -> API 파라미터
// -> pending: pendingOnly=true / ALL: 조건 없음 / 그 외: status=값
export const toStatusParams = (status) => {
  if (status === "pending") return { pendingOnly: true, status: "" };
  if (!status || status === "ALL") return { pendingOnly: "", status: "" };
  return { pendingOnly: "", status };
};