import React, { useEffect, useState, useCallback, useRef } from "react";
import { MdArrowForwardIos, MdSearch, MdClose } from "react-icons/md";

import DashboardHeader from "../../components/admin/DashboardHeader.jsx";
import RadioInput from "../../components/forms/radio-input/RadioInput.jsx";
import SelectBox from "../../components/forms/select-box/SelectBox.jsx";
import TextInput from "../../components/forms/text-input/TextInput.jsx";

import styles from "./FeedManage.module.scss";

// 상반기/하반기 공통 상수 설정
const MAX_REGION_COUNT = 5;
const REFRESH_SPIN_DURATION = 800;

const TAB_LIST = [
  { id: "ALL", label: "전체" },
  { id: "REPORTED", label: "신고된 피드", count: 7 },
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

const FeedManage = () => {
  // 대시보드 헤더 State
  const [lastUpdated, setLastUpdated] = useState("");
  const [isSpinning, setIsSpinning] = useState(false);

  // 피드 목록 필터 통합 State
  const [activeTab, setActiveTab] = useState("ALL");
  const [filters, setFilters] = useState(INITIAL_FILTERS);

  // 지역 검색 입력값 전용 State
  const [regionInput, setRegionInput] = useState("");

  // 타이머 참조용 Ref (언마운트 시 메모리 누수 방지)
  const timerRef = useRef(null);

  // 현재 시각 갱신 함수
  const updateCurrentTime = useCallback(() => {
    setLastUpdated(`${new Date().toLocaleString("sv-SE")} 기준`);
  }, []);

  // 새로고침 버튼 핸들러
  const handleRefresh = useCallback(async () => {
    if (isSpinning) return;
    setIsSpinning(true);

    try {
      updateCurrentTime();
      // TODO: Actual API Data Fetching
    } catch (error) {
      console.error("피드 목록 갱신 실패:", error);
    } finally {
      timerRef.current = setTimeout(() => {
        setIsSpinning(false);
      }, REFRESH_SPIN_DURATION);
    }
  }, [isSpinning, updateCurrentTime]);

  // 컴포넌트 언마운트 시 타이머 클리어
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  // 일반 필터값 변경 핸들러
  const handleFilterChange = useCallback((e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  // 지역 태그 추가 핸들러 (한글 IME 조합 중복 방지)
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

  // 마운트 시 현재 시각 설정
  useEffect(() => {
    updateCurrentTime();
  }, [updateCurrentTime]);

  return (
    <div className={styles.dashboardBody}>
      {/* 대시보드 헤더 컴포넌트 */}
      <DashboardHeader
        title="피드 목록"
        lastUpdated={lastUpdated}
        isSpinning={isSpinning}
        handleRefresh={handleRefresh}
      />

      {/* 메인 컨텐츠 영역 */}
      <div className={styles.mainContainer}>
        {/* StatusTab (상태필터탭) */}
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
              {tab.count !== undefined && (
                <span className={styles.badge}>{tab.count}</span>
              )}
            </button>
          ))}
        </div>

        {/* 필터바 */}
        <div className={styles.filterBar}>
          {/* 1번째 줄 : 작성일, 카테고리, 정렬, 검색어 */}
          <div className={styles.filterRow}>
            {/* 작성일 선택기 */}
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

            {/* 챌린지 카테고리 */}
            <SelectBox
              name="category"
              className={styles.categorySelect}
              selectedValue={filters.category}
              placeholder="챌린지 카테고리"
              options={CATEGORY_OPTIONS}
              onChange={handleFilterChange}
            />

            {/* 인기순/최신순 라디오버튼 */}
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

            {/* 검색어 입력창 */}
            <div className={styles.searchBox}>
              <input
                name="keyword"
                type="text"
                value={filters.keyword}
                placeholder="검색어를 입력하세요."
                onChange={handleFilterChange}
                aria-label="검색어 입력"
              />
              <MdSearch className={styles.searchIcon} aria-hidden="true" />
            </div>
          </div>

          {/* 2번째 줄 : 지역 태그 입력 및 표시 영역 */}
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

              {/* 태그 목록 영역 */}
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

        {/* FeedCardGrid (카드목록 영역) */}
        <div className={styles.feedCardGrid}></div>
      </div>
    </div>
  );
};

export default FeedManage;
