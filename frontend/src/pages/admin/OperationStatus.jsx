import { useState } from "react";

import { useEffect } from "react";

import PanelHeader from "../../layout/admin/panel-header/PanelHeader.jsx";
import AdminLogCard from "./operation-status/admin-log-card/AdminLogCard.jsx";
import DashboardCharts from "./operation-status/dashboard-charts/DashboardCharts.jsx";
import PendingReports from "./operation-status/pending-reports/PendingReports.jsx";
import RegionParticipation from "./operation-status/region-participation/RegionParticipation.jsx";
import SummaryStats from "./operation-status/summary-stats/SummaryStats.jsx";
import TopSellers from "./operation-status/top-sellers/TopSellers.jsx";
import styles from "./OperationStatus.module.scss";


// 우수 판매자 샘플 데이터
// 이번 달 / 지난달 같은 기간의 판매 금액
const sampleTopSellers = [
  {
    sellerId: "seller01",
    sellerName: "초록상점",
    salesAmount: 1200000,
    previousSalesAmount: 1000000,
  },
  {
    sellerId: "seller02",
    sellerName: "다시쓰는가게",
    salesAmount: 800000,
    previousSalesAmount: 750000,
  },
  {
    sellerId: "seller03",
    sellerName: "지구마켓",
    salesAmount: 645000,
    previousSalesAmount: 700000,
  },
  {
    sellerId: "seller04",
    sellerName: "나눔상점",
    salesAmount: 590000,
    previousSalesAmount: 590000,
  },
  {
    sellerId: "seller05",
    sellerName: "새싹마켓",
    salesAmount: 342000,
    previousSalesAmount: 0,
  },
];

