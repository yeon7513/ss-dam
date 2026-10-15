// 검색용 초기 쿼리 및 필터 기본값
export const ADMIN_ACCOUNT_INITIAL_FILTERS = {
  page: 1,
  perPage: 6,
  keyword: "",
  role: "",
  dept: "",
  deleted: null,
  fromDate: "",
  toDate: "",
};

export const ADMIN_ACCOUNT_STATUS_OPTIONS = [
  { code: false, name: "활성" },
  { code: true, name: "비활성" },
]

export const ADMIN_ACCOUNT_DEPT_OPTIONS = [
  { code: "OPERATION", name: "운영·관리" },
  { code: "PLANNING", name: "기획" },
];

export const ADMIN_ACCOUNT_ROLE_OPTIONS = [
  { code: "ROLE_SUPER", name: "최고 관리자" },
  { code: "ROLE_MANAGER", name: "매니저" },
  { code: "ROLE_STAFF", name: "스태프" },
];

// 관리자 활성 상태
export const ADMIN_ACCOUNT_STATUS = [
  {
    label: "상태",
    name: "deleted",
    options: ADMIN_ACCOUNT_STATUS_OPTIONS,
  },
];

// 관리자 계정 관리 - 부서 & 권한 셀렉트용
export const ADMIN_ACCOUNT_SELECT_OPTIONS = [
  {
    label: "부서",
    name: "dept",
    placeholder: "전체",
    options: ADMIN_ACCOUNT_DEPT_OPTIONS,
  },
  {
    label: "권한",
    name: "role",
    placeholder: "전체",
    options: ADMIN_ACCOUNT_ROLE_OPTIONS,
  },
];


