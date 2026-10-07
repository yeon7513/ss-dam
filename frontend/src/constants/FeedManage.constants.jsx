export const MAX_REGION_COUNT = 5;
export const REFRESH_SPIN_DURATION = 800;

export const TAB_LIST = [
  { value: "", label: "전체" },
  { value: "REPORTED", label: "신고된 피드", showBadge: true },
  { value: "NORMAL", label: "일반" },
  { value: "BLIND", label: "블라인드" },
  { value: "DELETED", label: "삭제" },
];

export const INITIAL_FILTERS = {
  page: 1,
  perPage: 8,
  status: "",
  startDate: "",
  endDate: "",
  category: "",
  likeCount: "POPULAR",
  region: "",
  keyword: "",
};
