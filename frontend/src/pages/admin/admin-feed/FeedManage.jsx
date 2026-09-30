import React, { useEffect, useState, useCallback, useRef } from "react";
import { MdArrowForwardIos, MdSearch, MdClose } from "react-icons/md";

import DashboardHeader from "../../../components/admin/dashboard-header/DashboardHeader.jsx";
import RadioInput from "../../../components/forms/radio-input/RadioInput.jsx";
import SelectBox from "../../../components/forms/select-box/SelectBox.jsx";
import TextInput from "../../../components/forms/text-input/TextInput.jsx";
import FeedCard from "../../../components/feed/feed-card/FeedCard.jsx";

import styles from "./FeedManage.module.scss";

const MAX_REGION_COUNT = 5;
const REFRESH_SPIN_DURATION = 800;

const TAB_LIST = [
  { id: "ALL", label: "전체" },
  { id: "REPORTED", label: "신고된 피드", showBadge: true },
  { id: "NORMAL", label: "일반" },
  { id: "BLIND", label: "블라인드" },
  { id: "DELETED", label: "삭제" },
];

const CATEGORY_OPTIONS = [
  { code: "13", name: "클린 거래 매너 온도 높이기 릴레이" },
  { code: "8", name: "여름 맞이 첫 중고거래 인증 이벤트" },
];

const INITIAL_FILTERS = {
  startDate: "",
  endDate: "",
  category: "",
  likeCount: "POPULAR",
  region: [],
  keyword: "",
};

// FeedCard 에러 방지용 완전 확장 목데이터
const MOCK_DATA_LIST = [
  {
    id: 1,
    feedId: 1,
    status: "NORMAL",
    category: "13",
    categoryName: "클린 거래 매너 온도 높이기 릴레이",
    content: "클린 거래 참여 인증합니다. 깨끗한 중고 거래 만들어요.",
    region: "역삼동",
    likeCount: 45,
    commentCount: 3,
    createdAt: "2026-09-20",
    author: { nickname: "열정유저", profileImage: "", name: "열정유저" },
    // FeedCard에서 사용할 수 있는 다양한 이미지/태그/댓글 배열 필드 세팅
    images: [],
    imageList: [],
    imageUrls: [],
    files: [],
    photos: [],
    tags: ["클린거래", "인증"],
    hashtags: ["클린거래", "인증"],
    tagList: ["클린거래", "인증"],
    comments: [],
    commentList: [],
  },
  {
    id: 2,
    feedId: 2,
    status: "REPORTED",
    category: "8",
    categoryName: "여름 맞이 첫 중고거래 인증 이벤트",
    content: "신고 접수된 게시물입니다. 관리자 검토가 필요합니다.",
    region: "유성구",
    likeCount: 12,
    commentCount: 1,
    createdAt: "2026-09-22",
    author: { nickname: "불량유저", profileImage: "", name: "불량유저" },
    images: [],
    imageList: [],
    imageUrls: [],
    files: [],
    photos: [],
    tags: ["신고"],
    hashtags: ["신고"],
    tagList: ["신고"],
    comments: [],
    commentList: [],
  },
  {
    id: 3,
    feedId: 3,
    status: "NORMAL",
    category: "13",
    categoryName: "클린 거래 매너 온도 높이기 릴레이",
    content: "오늘 매너 온도 높이기 성공했습니다.",
    region: "역삼동",
    likeCount: 120,
    commentCount: 15,
    createdAt: "2026-09-25",
    author: { nickname: "친절왕", profileImage: "", name: "친절왕" },
    images: [],
    imageList: [],
    imageUrls: [],
    files: [],
    photos: [],
    tags: ["매너온도", "성공"],
    hashtags: ["매너온도", "성공"],
    tagList: ["매너온도", "성공"],
    comments: [],
    commentList: [],
  },
  {
    id: 4,
    feedId: 4,
    status: "BLIND",
    category: "8",
    categoryName: "여름 맞이 첫 중고거래 인증 이벤트",
    content: "운영 정책 위반으로 블라인드 처리된 피드입니다.",
    region: "서초동",
    likeCount: 2,
    commentCount: 0,
    createdAt: "2026-09-26",
    author: { nickname: "익명", profileImage: "", name: "익명" },
    images: [],
    imageList: [],
    imageUrls: [],
    files: [],
    photos: [],
    tags: [],
    hashtags: [],
    tagList: [],
    comments: [],
    commentList: [],
  },
];

