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

// 관리자 계정 관리 - 권한
export const ADMIN_ACCOUNT_ROLE_OPTIONS = [
  {
    label: "부서",
    name: "dept",
    placeholder: "전체",
    options: [
      { code: "OPERATION", name: "운영·관리" },
      { code: "PLANNING", name: "기획" },
    ],
  },
  {
    label: "권한",
    name: "role",
    placeholder: "전체",
    options: [
      { code: "ROLE_SUPER", name: "최고 관리자" },
      { code: "ROLE_MANAGER", name: "매니저" },
      { code: "ROLE_STAFF", name: "스태프" },
    ],
  },
];

export const ADMIN_ACCOUNT_STATUS = [
  {
    label: "상태",
    name: "deleted",
    options: [
      { code: false, name: "활성" },
      { code: true, name: "비활성" },
    ],
  },
];
