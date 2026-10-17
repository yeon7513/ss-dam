// 회원 정보 관리 - 검색용 초기 쿼리 및 필터 기본값
// -> fromDate, toDate는 SearchFilterBar 공통 이름 (API 전송 시 joinedFrom, joinedTo로 변환)
export const ADMIN_USER_INITIAL_FILTERS = {
  page: 1,
  perPage: 12,
  status: "",
  search: "",
  keyword: "",
  fromDate: "",
  toDate: "",
  activityStatus: "",
  regionCode: "",
  rating: "",
};

// 회원 상태 탭 (백엔드 MemberStatus enum 값과 동일하게)
export const ADMIN_USER_STATUS_TABS = [
  { value: "", label: "전체 상태" },
  { value: "ACTIVE", label: "일반" },
  { value: "SUSPENDED", label: "정지" },
  { value: "SLEEP", label: "휴면" },
  { value: "WITHDRAW", label: "탈퇴" },
];

// 키워드 검색 대상 (선택 안 하면 백엔드에서 아이디로 검색)
export const ADMIN_USER_SEARCH_TARGET_OPTIONS = [
  { code: "id", name: "아이디" },
  { code: "name", name: "이름" },
  { code: "phone", name: "연락처" },
];

// 활동 상태 (최근 접속일 기준)
export const ADMIN_USER_ACTIVITY_OPTIONS = [
  { code: "WITHIN_7_DAYS", name: "최근 7일 접속" },
  { code: "BETWEEN_7_30_DAYS", name: "8~30일 전 접속" },
  { code: "OVER_30_DAYS", name: "30일 초과 미접속" },
  { code: "NEVER", name: "접속 기록 없음" },
];

// 지역
export const ADMIN_USER_REGION_OPTIONS = [
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

// 등급
export const ADMIN_USER_RATING_OPTIONS = [
  { code: "1", name: "1등급" },
  { code: "2", name: "2등급" },
  { code: "3", name: "3등급" },
  { code: "4", name: "4등급" },
  { code: "5", name: "5등급" },
];

// 회원 정보 관리 - 셀렉트 그룹 (SearchFilterBar selectGroups)
export const ADMIN_USER_SELECT_OPTIONS = [
  {
    label: "활동 상태",
    name: "activityStatus",
    placeholder: "전체",
    options: ADMIN_USER_ACTIVITY_OPTIONS,
  },
  {
    label: "지역",
    name: "regionCode",
    placeholder: "전체",
    options: ADMIN_USER_REGION_OPTIONS,
  },
  {
    label: "등급",
    name: "rating",
    placeholder: "전체",
    options: ADMIN_USER_RATING_OPTIONS,
  },
  {
    label: "검색 대상",
    name: "search",
    placeholder: "아이디",
    options: ADMIN_USER_SEARCH_TARGET_OPTIONS,
  },
];