// 대시보드 상단 요약카드 4개
// 전체 회원 수 -> 오늘 날짜 조회 기간으로 보내면 백엔드가 오늘까지의 누적 회원 수 반환
// 전체 회원 수는 증감률 배지 없이 표시
// 한국 시간 기준 오늘 날짜
function getTodayDate() {
  return new Intl.DateTimeFormat("sv-SE", {
    timeZone: "Asia/Seoul",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}

// 전체 회원 수 조회
async function fetchTotalMemberSummary(signal) {
  const today = getTodayDate();

  const response = await fetch(
    `/api/admin/stats/summary?from=${today}&to=${today}`,
    { signal },
  );

  if (!response.ok) {
    throw new Error(`전체 회원 수 조회 실패 (${response.status})`);
  }

  const result = await response.json();

  if (!result.success || !result.data) {
    throw new Error(result.message || "회원 통계 응답을 확인해주세요.");
  }

  return result.data;
}

// 전체 회원 수, 오늘 신규 가입, 진행 중 챌린지 카드 갱신
function updateTotalMemberCard(cards, data) {
  return cards.map((card) => {
    if (card.title === "전체 회원 수") {
      return {
        ...card,
        value: `${data.totalMemberCount.toLocaleString("ko-KR")}명`,
        rate: null,
      };
    }

    if (card.title === "오늘 신규 가입") {
      // 탈퇴 여부와 관계없이 오늘 발생한 가입 건수, 어제 대비 증감률
      // 백엔드는 어제 0명이면 null 반환: 오늘도 0명이면 변화 없음으로 표시
      const rate = data.newMemberChangeRate == null && data.newMemberCount === 0
        ? 0
        : data.newMemberChangeRate;
      return {
        ...card,
        value: `${data.newMemberCount.toLocaleString("ko-KR")}명`,
        rate: rate == null
          ? null
          : rate === 0 ? "+0%" : `${rate > 0 ? "+" : ""}${rate.toFixed(1)}%`,
      };
    }

        if (card.title === "진행 중 챌린지") {
      return {
        ...card,
        value: `${data.activeChallengeCount.toLocaleString("ko-KR")}개`,
        rate: null,
      };
    }

    if (card.title === "일일 참여 건수") {
  const rate = data.newParticipationChangeRate;

  return {
      ...card,
      value: `${data.newParticipationCount.toLocaleString("ko-KR")}건`,
      rate: rate == null
        ? null
        : rate === 0
          ? "+0%"
          : `${rate > 0 ? "+" : ""}${rate.toFixed(1)}%`,
    };
  }

    return card;
  });
}

const OperationStatus = () => {

  // 상단 요약 통계
  const [summaryData, setSummaryData] = useState([
    { title: "전체 회원 수", value: "0명", rate: null },
    { title: "오늘 신규 가입", value: "조회 중", rate: null },
    { title: "진행 중 챌린지", value: "조회 중", rate: null },
    { title: "일일 참여 건수", value: "조회 중", rate: null },
  ]);

  // 새로고침 관리
  const [logRefreshKey, setLogRefreshKey] = useState(0);
  const [reportRefreshKey, setReportRefreshKey] = useState(0);

  // 지역별 참여도 실제 조회 데이터
  const [participationData, setParticipationData] = useState([]);
  const [regionLoading, setRegionLoading] = useState(true);
  const [regionError, setRegionError] = useState("");

  // 새로고침 버튼을 누르면 지역별 참여도도 다시 조회
  const [regionRefreshKey, setRegionRefreshKey] = useState(0);

  // 하단 카드 데이터 — API 연결 전에는 샘플 사용
  // 아직 데이터를 변경하지 않으므로 setter는 생략
  const [topSellersData] = useState(sampleTopSellers);

  // 전체 회원 수 조회 오류
  const [summaryError, setSummaryError] = useState("");

// 화면 진입 시 전체 회원 수 조회
useEffect(() => {
  const controller = new AbortController();

  async function loadTotalMembers() {
    try {
      const data = await fetchTotalMemberSummary(controller.signal);

      if (controller.signal.aborted) return;

      setSummaryData((previous) =>
        updateTotalMemberCard(previous, data),
      );
      setSummaryError("");
    } catch (error) {
      if (error.name !== "AbortError") {
        setSummaryError(error.message);
      }
    }
  }

  loadTotalMembers();

  return () => controller.abort();
}, []);

  const fetchAdminDashboardData = async () => {
    // 관리자 활동 로그 새로고침
    setLogRefreshKey((value) => value + 1);

    // 미처리 신고 카드 새로고침
    setReportRefreshKey((value) => value + 1);

    // 지역별 참여도 새로고침
    setRegionRefreshKey((value) => value + 1);

    try {
      const data = await fetchTotalMemberSummary();

      setSummaryData((previous) =>
        updateTotalMemberCard(previous, data),
      );
      setSummaryError("");
    } catch (error) {
      // 대시보드 데이터 조회 실패 시 예외를 처리함.
      setSummaryError(error.message);
      console.error("전체 회원 수 조회 실패", error);
    }
  };

  // 화면 진입 및 새로고침 시 지역별 참여도 조회
  useEffect(() => {
    const controller = new AbortController();

    async function loadRegions() {
      setRegionLoading(true);
      setRegionError("");

      try {
        const response = await fetch("/api/admin/stats/regions", {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(
            `지역별 참여도 조회 실패 (${response.status})`,
          );
        }

        const result = await response.json();

        if (!result.success || !Array.isArray(result.data)) {
          throw new Error(
            result.message || "지역별 참여도 응답을 확인해주세요.",
          );
        }

        if (controller.signal.aborted) return;

        setParticipationData(result.data);
      } catch (error) {
        if (!controller.signal.aborted) {
          setRegionError(error.message);
        }
      } finally {
        if (!controller.signal.aborted) {
          setRegionLoading(false);
        }
      }
    }

    loadRegions();

    return () => controller.abort();
  }, [regionRefreshKey]);

  return (
    <div className={styles.dashboardBody}>
      {/* 대시보드 헤더 영역 */}
      <PanelHeader
        title="운영 현황"
        onRefresh={fetchAdminDashboardData}
      />

      {/* 상단 레이아웃 영역 */}
      <div className={styles.topGrid}>
        <div className={styles.leftColumn}>
          {/* 요약 통계 영역 */}
          <SummaryStats summaryData={summaryData} />

          {summaryError && (
            <p role="alert" style={{ margin: 0, color: "#b84339", fontSize: 12 }}>
              {summaryError}
            </p>
          )}

          {/* 관리자 로그 카드 영역 */}
          <AdminLogCard refreshKey={logRefreshKey} />
        </div>

        {/* 미처리 신고 영역 */}
        <PendingReports refreshKey={reportRefreshKey} />
      </div>

      {/* 중단 차트 영역 */}
      <DashboardCharts />

      {/* 하단 레이아웃 영역 */}
      <div className={styles.bottomGrid}>
        {/* 지역별 참여도 영역 */}
        <RegionParticipation
          participationData={participationData}
          loading={regionLoading}
          error={regionError}
        />

        {/* 우수 판매자 영역 */}
        <TopSellers topSellersData={topSellersData} />
      </div>
    </div>
  );
};

export default OperationStatus;
