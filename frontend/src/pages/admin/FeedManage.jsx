import React, { useEffect, useState } from "react";
import { MdArrowForwardIos, MdSearch } from "react-icons/md";

import DashboardHeader from "../../components/admin/DashboardHeader.jsx";
import RadioInput from "../../components/forms/radio-input/RadioInput.jsx";
import SelectBox from "../../components/forms/select-box/SelectBox.jsx";
import TextInput from "../../components/forms/text-input/TextInput.jsx";

import styles from "./FeedManage.module.scss";

// 상태 탭 데이터
const TAB_LIST = [
  { id: "ALL", label: "전체" },
  { id: "REPORTED", label: "신고된 피드", count: 7 },
  { id: "NORMAL", label: "일반" },
  { id: "BLIND", label: "블라인드" },
  { id: "DELETED", label: "삭제" },
];

// @@@ 피드 관리 @@@
const FeedManage = () => {
  // 대시보드 헤더 State
  const [lastUpdated, setLastUpdated] = useState("");
  const [isSpinning, setIsSpinning] = useState(false);

  // 피드 목록 필터 관련 State
  const [activeTab, setActiveTab] = useState("ALL");
  const [filters, setFilters] = useState({
    startDate: "",
    endDate: "",
    category: "",
    likeCount: "POPULAR",
    region: "",
    keyword: "",
  });

  // 현재 시각 갱신 함수
  const updateCurrentTime = () =>
    setLastUpdated(`${new Date().toLocaleString("sv-SE")} 기준`);

  // 새로고침 버튼 핸들러
  const handleRefresh = async () => {
    if (isSpinning) return;
    setIsSpinning(true);

    try {
      // TODO: 피드 목록 API 조회 함수 호출
      updateCurrentTime();
      console.log("피드 목록 데이터 갱신 완료");
    } catch (error) {
      console.error("피드 목록 갱신 실패:", error);
    } finally {
      setTimeout(() => {
        setIsSpinning(false);
      }, 800);
    }
  };

  // 필터값 변경 핸들러
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 마운트 시 현재 시각 설정
  useEffect(() => {
    updateCurrentTime();
  }, []);

  return (
    <div className={styles.dashboardBody}>
      {/* 대시보드 헤더 컴포넌트 */}
      <DashboardHeader
        title="피드 목록"
        lastUpdated={lastUpdated}
        isSpinning={isSpinning}
        handleRefresh={handleRefresh}
      />

      {/* 메인 컨텐츠 영역 (흰색 박스) */}
      <div className={styles.mainContainer}>
        {/* StatusTab (상태필터탭) */}
        <div className={styles.statusTab}>
          {TAB_LIST.map((tab) => (
            <button
              key={tab.id}
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

        {/* FilterBar (필터바) */}
        <div className={styles.filterBar}>
          {/* 작성일 선택기 */}
          <div className={styles.datePickerGroup}>
            <TextInput
              name="startDate"
              type="date"
              value={filters.startDate}
              onChange={handleFilterChange}
            />
            <span>
              <MdArrowForwardIos />
            </span>

            <TextInput
              name="endDate"
              type="date"
              value={filters.endDate}
              onChange={handleFilterChange}
            />
          </div>

          {/* 챌린지 카테고리 */}
          <SelectBox
            name="category"
            className={styles.categorySelect}
            selectedValue={filters.category}
            placeholder={"챌린지 카테고리"}
            options={[
              { code: "13", name: "클린 거래 매너 온도 높이기 릴레이" },
              { code: "8", name: "여름 맞이 첫 중고거래 인증 이벤트" },
            ]}
            onChange={handleFilterChange}
          />

          {/* 인기순/최신순 세그먼트 버튼 */}
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

          {/* 지역 카테고리 */}
          <SelectBox
            name="region"
            selectedValue={filters.region}
            placeholder={"지역"}
            options={[
              { code: "SEOUL", name: "서울특별시" },
              { code: "DAEJEON", name: "대전광역시" },
            ]}
            onChange={handleFilterChange}
          />

          {/* 검색어 입력창 */}
          <div className={styles.searchBox}>
            <input
              name="keyword"
              type="text"
              value={filters.keyword}
              placeholder="검색어를 입력하세요."
              onChange={handleFilterChange}
            />
            {/* 돋보기 아이콘 */}
            <MdSearch className={styles.searchIcon} />
          </div>
        </div>

        {/* FeedCardGrid (카드목록 영역) */}
        <div className={styles.feedCardGrid}></div>
      </div>
    </div>
  );
};

export default FeedManage;
