import React, { useEffect, useState } from "react";

// 분리한 서브 컴포넌트들 import
import DashboardHeader from "./OperationStatus/DashboardHeader.jsx";
import SummaryStats from "./OperationStatus/SummaryStats.jsx";
import AdminLogCard from "./OperationStatus/AdminLogCard.jsx";
import PendingReports from "./OperationStatus/PendingReports.jsx";
import DashboardCharts from "./OperationStatus/DashboardCharts.jsx";
import RegionParticipation from "./OperationStatus/RegionParticipation.jsx";
import TopSellers from "./OperationStatus/TopSellers.jsx";

import styles from "./OperationStatus.module.scss";

const OperationStatus = () => {
  // 백엔드 요청에 필요한 기본 조회 기간 설정 (예: 이번 달 1일 ~ 오늘)
  const [fromDate] = useState("2026-09-01");
  const [toDate] = useState("2026-09-15");

  // 2*2요약 카드
  const [summaryData, setSummaryData] = useState([
    { title: "전체 회원 수", value: "0명", rate: "+0%" },
    { title: "오늘 신규 가입", value: "0명", rate: "+0%" },
    { title: "진행 중 챌린지", value: "0개", rate: "+0%" },
    { title: "일일 참여 건수", value: "0건", rate: "+0%" },
  ]);

  // 관리자 활동 로그
  const [adminLogsData] = useState([]);

  // 미처리 신고
  const [pendingReportsData] = useState([]);

  // 지역별 참여도
  const [participationData, setParticipationData] = useState([]);

  // 우수판매자
  const [topSellersData, setTopSellersData] = useState([]);

  // 아이콘 회전 애니메이션 State
  const [isSpinning, setIsSpinning] = useState(false);

  // 현재 시각 저장 State
  const [lastUpdated, setLastUpdated] = useState("");

  // 현재 시각 갱신 함수
  const updateCurrentTime = () =>
    setLastUpdated(`${new Date().toLocaleString("sv-SE")} 기준`);

  // 데이터 통합 Fetch 함수
  const fetchAdminDashboardData = async () => {
    const queryParam = `?from=${fromDate}&to=${toDate}`;

    try {
      // 대시보드 요약 조회
      const summaryRes = await fetch(
        `/api/admin/dashboard/summary${queryParam}`,
      );
      if (summaryRes.ok) {
        const result = await summaryRes.json();
        if (result.data) {
          const data = result.data;

          setSummaryData([
            {
              title: "전체 회원 수",
              value: `${data.totalMembers ?? 0}명`,
              rate: data.memberRate ?? "+0%",
            },
            {
              title: "오늘 신규 가입",
              value: `${data.todayNewMembers ?? 0}명`,
              rate: data.todayRate ?? "+0%",
            },
            {
              title: "진행 중 챌린지",
              value: `${data.activeChallenges ?? 0}개`,
              rate: data.challengeRate ?? "+0%",
            },
            {
              title: "일일 참여 건수",
              value: `${data.dailyParticipations ?? 0}건`,
              rate: data.participationRate ?? "+0%",
            },
          ]);
        }
      }

      // 지역별 참여 통계 조회
      const regionRes = await fetch(
        `/api/admin/dashboard/statistics/regions${queryParam}`,
      );
      if (regionRes.ok) {
        const result = await regionRes.json();
        if (result.data) {
          // 백엔드 RegionStatistics 응답 배열을 프론트 형태에 맞게 변환
          const formattedRegions = result.data.map((reg) => ({
            name: reg.regionName,
            percent: `${reg.percentage}%`,
            count: `(${reg.count}명)`,
          }));
          setParticipationData(formattedRegions);
        }
      }

      // 우수 판매자 순위 조회
      const sellersRes = await fetch(
        `/api/admin/dashboard/statistics/sellers/ranking${queryParam}`,
      );
      if (sellersRes.ok) {
        const result = await sellersRes.json();
        if (result.data) {
          // 백엔드 SellerRanking 응답 배열을 프론트 형태에 맞게 변환
          const formattedSellers = result.data.map((seller) => ({
            name: seller.sellerName,
            value: `${seller.totalPrice.toLocaleString()}원`,
            rate: seller.growthRate
              ? `${seller.growthRate > 0 ? "+" : ""}${seller.growthRate}%`
              : "0%",
          }));
          setTopSellersData(formattedSellers);
        }
      }
    } catch (error) {
      console.error("어드민 대시보드 데이터 조회 실패", error);
    }
  };

  // 새로고침 버튼 핸들러
  const handleRefresh = async () => {
    if (isSpinning) return;
    setIsSpinning(true);

    try {
      await fetchAdminDashboardData();
      updateCurrentTime();
      console.log("데이터 갱신 완료");
    } catch (error) {
      console.error("데이터 갱신 실패:", error);
    } finally {
      setTimeout(() => {
        setIsSpinning(false);
      }, 1000);
    }
  };

  // 초기 렌더링 시 현재 시각 설정
  useEffect(() => {
    updateCurrentTime();
    fetchAdminDashboardData(); // 데이터 패치 함수

    // 1분(60,000ms)마다 시각을 자동 갱신
    const timer = setInterval(() => {
      updateCurrentTime();
    }, 60000);

    // 컴포넌트 언마운트 시 메모리 누수 방지
    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.dashboardBody}>
      {/* 대시보드헤더 컴포넌트*/}
      <DashboardHeader
        lastUpdated={lastUpdated}
        handleRefresh={handleRefresh}
        isSpinning={isSpinning}
      />

      {/* 상단 2열 레이아웃 */}
      <div className={styles.topGrid}>
        <div className={styles.leftColumn}>
          {/* 2x2 요약 카드 컴포넌트 */}
          <SummaryStats summaryData={summaryData} />

          {/* 관리자 활동 로그 카드 컴포넌트 */}
          <AdminLogCard adminLogsData={adminLogsData} />
        </div>

        {/* 미처리 신고 카드 컴포넌트 */}
        <PendingReports pendingReportsData={pendingReportsData} />
      </div>

      {/* 중단 3열 차트 레이아웃 컴포넌트 */}
      <DashboardCharts />

      {/* 하단 2열: 지역별 참여도 및 우수 판매자 */}
      <div className={styles.bottomGrid}>
        {/* 지역별 참여도 카드 컴포넌트 */}
        <RegionParticipation participationData={participationData} />

        {/* 우수 판매자 카드 컴포넌트 */}
        <TopSellers topSellersData={topSellersData} />
      </div>
    </div>
  );
};

export default OperationStatus;
