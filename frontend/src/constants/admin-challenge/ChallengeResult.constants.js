// 종료 데이터 분석 - 검색용 초기 쿼리 및 필터 기본값
// -> 백엔드 AdminChallengeResultSearch와 이름이 같아서 변환 없이 그대로 전송
// -> 포인트 지급 여부(rewardPaid) 필터는 사용하지 않음
export const ADMIN_CHALLENGE_RESULT_INITIAL_FILTERS = {
  page: 1,
  perPage: 10,
  fromDate: "",
  toDate: "",
  categoryCode: "",
  sort: "LATEST",
  keyword: "",
};

// 정렬
export const ADMIN_CHALLENGE_RESULT_SORT_OPTIONS = [
  { code: "LATEST", name: "최근 종료순" },
  { code: "PARTICIPANTS_DESC", name: "참여자 많은 순" },
  { code: "PARTICIPANTS_ASC", name: "참여자 적은 순" },
  { code: "ACHIEVEMENT_DESC", name: "달성률 높은 순" },
  { code: "ACHIEVEMENT_ASC", name: "달성률 낮은 순" },
];

// 챌린지 셀렉트 (options는 종료된 챌린지 목록 API로 페이지에서 채움)
// -> 백엔드 categoryCode = 챌린지 번호(CHALLENGE.CODE)
export const ADMIN_CHALLENGE_RESULT_CHALLENGE_SELECT = {
  label: "챌린지",
  name: "categoryCode",
};

// 정렬 셀렉트
export const ADMIN_CHALLENGE_RESULT_SORT_SELECT = {
  label: "정렬",
  name: "sort",
  options: ADMIN_CHALLENGE_RESULT_SORT_OPTIONS,
};