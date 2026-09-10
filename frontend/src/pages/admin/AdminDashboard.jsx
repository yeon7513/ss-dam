import React, { useState } from "react";
import Card from "../../components/common/card/Card.jsx";
import Sidebar from "../../layout/sidebar/Sidebar.jsx";
import AdminHeader from "../../components/admin/AdminHeader.jsx";
import styles from "./AdminDashboard.module.scss";
import { FaArrowsRotate } from "react-icons/fa6";

// StatCard (2x2 요약 지표 전용 카드)
const StatCard = ({ title, value, rate }) => (
  <Card className={styles.statCard}>
    <span className={styles.statTitle}>{title}</span>
    <div className={styles.statValRow}>
      <span className={styles.statVal}>{value}</span>
      <span
        className={`${styles.statRate} ${
          rate.startsWith("-") ? styles.minus : styles.plus
        }`}
      >
        {rate}
      </span>
    </div>
  </Card>
);

// ChartCard (차트 전용 카드)
const ChartCard = ({ title, legends, children }) => (
  <Card className={styles.chartCard}>
    <div className={styles.cardHeader}>
      <h3>{title}</h3>
      {legends && (
        <div className={styles.legend}>
          {legends.map((item, idx) => (
            <React.Fragment key={idx}>
              <span
                className={item.isDark ? styles.dotDark : styles.dotLight}
              ></span>
              {item.label}{" "}
            </React.Fragment>
          ))}
        </div>
      )}
    </div>
    <div className={styles.chartPlaceholder}>{children}</div>
  </Card>
);

// 더미 데이터
const summaryData = [
  { title: "전체 회원 수", value: "12,450명", rate: "+5.2%" },
  { title: "오늘 신규 가입", value: "128명", rate: "+12.0%" },
  { title: "진행 중 챌린지", value: "42개", rate: "-2.1%" },
  { title: "일일 참여 건수", value: "1,890건", rate: "+8.4%" },
];

const adminLogsData = [
  "[14:20] admin1님이 신고 처리 완료",
  "[13:45] admin2님이 신규 챌린지 등록 승인",
  "[11:10] system 자동 백업 완료",
  "[09:30] admin1님이 회원 상태 변경 (제재)",
];

const pendingReportsData = [
  {
    user: "김철수",
    role: "일반회원",
    reason: "부적절한 게시글",
    desc: "광고성 도배글 작성...",
    date: "2026-04-10",
  },
  {
    user: "이영희",
    role: "판매자",
    reason: "허위 정보",
    desc: "상품 정보 다름...",
    date: "2026-04-09",
  },
  {
    user: "박민수",
    role: "일반회원",
    reason: "욕설/비방",
    desc: "댓글 내 욕설 포함...",
    date: "2026-04-09",
  },
  {
    user: "최민수",
    role: "일반회원",
    reason: "욕설/비방",
    desc: "댓글 내 욕설 포함...",
    date: "2026-04-09",
  },
  {
    user: "이민수",
    role: "일반회원",
    reason: "욕설/비방",
    desc: "댓글 내 욕설 포함...",
    date: "2026-04-09",
  },
];

const ParticipationData = [
  { name: "서울/경기", percent: "45%", count: "(5,600명)" },
  { name: "부산/경남", percent: "22%", count: "(2,740명)" },
  { name: "대구/경북", percent: "15%", count: "(1,860명)" },
  { name: "인천/강원", percent: "18%", count: "(2,250명)" },
];

const topSellersData = [
  { name: "에코라이프", value: "1,240건", rate: "+12%" },
  { name: "클린마켓", value: "980건", rate: "+5%" },
  { name: "제로웨이스트", value: "850건", rate: "-1%" },
];

const AdminDashboard = () => {
  // 아이콘 회전 애니메이션 State
  const [isSpinning, setIsSpinning] = useState(false);

  const handleRefresh = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    setTimeout(() => {
      setIsSpinning(false);
    }, 1000);
  };

  return (
    <div className={styles.adminLayout}>
      <Sidebar isFixed={false} />

      <main className={styles.mainContent}>
        <AdminHeader />

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
            <span className={styles.timeInfo}>2026-04-10 14:00 기준</span>
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
                    <th>대상 회원</th>
                    <th>사유</th>
                    <th>설명</th>
                    <th>날짜</th>
                  </tr>
                </thead>
                <tbody>
                  {pendingReportsData.map((item, index) => (
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
                {ParticipationData.map((reg, index) => (
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
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
