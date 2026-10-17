// 챌린지 진행 현황 - 검색용 초기 쿼리 및 필터 기본값
// -> 백엔드 AdminChallengeSearch와 이름이 같아서 변환 없이 그대로 전송
// -> deleted는 백엔드 기본값(false)을 쓰므로 넣지 않음 (삭제되지 않은 챌린지만 조회)
export const ADMIN_CHALLENGE_INITIAL_FILTERS = {
  page: 1,
  perPage: 10,
  fromDate: "",
  toDate: "",
  progressStatus: "",
  postStatus: "",
  sort: "LATEST",
  keyword: "",
};

// 진행 상태 (CHALLENGE.PROGRESS_STATUS)
export const ADMIN_CHALLENGE_PROGRESS_OPTIONS = [
  { code: "WAITING", name: "대기" },
  { code: "IN_PROGRESS", name: "진행 중" },
  { code: "ENDED", name: "종료" },
];

// 공개 상태 (CHALLENGE.POST_STATUS)
export const ADMIN_CHALLENGE_POST_STATUS_OPTIONS = [
  { code: "ACTIVE", name: "공개" },
  { code: "PRIVATE", name: "비공개" },
];

// 정렬
export const ADMIN_CHALLENGE_SORT_OPTIONS = [
  { code: "LATEST", name: "최신순" },
  { code: "PARTICIPANTS_DESC", name: "참여자 많은 순" },
  { code: "PARTICIPANTS_ASC", name: "참여자 적은 순" },
  { code: "ACHIEVEMENT_DESC", name: "달성률 높은 순" },
  { code: "ACHIEVEMENT_ASC", name: "달성률 낮은 순" },
];

// 챌린지 진행 현황 - 셀렉트 그룹 (SearchFilterBar selectGroups)
// -> label이 드롭다운 기본 문구 + 선택 필터 칩 이름으로 사용됨
export const ADMIN_CHALLENGE_SELECT_OPTIONS = [
  {
    label: "진행 상태",
    name: "progressStatus",
    options: ADMIN_CHALLENGE_PROGRESS_OPTIONS,
  },
  {
    label: "공개 상태",
    name: "postStatus",
    options: ADMIN_CHALLENGE_POST_STATUS_OPTIONS,
  },
  {
    label: "정렬",
    name: "sort",
    options: ADMIN_CHALLENGE_SORT_OPTIONS,
  },
];

// 카드에 표시할 한글 라벨 (코드 -> 이름)
export const toOptionName = (options, code) =>
  options.find((opt) => opt.code === code)?.name ?? code ?? "-";