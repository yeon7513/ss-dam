import React, { useEffect, useState } from "react";
import DashboardHeader from "../../components/admin/dashboard-header/DashboardHeader.jsx";
import AdminLogCard from "./OperationStatus/AdminLogCard/AdminLogCard.jsx";
import DashboardCharts from "./OperationStatus/DashboardCharts/DashboardCharts.jsx";
import PendingReports from "./OperationStatus/PendingReports/PendingReports.jsx";
import RegionParticipation from "./OperationStatus/RegionParticipation/RegionParticipation.jsx";
import SummaryStats from "./OperationStatus/SummaryStats/SummaryStats.jsx";
import TopSellers from "./OperationStatus/TopSellers/TopSellers.jsx";
import styles from "./OperationStatus.module.scss";

const OperationStatus = () => {
  /* 운영 현황 대시보드 데이터 관리 */
  const [fromDate] = useState("2026-09-01");
  const [toDate] = useState("2026-09-15");

  const [summaryData, setSummaryData] = useState([
    { title: "전체 회원 수", value: "0명", rate: "+0%" },
    { title: "오늘 신규 가입", value: "0명", rate: "+0%" },
    { title: "진행 중 챌린지", value: "0개", rate: "+0%" },
    { title: "일일 참여 건수", value: "0건", rate: "+0%" },
  ]);

  const [adminLogsData] = useState([]);
  const [pendingReportsData] = useState([]);
  const [participationData, setParticipationData] = useState([]);
  const [topSellersData, setTopSellersData] = useState([]);
  const [lastUpdated, setLastUpdated] = useState("");
  const [isSpinning, setIsSpinning] = useState(false);

  const updateCurrentTime = () =>
    setLastUpdated(`${new Date().toLocaleString("sv-SE")} 기준`);

  const fetchAdminDashboardData = async () => {
    const queryParam = `?from=${fromDate}&to=${toDate}`;

    try {
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

      const regionRes = await fetch(
        `/api/admin/dashboard/statistics/regions${queryParam}`,
      );
      if (regionRes.ok) {
        const result = await regionRes.json();
        if (result.data) {
          const formattedRegions = result.data.map((reg) => ({
            name: reg.regionName,
            percent: `${reg.percentage}%`,
            count: `(${reg.count}명)`,
          }));
          setParticipationData(formattedRegions);
        }
      }

      const sellersRes = await fetch(
        `/api/admin/dashboard/statistics/sellers/ranking${queryParam}`,
      );
      if (sellersRes.ok) {
        const result = await sellersRes.json();
        if (result.data) {
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
      // 대시보드 데이터 조회 실패 시 예외를 처리함.
      console.error("어드민 대시보드 데이터 조회 실패", error);
    }
  };

  const handleRefresh = async () => {
    if (isSpinning) return;
    setIsSpinning(true);

    try {
      await fetchAdminDashboardData();
      updateCurrentTime();
    } catch (error) {
      // 데이터 새로고침 실패 시 예외를 처리함.
      console.error("데이터 갱신 실패:", error);
    } finally {
      setTimeout(() => {
        setIsSpinning(false);
      }, 1000);
    }
  };

  useEffect(() => {
    updateCurrentTime();
    fetchAdminDashboardData();

    // 1분마다 현재 시각을 자동 갱신함.
    const timer = setInterval(() => {
      updateCurrentTime();
    }, 60000);

    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.dashboardBody}>
      {/* 대시보드 헤더 영역 */}
      <DashboardHeader
        title="운영 현황"
        lastUpdated={lastUpdated}
        isSpinning={isSpinning}
        handleRefresh={handleRefresh}
      />

      {/* 상단 레이아웃 영역 */}
      <div className={styles.topGrid}>
        <div className={styles.leftColumn}>
          {/* 요약 통계 영역 */}
          <SummaryStats summaryData={summaryData} />

          {/* 관리자 로그 카드 영역 */}
          <AdminLogCard adminLogsData={adminLogsData} />
        </div>

        {/* 미처리 신고 영역 */}
        <PendingReports pendingReportsData={pendingReportsData} />
      </div>

      {/* 중단 차트 영역 */}
      <DashboardCharts />

      {/* 하단 레이아웃 영역 */}
      <div className={styles.bottomGrid}>
        {/* 지역별 참여도 영역 */}
        <RegionParticipation participationData={participationData} />

        {/* 우수 판매자 영역 */}
        <TopSellers topSellersData={topSellersData} />
      </div>
    </div>
  );
};

export default OperationStatus;
