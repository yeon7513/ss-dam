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
      { name: "미처리 신고", path: "/admin/reports" },
      { name: "회원 정보", path: "/admin/user_manage" },
      { name: "피드 목록", path: "/admin/feed_manage" },
      { name: "마켓 거래", path: "/admin/market_manage" },
    ],
  },
  {
    category: "챌린지 관리",
    subMenus: [
      { name: "진행 현황", path: "/admin/challenge_manage" },
      { name: "종료 데이터 분석", path: "/admin/challenge-result" },
    ],
  },
  {
    category: "시스템 관리",
    subMenus: [
      { name: "관리자 계정 관리", path: "/admin/system_manage" },
      { name: "관리자 활동 로그", path: "/admin/activity-logs" },
    ],
  },
];
// 마이페이지 사이드바 (path가 ""이면 "준비 중" 알림. 라우트 분리 결정 전까지 임시 매핑)
export const MYPAGE_MENU = [
  { category: "참여 현황", path: "/mypage" },
  {
    category: "그루",
    subMenus: [
      { name: "충전", path: "/mypage/point/charge" },
      { name: "적립 및 사용 내역", path: "/mypage/point/history" },
      { name: "송금 및 출금", path: "/mypage/point/transfer" },
    ],
  },
  {
    category: "챌린지",
    subMenus: [
      { name: "참여한 챌린지", path: "" },
      { name: "내 랭킹 조회", path: "" },
    ],
  },
  {
    category: "피드",
    subMenus: [
      { name: "내가 쓴 피드", path: "/mypage/activities" },
      { name: "좋아요 피드", path: "" },
      { name: "댓글 모아보기", path: "" },
    ],
  },
  {
    category: "거래",
    subMenus: [
      { name: "판매 관리", path: "/mypage/deal" },
      { name: "구매 내역", path: "" },
    ],
  },
  {
    category: "내 정보",
    subMenus: [
      { name: "정보 변경", path: "/mypage/edit_profile" },
      { name: "회원 탈퇴", path: "" },
    ],
  },
];
