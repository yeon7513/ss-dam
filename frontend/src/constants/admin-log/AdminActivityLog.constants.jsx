import { getProcessLabel } from "../../lib/adminActivityLog";
import styles from "../../pages/admin/activity-log/AdminActivityLogs.module.scss";

// 검색용 초기 쿼리 및 필터 기본값
// -> fromDate, toDate는 SearchFilterBar 공통 이름 (API 전송 시 from, to로 변환)
export const ADMIN_LOG_INITIAL_FILTERS = {
  page: 1,
  perPage: 10,
  targetType: "",
  fromDate: "",
  toDate: "",
  processType: "",
  keyword: "",
};

// 활동 유형 탭
export const ADMIN_LOG_TABS = [
  { value: "", label: "전체" },
  { value: "report", label: "신고 처리" },
  { value: "member", label: "회원" },
  { value: "feed", label: "피드" },
  { value: "challenge", label: "챌린지" },
  { value: "market", label: "마켓" },
  { value: "admin", label: "관리자 계정" },
];

// 유형 코드 -> 한글 이름
export const ADMIN_LOG_TARGET_LABELS = Object.fromEntries(
  ADMIN_LOG_TABS.filter((tab) => tab.value).map((tab) => [tab.value, tab.label]),
);

// 유형별 처리 코드
export const ADMIN_LOG_PROCESS_TYPES_BY_TARGET = {
  report: ["REVIEW", "PROCESS", "RESOLVE", "REJECT", "CANCEL", "RESTORE"],
  member: [
    "RESTRICT",
    "RELEASE",
    "WARNING",
    "WARNING_CANCEL",
    "WARNING_RESTORE",
    "SUSPEND",
    "SUSPEND_CANCEL",
    "SUSPEND_RESTORE",
    "WITHDRAW",
    "WITHDRAW_CANCEL",
    "WITHDRAW_RESTORE",
  ],
  feed: ["DELETE", "RESTORE"],
  challenge: ["CREATE", "UPDATE", "DELETE", "RESTORE", "EARLY_END"],
  market: ["DELETE", "RESTORE"],
  admin: [],
};

// 처리 유형 셀렉트 옵션
// -> 개별 탭: 해당 유형의 처리만 ("DELETE")
// -> 전체 탭: 유형과 처리를 묶어서 ("feed:DELETE")
export const getProcessOptions = (targetType) => {
  if (targetType) {
    return (ADMIN_LOG_PROCESS_TYPES_BY_TARGET[targetType] ?? []).map((code) => ({
      code,
      name: getProcessLabel(targetType, code),
    }));
  }

  return Object.entries(ADMIN_LOG_PROCESS_TYPES_BY_TARGET).flatMap(([type, codes]) =>
    codes.map((code) => ({
      code: `${type}:${code}`,
      name: `[${ADMIN_LOG_TARGET_LABELS[type]}] ${getProcessLabel(type, code)}`,
    })),
  );
};

// 처리 유형 셀렉트 (options는 탭에 따라 페이지에서 채움)
export const ADMIN_LOG_PROCESS_SELECT = {
  label: "처리 유형",
  name: "processType",
};

// 서버 날짜를 브라우저 시간대로 변환하지 않고 표시
const formatDateTime = (value) =>
  value ? String(value).replace("T", " ").slice(0, 19) : "-";

// 활동 로그 테이블 컬럼 (DataTable)
export const ADMIN_LOG_COLUMNS = [
  {
    header: "날짜",
    accessor: "createdAt",
    render: (log) => <span className={styles.date}>{formatDateTime(log.createdAt)}</span>,
  },
  {
    header: "유형",
    accessor: "targetType",
    render: (log) => ADMIN_LOG_TARGET_LABELS[log.targetType] ?? log.targetType,
  },
  {
    header: "처리",
    accessor: "processType",
    render: (log) => (
      <span className={styles.badge}>
        {getProcessLabel(log.targetType, log.processType)}
      </span>
    ),
  },
  {
    header: "로그",
    accessor: "memo",
    render: (log) => (
      <div className={styles.memo}>
        <p>{log.memo || "-"}</p>
        <small>
          대상 #{log.targetCode} · 로그 #{log.code}
        </small>
      </div>
    ),
  },
  {
    header: "관리자",
    accessor: "empId",
    render: (log) => (
      <div className={styles.admin}>
        <strong>{log.adminName || log.empId || "-"}</strong>
        <small>{log.adminDept || "-"}</small>
        {log.empId && <small>{log.empId}</small>}
      </div>
    ),
  },
  {
    header: "관련 신고",
    accessor: "reportCode",
    render: (log) => (log.reportCode != null ? `#${log.reportCode}` : "-"),
  },
];
