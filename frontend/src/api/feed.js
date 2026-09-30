import { HOST } from "../lib/url";

// 관리자대시보드 피드목록의 데이터를 불러오는 api - 가람

// FeedCard가 요구할 수 있는 필드들을 모두 채워 넣은 완전한 목데이터
const MOCK_FEEDS = [
  {
    id: 1,
    status: "REPORTED",
    category: "13",
    categoryName: "클린 거래 매너 온도 높이기 릴레이",
    content: "클린 거래 참여 인증합니다. 깨끗한 중고 거래 만들어요.",
    region: "역삼동",
    likeCount: 45,
    commentCount: 3,
    createdAt: "2026-09-20",
    author: { nickname: "열정유저", profileImage: "" },
    images: [],
    imageUrls: [],
    tags: ["클린거래"],
    hashtags: ["클린거래"],
    comments: [],
  },
  {
    id: 2,
    status: "REPORTED",
    category: "8",
    categoryName: "여름 맞이 첫 중고거래 인증 이벤트",
    content: "신고 접수된 게시물입니다. 관리자 검토가 필요합니다.",
    region: "유성구",
    likeCount: 12,
    commentCount: 1,
    createdAt: "2026-09-22",
    author: { nickname: "불량유저", profileImage: "" },
    images: [],
    imageUrls: [],
    tags: ["신고"],
    hashtags: ["신고"],
    comments: [],
  },
  {
    id: 3,
    status: "NORMAL",
    category: "13",
    categoryName: "클린 거래 매너 온도 높이기 릴레이",
    content: "오늘 매너 온도 높이기 성공했습니다.",
    region: "역삼동",
    likeCount: 120,
    commentCount: 15,
    createdAt: "2026-09-25",
    author: { nickname: "친절왕", profileImage: "" },
    images: [],
    imageUrls: [],
    tags: ["성공"],
    hashtags: ["성공"],
    comments: [],
  },
  {
    id: 4,
    status: "BLIND",
    category: "8",
    categoryName: "여름 맞이 첫 중고거래 인증 이벤트",
    content: "운영 정책 위반으로 블라인드 처리된 피드입니다.",
    region: "서초동",
    likeCount: 2,
    commentCount: 0,
    createdAt: "2026-09-26",
    author: { nickname: "익명", profileImage: "" },
    images: [],
    imageUrls: [],
    tags: [],
    hashtags: [],
    comments: [],
  },
];

export const getAdminFeeds = async (filters) => {
  const queryParams = new URLSearchParams({
    status: filters.activeTab || "ALL",
    startDate: filters.startDate || "",
    endDate: filters.endDate || "",
    category: filters.category || "",
    sort: filters.likeCount || "POPULAR",
    region: (filters.region || []).join(","),
    keyword: filters.keyword || "",
  });

  try {
    const response = await fetch(
      `${HOST}/api/admin/feeds?${queryParams.toString()}`,
    );

    if (!response.ok) {
      throw new Error(`HTTP 에러 ${response.status}`);
    }

    const result = await response.json();
    return Array.isArray(result) ? result : result.data || result.content || [];
  } catch (error) {
    console.warn(
      "⚠️ 백엔드 API 미구현으로 테스트용 목데이터를 반환합니다.",
      error,
    );
    return MOCK_FEEDS;
  }
};
