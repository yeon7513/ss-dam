import React, { useState, useEffect } from "react";

// 분리한 서브 컴포넌트들 import
import DashboardHeader from "../../components/admin/DashboardHeader.jsx";

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
    likeCount: "",
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
        handleRefresh={handleRefresh}
        isSpinning={isSpinning}
      />

      {/* 메인 컨텐츠 영역 (흰색 박스) */}
      <div className={styles.mainContainer}>
        {/* ① StatusTab (상태 탭) */}
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

        {/* ② FilterBar (상세 필터바) */}
        <div className={styles.filterBar}>
          <div className={styles.datePickerGroup}>
            <input
              type="date"
              name="startDate"
              value={filters.startDate}
              onChange={handleFilterChange}
            />
            <span>⇒</span> {/* ⇒ 밤티화살표 수정 예정 */}
            <input
              type="date"
              name="endDate"
              value={filters.endDate}
              onChange={handleFilterChange}
            />
          </div>

          <select
            name="category"
            value={filters.category}
            onChange={handleFilterChange}
          >
            <option value="">챌린지 카테고리</option>
            <option value="A">챌린지 A</option>
          </select>

          <select
            name="likeCount"
            value={filters.likeCount}
            onChange={handleFilterChange}
          >
            <option value="">좋아요 수</option>
            <option value="HIGH">많은 순</option>
          </select>

          <select
            name="region"
            value={filters.region}
            onChange={handleFilterChange}
          >
            <option value="">지역</option>
          </select>

          <div className={styles.searchBox}>
            <input
              type="text"
              name="keyword"
              placeholder="검색"
              value={filters.keyword}
              onChange={handleFilterChange}
            />
          </div>
        </div>

        {/* ③ FeedCardGrid (카드 목록 영역) */}
        <div className={styles.feedCardGrid}>
          {/* 팀장님이 제작한 FeedCard 컴포넌트를 import한 뒤 이곳에서 map으로 출력 */}
        </div>
      </div>
    </div>
  );
};

export default FeedManage;
