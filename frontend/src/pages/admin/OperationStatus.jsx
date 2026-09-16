import React, { useEffect, useState } from "react";
import Card from "../../components/common/card/Card.jsx";
import StatCard from "../../components/common/card/StatCard.jsx";
import ChartCard from "../../components/common/card/ChartCard.jsx";
//import AdminLayout from "../../layout/AdminLayout.jsx";
import styles from "./OperationStatus.module.scss";
import { FaArrowsRotate } from "react-icons/fa6";

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
      {/* 페이지 타이틀 */}
      <div className={styles.pageTitleRow}>
        <h1>
          운영 현황
          <FaArrowsRotate
            className={`${styles.refreshIcon} ${isSpinning ? styles.spinning : ""}`}
            onClick={handleRefresh}
            size={18}
          />
        </h1>
        {/* 동적으로 업데이트되는 시각 바인딩 */}
        <span className={styles.timeInfo}>{lastUpdated}</span>
      </div>

      {/* 상단 2열 레이아웃 */}
      <div className={styles.topGrid}>
        <div className={styles.leftColumn}>
          {/* 2x2 요약 카드 */}
          <div className={styles.statsContainer}>
            {summaryData.map((item, index) => (
              <StatCard key={index} {...item} />
            ))}
          </div>

          {/* 관리자 활동 로그 카드 */}
          <Card className={styles.logCard}>
            <div className={styles.cardHeader}>
              <h3>관리자 활동 로그 ↗</h3>
            </div>
            <ul className={styles.logList}>
              {adminLogsData.map((log, index) => (
                <li key={index}>{log}</li>
              ))}
            </ul>
          </Card>
        </div>

        {/* 미처리 신고 카드 */}
        <Card className={styles.reportCard}>
          <div className={styles.cardHeader}>
            <h3>미처리 신고 ↗</h3>
          </div>
          <table className={styles.reportTable}>
            <thead>
              <tr>
                <th>날짜</th>
                <th>회원 구분</th>
                <th>사유</th>
                <th>설명</th>
              </tr>
            </thead>
            <tbody>
              {pendingReportsData.map((item, index) => (
                <tr key={index}>
                  <td>{item.date}</td>
                  <td>
                    <div className={styles.userInfo}>
                      <div className={styles.avatar}>👤</div>
                      <div className={styles.userText}>
                        <strong>{item.user}</strong>
                        <small>{item.role}</small>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className={styles.badge}>{item.reason}</span>
                  </td>
                  <td className={styles.descTd}>{item.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className={styles.pagination}>
            <span>&lt; 처음</span>
            <span>1</span>
            <span className={styles.activePage}>2</span>
            <span>3</span>
            <span>4</span>
            <span>5</span>
            <span>...</span>
            <span>11</span>
            <span>마지막 &gt;</span>
          </div>
        </Card>
      </div>

      {/* 중단 3열: 차트 레이아웃 */}
      <div className={styles.middleGrid}>
        <ChartCard
          title="월간 신규 회원"
          legends={[
            { label: "올해", isDark: true },
            { label: "지난해", isDark: false },
          ]}
        >
          <span>[ 월간 신규 회원 차트 영역 ]</span>
        </ChartCard>

        <ChartCard
          title="전체 챌린지 달성률"
          legends={[
            { label: "달성", isDark: true },
            { label: "미달성", isDark: false },
          ]}
        >
          <span>[ 달성률 도넛 차트 영역 (67%) ]</span>
        </ChartCard>

        <ChartCard
          title="챌린지 인기 순위"
          legends={[
            { label: "높음", isDark: true },
            { label: "낮음", isDark: false },
          ]}
        >
          <span>[ 원형/방사형 차트 영역 ]</span>
        </ChartCard>
      </div>

      {/* 하단 2열: 지역별 참여도 및 우수 판매자 */}
      <div className={styles.bottomGrid}>
        <Card className={styles.bottomCard}>
          <div className={styles.cardHeader}>
            <h3>지역별 참여도</h3>
          </div>
          <ul className={styles.regionList}>
            {participationData.map((reg, index) => (
              <li key={index}>
                <span>{reg.name}</span>
                <div className={styles.regionVal}>
                  <strong>{reg.percent}</strong>
                  <small>{reg.count}</small>
                </div>
              </li>
            ))}
          </ul>
        </Card>

        <Card className={styles.bottomCard}>
          <div className={styles.cardHeader}>
            <h3>우수 판매자</h3>
          </div>
          <div className={styles.sellerFlex}>
            <div className={styles.donutPlaceholder}>
              <span>[ 판매자 차트 영역 ]</span>
            </div>
            <ul className={styles.sellerList}>
              {topSellersData.map((seller, index) => (
                <li key={index}>
                  <span className={styles.sellerName}>
                    <i className={styles.dot}></i> {seller.name}
                  </span>
                  <div className={styles.sellerVal}>
                    <strong>{seller.value}</strong>
                    <span
                      className={
                        seller.rate.startsWith("-") ? styles.minus : styles.plus
                      }
                    >
                      {seller.rate}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default OperationStatus;
