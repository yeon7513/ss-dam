import React from "react";
// 기존에 만들어진 Sidebar 컴포넌트 경로
import Sidebar from "../../layout/sidebar/Sidebar.jsx";
import styles from "./AdminDashboard.module.scss";

// 피그마 기반 Mock Data
const mockStats = [
  { title: "전체 회원", value: "11.8M", rate: "+2.5%" },
  { title: "신규 회원", value: "8.236K", rate: "-1.2%" },
  { title: "신규 피드", value: "2.352M", rate: "+11%" },
  { title: "신규 거래", value: "8K", rate: "+5.2%" },
];

const mockLogs = Array(10).fill(
  "2026년 4월 10일 [운영] 김철수 관리자가 이영희 회원의 활동을 정지했습니다.",
);

const mockReports = [
  { reason: "[피드] 욕설" },
  { reason: "[피드] 도배" },
  { reason: "[회원] 프로필" },
  { reason: "[피드] 부적절" },
  { reason: "[회원] 아이디" },
  { reason: "[마켓] 광고" },
  { reason: "[마켓] 광고" },
  { reason: "[마켓] 기타" },
].map((item) => ({
  user: "Jane Doe",
  role: "Senior Designer",
  reason: item.reason,
  desc: "Egestas elit dui scelerisque ut eu purus aliquam vitae habita...",
  date: "2026/04/10",
}));

const mockRegionData = [
  { name: "서울특별시", percent: "27.5%", count: "4.5M" },
  { name: "경기도", percent: "11.2%", count: "2.3M" },
  { name: "부산광역시", percent: "9.4%", count: "2M" },
  { name: "대구광역시", percent: "8%", count: "1.7M" },
  { name: "인천광역시", percent: "7.9%", count: "1.6M" },
  { name: "광주광역시", percent: "6.1%", count: "1.2M" },
  { name: "대전광역시", percent: "5.9%", count: "1M" },
];

const mockSellers = [
  { name: "User Name", value: "$1.2M", rate: "+8.2%" },
  { name: "User Name", value: "$800K", rate: "+7%" },
  { name: "User Name", value: "$645K", rate: "+2.5%" },
  { name: "User Name", value: "$590K", rate: "-6.5%" },
  { name: "User Name", value: "$342K", rate: "+1.7%" },
];

const AdminDashboard = () => {
  return (
    <div className={styles.adminLayout}>
      {/* 1. 이미 구현된 공통 Sidebar 컴포넌트 배치 */}
      <Sidebar isFixed={false} />

      {/* 2. 우측 메인 콘텐츠 영역 */}
      <main className={styles.mainContent}>
        <header className={styles.topHeader}>
          <div className={styles.breadcrumb}>🏠</div>
          <button className={styles.userModeBtn}>사용자 모드 전환</button>
        </header>

        <div className={styles.dashboardBody}>
          <div className={styles.pageTitleRow}>
            <h1>
              운영 현황 <span className={styles.refreshIcon}>🔄</span>
            </h1>
            <span className={styles.timeInfo}>2026-04-10 14:00 기준</span>
          </div>

          {/* 상단 1열: 요약 카드 / 활동 로그 / 미처리 신고 */}
          <div className={styles.topGrid}>
            <div className={styles.statsContainer}>
              {mockStats.map((item, index) => (
                <div key={index} className={styles.statCard}>
                  <span className={styles.statTitle}>{item.title}</span>
                  <div className={styles.statValRow}>
                    <span className={styles.statVal}>{item.value}</span>
                    <span
                      className={`${styles.statRate} ${
                        item.rate.startsWith("-") ? styles.minus : styles.plus
                      }`}
                    >
                      {item.rate}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className={`${styles.cardBox} ${styles.logBox}`}>
              <div className={styles.cardHeader}>
                <h3>관리자 활동 로그 ↗</h3>
              </div>
              <ul className={styles.logList}>
                {mockLogs.map((log, index) => (
                  <li key={index}>{log}</li>
                ))}
              </ul>
            </div>

            <div className={`${styles.cardBox} ${styles.reportBox}`}>
              <div className={styles.cardHeader}>
                <h3>미처리 신고 ↗</h3>
              </div>
              <table className={styles.reportTable}>
                <thead>
                  <tr>
                    <th>대상 회원</th>
                    <th>사유</th>
                    <th>설명</th>
                    <th>날짜</th>
                  </tr>
                </thead>
                <tbody>
                  {mockReports.map((item, index) => (
                    <tr key={index}>
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
                      <td>{item.date}</td>
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
            </div>
          </div>

          {/* 중단 2열: 차트 레이아웃 영역 (Placeholder) */}
          <div className={styles.middleGrid}>
            <div className={styles.cardBox}>
              <div className={styles.cardHeader}>
                <h3>월간 신규 회원</h3>
                <div className={styles.legend}>
                  <span className={styles.dotDark}></span> 올해
                  <span className={styles.dotLight}></span> 지난해
                </div>
              </div>
              <div className={styles.chartPlaceholder}>
                <span>[ 월간 신규 회원 차트 영역 ]</span>
              </div>
            </div>

            <div className={styles.cardBox}>
              <div className={styles.cardHeader}>
                <h3>전체 챌린지 달성률</h3>
                <div className={styles.legend}>
                  <span className={styles.dotDark}></span> 달성
                  <span className={styles.dotLight}></span> 미달성
                </div>
              </div>
              <div className={styles.chartPlaceholder}>
                <span>[ 달성률 도넛 차트 영역 (67%) ]</span>
              </div>
            </div>

            <div className={styles.cardBox}>
              <div className={styles.cardHeader}>
                <h3>챌린지 인기 순위</h3>
                <div className={styles.legend}>
                  <span className={styles.dotDark}></span> 높음
                  <span className={styles.dotLight}></span> 낮음
                </div>
              </div>
              <div className={styles.chartPlaceholder}>
                <span>[ 원형/방사형 차트 영역 ]</span>
              </div>
            </div>
          </div>

          {/* 하단 3열: 지역별 참여도 및 우수 판매자 */}
          <div className={styles.bottomGrid}>
            <div className={styles.cardBox}>
              <h3>지역별 참여도</h3>
              <ul className={styles.regionList}>
                {mockRegionData.map((reg, index) => (
                  <li key={index}>
                    <span>{reg.name}</span>
                    <div className={styles.regionVal}>
                      <strong>{reg.percent}</strong>
                      <small>{reg.count}</small>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.cardBox}>
              <h3>우수 판매자</h3>
              <div className={styles.sellerFlex}>
                <div className={styles.donutPlaceholder}>
                  <span>[ 판매자 차트 영역 ]</span>
                </div>
                <ul className={styles.sellerList}>
                  {mockSellers.map((seller, index) => (
                    <li key={index}>
                      <span className={styles.sellerName}>
                        <i className={styles.dot}></i> {seller.name}
                      </span>
                      <div className={styles.sellerVal}>
                        <strong>{seller.value}</strong>
                        <span
                          className={
                            seller.rate.startsWith("-")
                              ? styles.minus
                              : styles.plus
                          }
                        >
                          {seller.rate}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
