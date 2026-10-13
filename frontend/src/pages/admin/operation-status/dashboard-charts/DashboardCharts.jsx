import { useEffect, useState } from 'react';
import ChartCard from "../../../../components/common/card/ChartCard.jsx";
import styles from "./DashboardCharts.module.scss";

import MonthlyMemberChart from '../../../../components/common/chart/dashboard/MonthlyMemberChart.jsx';

async function fetchMonthlyMembers(year, signal) {
  const response = await fetch(
    `/api/admin/stats/members?from=${year}-01-01&to=${year}-12-31`,
    { signal },
  );

  if (!response.ok) {
    throw new Error(`회원 통계 조회 실패 (${response.status})`);
  }

  const result = await response.json();

  if (!result.success || !Array.isArray(result.data)) {
    throw new Error(result.message || '회원 통계 응답을 확인해주세요.');
  }

  const now = new Date();

  // 1~12월 순서로 배열 생성
  return Array.from({ length: 12 }, (_, index) => {
    // 올해 아직 오지 않은 달은 표시하지 않음
    if (year === now.getFullYear() && index > now.getMonth()) {
      return null;
    }

    const month = `${year}-${String(index + 1).padStart(2, '0')}`;
    const item = result.data.find((row) => row.yearMonth === month);

    // 가입자가 없는 달은 0명
    return item?.newMemberCount ?? 0;
  });
}

const DashboardCharts = () => {

  const [memberCounts, setMemberCounts] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();
    const year = new Date().getFullYear();

    async function loadMembers() {
      try {
        const [thisYear, lastYear] = await Promise.all([
          fetchMonthlyMembers(year, controller.signal),
          fetchMonthlyMembers(year - 1, controller.signal),
        ]);

        setMemberCounts({ thisYear, lastYear });
      } catch (error) {
        if (error.name !== 'AbortError') {
          setError(error.message);
        }
      }
    }

    loadMembers();

    return () => controller.abort();
  }, []);

  /* 중단 대시보드 차트 영역 */
  return (
    <div className={styles.middleGrid}>
      {/* 월간 신규 회원 차트 카드 */}
      <ChartCard
        title="월간 신규 회원"
        legends={[
          { label: '올해', isDark: true },
          { label: '지난해', isDark: false },
        ]}
      >
        {error ? (
          <p>{error}</p>
        ) : memberCounts ? (
          <MonthlyMemberChart
            thisYearCounts={memberCounts.thisYear}
            lastYearCounts={memberCounts.lastYear}
          />
        ) : (
          <p>회원 통계를 불러오는 중입니다.</p>
        )}
      </ChartCard>

      {/* 전체 챌린지 달성률 차트 카드 */}
      <ChartCard
        title="전체 챌린지 달성률"
        legends={[
          { label: "달성", isDark: true },
          { label: "미달성", isDark: false },
        ]}
      >
        <div className={styles.chartPlaceholder}>
          <span>[ 달성률 도넛 차트 영역 (67%) ]</span>
        </div>
      </ChartCard>

      {/* 챌린지 인기 순위 차트 카드 */}
      <ChartCard
        title="챌린지 인기 순위"
        legends={[
          { label: "높음", isDark: true },
          { label: "낮음", isDark: false },
        ]}
      >
        <div className={styles.chartPlaceholder}>
          <span>[ 원형/방사형 차트 영역 ]</span>
        </div>
      </ChartCard>
    </div>
  );
};

export default DashboardCharts;
