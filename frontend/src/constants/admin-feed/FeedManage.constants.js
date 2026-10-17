// 피드 목록 - 지역 태그 최대 개수
export const ADMIN_FEED_MAX_REGION_COUNT = 5;

// 검색용 초기 쿼리 및 필터 기본값
// -> fromDate, toDate는 SearchFilterBar 공통 이름 (API 전송 시 startDate, endDate로 변환)
export const ADMIN_FEED_INITIAL_FILTERS = {
  page: 1,
  perPage: 8,
  status: "",
  fromDate: "",
  toDate: "",
  category: "",
  likeCount: "POPULAR",
  region: "",
  keyword: "",
};

// 피드 상태 탭 (showBadge: 신고 건수 뱃지 표시)
export const ADMIN_FEED_STATUS_TABS = [
  { value: "", label: "일반" },
  { value: "REPORTED", label: "신고된 피드", showBadge: true },
  { value: "BLIND", label: "블라인드" },
  { value: "DELETED", label: "삭제" },
];

// 정렬 (박스형 라디오)
export const ADMIN_FEED_SORT_OPTIONS = [
  { code: "POPULAR", name: "인기순" },
  { code: "NEWEST", name: "최신순" },
];

export const ADMIN_FEED_SORT = [
  {
    label: "정렬",
    name: "likeCount",
    options: ADMIN_FEED_SORT_OPTIONS,
  },
];

// 지역 태그 입력
export const ADMIN_FEED_TAG_GROUPS = [
  {
    label: "지역",
    name: "region",
    placeholder: "지역명 또는 동 이름을 입력 후 Enter (예: 역삼동, 유성구)",
    maxCount: ADMIN_FEED_MAX_REGION_COUNT,
  },
];

// 챌린지 셀렉트 (options는 API 응답으로 페이지에서 채움)
export const ADMIN_FEED_CHALLENGE_SELECT = {
  label: "챌린지",
  name: "category",
};