const FeedManage = () => {
  // 대시보드 헤더 State (초기값 직접 설정하여 useEffect 내 동기 setState 방지)
  const [lastUpdated, setLastUpdated] = useState(
    () => `${new Date().toLocaleString("sv-SE")} 기준`,
  );
  const [isSpinning, setIsSpinning] = useState(false);

  // 피드 데이터 State
  const [feedList, setFeedList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // 피드 목록 필터 통합 State
  const [activeTab, setActiveTab] = useState("ALL");
  const [filters, setFilters] = useState(INITIAL_FILTERS);

  // 지역 검색 입력값 전용 State
  const [regionInput, setRegionInput] = useState("");
  const [searchInput, setSearchInput] = useState("");

  // 타이머 참조용 Ref
  const timerRef = useRef(null);

  // 시각 업데이트 함수 (새로고침 버튼 이벤트용)
  const updateCurrentTime = useCallback(() => {
    setLastUpdated(`${new Date().toLocaleString("sv-SE")} 기준`);
  }, []);

  // 데이터 로드 함수 (useEffect 내 동기 setState 호출 방지)
  const fetchFeeds = useCallback(() => {
    const timer = setTimeout(() => {
      setFeedList(MOCK_DATA_LIST);
      setIsLoading(false);
    }, 300);
    return timer;
  }, []);

  // 마운트 시 데이터 로드 및 언마운트 정리
  useEffect(() => {
    const fetchTimer = fetchFeeds();
    return () => {
      clearTimeout(fetchTimer);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [fetchFeeds]);

  // 새로고침 버튼 핸들러
  const handleRefresh = useCallback(() => {
    if (isSpinning) return;
    setIsSpinning(true);
    setIsLoading(true);

    // 1. 상태 탭 초기화 ('전체' 탭으로 이동)
    setActiveTab("ALL");

    // 2. 통합 필터(날짜, 카테고리, 정렬, 지역태그, 검색어) 초기화
    setFilters(INITIAL_FILTERS);

    // 3. 텍스트 입력창 내부 State도 함께 초기화
    setRegionInput(""); // 지역 태그 입력창 초기화
    setSearchInput(""); // 검색어 입력창 초기화 (아까 추가한 state)

    // 4. 시각 업데이트 및 데이터 재로드
    updateCurrentTime();
    fetchFeeds();

    timerRef.current = setTimeout(() => {
      setIsSpinning(false);
    }, REFRESH_SPIN_DURATION);
  }, [isSpinning, updateCurrentTime, fetchFeeds]);

  // 필터 변경 핸들러
  const handleFilterChange = useCallback((e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  // 지역 태그 추가 핸들러
  const handleRegionKeyDown = useCallback(
    (e) => {
      if (e.key !== "Enter") return;
      if (e.nativeEvent.isComposing) return;
      e.preventDefault();

      const trimmed = regionInput.trim();
      if (!trimmed) return;

      if (filters.region.length >= MAX_REGION_COUNT) {
        alert(`지역 태그는 최대 ${MAX_REGION_COUNT}개까지 추가할 수 있습니다.`);
        setRegionInput("");
        return;
      }

      if (!filters.region.includes(trimmed)) {
        setFilters((prev) => ({
          ...prev,
          region: [...prev.region, trimmed],
        }));
      }
      setRegionInput("");
    },
    [regionInput, filters.region],
  );

  // 지역 태그 삭제 핸들러
  const handleRemoveRegion = useCallback((targetRegion) => {
    setFilters((prev) => ({
      ...prev,
      region: prev.region.filter((r) => r !== targetRegion),
    }));
  }, []);

  // 신고된 피드 갯수 계산
  const reportedCount = feedList.filter(
    (item) => item && item.status === "REPORTED",
  ).length;

  // 프론트엔드 조건 필터링 및 정렬 로직
  const filteredFeeds = feedList
    .filter((feed) => {
      if (!feed) return false;

      // 1. 상태 탭 필터링
      if (activeTab !== "ALL" && feed.status !== activeTab) {
        return false;
      }

      // 2. 카테고리 필터링
      if (
        filters.category &&
        String(feed.category) !== String(filters.category)
      ) {
        return false;
      }

      // 3. 날짜 필터링
      if (
        filters.startDate &&
        feed.createdAt &&
        feed.createdAt < filters.startDate
      ) {
        return false;
      }
      if (
        filters.endDate &&
        feed.createdAt &&
        feed.createdAt > filters.endDate
      ) {
        return false;
      }

      // 4. 검색어 필터링 (내용 또는 작성자)
      if (filters.keyword) {
        const kw = filters.keyword.toLowerCase();
        const hasContent = feed.content?.toLowerCase().includes(kw);
        const authorName =
          typeof feed.author === "string" ? feed.author : feed.author?.nickname;
        const hasAuthor = authorName?.toLowerCase().includes(kw);
        if (!hasContent && !hasAuthor) return false;
      }

      // 5. 지역 태그 필터링
      if (filters.region && filters.region.length > 0) {
        const hasRegion = filters.region.some((r) => feed.region?.includes(r));
        if (!hasRegion) return false;
      }

      return true;
    })
    .sort((a, b) => {
      if (filters.likeCount === "POPULAR") {
        return (b.likeCount || 0) - (a.likeCount || 0);
      }
      return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
    });

  return (
    <div className={styles.dashboardBody}>
      {/* 헤더 컴포넌트 */}
      <DashboardHeader
        title="피드 목록"
        lastUpdated={lastUpdated}
        isSpinning={isSpinning}
        handleRefresh={handleRefresh}
      />

      <div className={styles.mainContainer}>
        {/* 상태 필터 탭 */}
        <div
          className={styles.statusTab}
          role="tablist"
          aria-label="피드 상태 필터"
        >
          {TAB_LIST.map((tab) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={activeTab === tab.id}
              className={`${styles.tabBtn} ${activeTab === tab.id ? styles.active : ""}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}{" "}
              {tab.showBadge && reportedCount > 0 && (
                <span className={styles.badge}>{reportedCount}</span>
              )}
            </button>
          ))}
        </div>

        {/* 상세 조건 필터바 */}
        <div className={styles.filterBar}>
          <div className={styles.filterRow}>
            <div className={styles.datePickerGroup}>
              <TextInput
                name="startDate"
                type="date"
                value={filters.startDate}
                onChange={handleFilterChange}
                aria-label="조회 시작일"
              />
              <span aria-hidden="true">
                <MdArrowForwardIos />
              </span>
              <TextInput
                name="endDate"
                type="date"
                value={filters.endDate}
                onChange={handleFilterChange}
                aria-label="조회 종료일"
              />
            </div>

            <SelectBox
              name="category"
              className={styles.categorySelect}
              selectedValue={filters.category}
              placeholder="챌린지 카테고리"
              options={CATEGORY_OPTIONS}
              onChange={handleFilterChange}
            />

            <div className={styles.radioGroup}>
              <RadioInput
                id="likeCount-popular"
                name="likeCount"
                label="인기순"
                value="POPULAR"
                isChecked={filters.likeCount === "POPULAR"}
                onChange={handleFilterChange}
              />
              <RadioInput
                id="likeCount-newest"
                name="likeCount"
                label="최신순"
                value="NEWEST"
                isChecked={filters.likeCount === "NEWEST"}
                onChange={handleFilterChange}
              />
            </div>

            <div className={styles.searchBox}>
              <input
                name="keyword"
                type="text"
                value={filters.keyword}
                placeholder="글 제목을 입력하세요."
                onChange={handleFilterChange}
                aria-label="검색어 입력"
              />
              {/* 검색버튼(돋보기 아이콘)으로 동작 안해도 될듯? */}
              {/*<MdSearch className={styles.searchIcon} aria-hidden="true" />*/}
            </div>
          </div>

          <div className={styles.filterRow}>
            <div className={styles.regionInputContainer}>
              <input
                type="text"
                className={styles.regionInput}
                value={regionInput}
                placeholder={
                  filters.region.length >= MAX_REGION_COUNT
                    ? `지역 태그는 최대 ${MAX_REGION_COUNT}개까지 추가 가능합니다.`
                    : "지역명 또는 동 이름을 입력하세요 (예: 역삼동, 유성구)"
                }
                disabled={filters.region.length >= MAX_REGION_COUNT}
                onChange={(e) => setRegionInput(e.target.value)}
                onKeyDown={handleRegionKeyDown}
                aria-label="지역 태그 입력"
              />

              <div className={styles.tagContainer}>
                {filters.region.map((region) => (
                  <span key={region} className={styles.regionTag}>
                    {region}
                    <button
                      type="button"
                      className={styles.removeTagBtn}
                      onClick={() => handleRemoveRegion(region)}
                      aria-label={`${region} 태그 삭제`}
                    >
                      <MdClose />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 피드 카드 목록 영역 */}
        <div className={styles.feedCardGrid}>
          {isLoading ? (
            <div className={styles.emptyState}>
              데이터를 불러오는 중입니다...
            </div>
          ) : filteredFeeds.length > 0 ? (
            filteredFeeds.map((feed) => <FeedCard key={feed.id} feed={feed} />)
          ) : (
            <div className={styles.emptyState}>조회된 피드가 없습니다.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FeedManage;
