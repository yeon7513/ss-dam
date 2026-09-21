export const FEED_MENU = [
  {
    id: "mine",
    label: "내 활동",
    path: "",
    authMode: "member",
  },
  {
    id: "saved",
    label: "저장한 피드",
    path: "",
    authMode: "member",
  },
];

// 관리자대시보드 사이드바
export const ADMIN_MENU = [
  { category: "운영 현황", path: "/admin" },
  {
    category: "서비스 관리",
    subMenus: [
      { name: "미처리 신고", path: "" },
      { name: "회원 정보", path: "/admin/user_manage" },
      { name: "피드 목록", path: "/admin/feed_manage" },
      { name: "마켓 거래", path: "/admin/market_manage" },
    ],
  },
  {
    category: "챌린지 관리",
    subMenus: [
      { name: "진행 현황", path: "/admin/challenge_manage" },
      { name: "종료 데이터 분석", path: "" },
    ],
  },
  {
    category: "시스템 관리",
    subMenus: [
      { name: "관리자 계정 관리", path: "" },
      { name: "관리자 활동 로그", path: "" },
    ],
  },
];
