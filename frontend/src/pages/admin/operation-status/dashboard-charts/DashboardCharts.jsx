import { useEffect, useState } from 'react';
import ChartCard from "../../../../components/common/card/ChartCard.jsx";
import styles from "./DashboardCharts.module.scss";

import ChallengeCompletionChart from '../../../../components/common/chart/dashboard/ChallengeCompletionChart.jsx';
import ChallengePopularityChart from '../../../../components/common/chart/dashboard/ChallengePopularityChart.jsx';
import MonthlyMemberChart from '../../../../components/common/chart/dashboard/MonthlyMemberChart.jsx';

// 예시 데이터 - 삭제 예정
const sampleChallenges = [
  { challengeCode: 1, title: '매일 걷기', participantCount: 120, averageProgressRate: 75, proofCount: 340 },
  { challengeCode: 2, title: '텀블러 사용', participantCount: 95, averageProgressRate: 90, proofCount: 280 },
  { challengeCode: 3, title: '분리배출 실천', participantCount: 80, averageProgressRate: 45, proofCount: 190 },
  { challengeCode: 4, title: '잔반 줄이기', participantCount: 60, averageProgressRate: 60, proofCount: 150 },
  { challengeCode: 5, title: '대중교통 이용', participantCount: 40, averageProgressRate: 25, proofCount: 70 },
];


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

async function fetchChallengeStatistics(year, signal) {
  const response = await fetch(
    `/api/admin/stats/challenges?from=${year}-01-01&to=${year}-12-31`,
    { signal },
  );

  if (!response.ok) {
    throw new Error(`챌린지 통계 조회 실패 (${response.status})`);
  }

  const result = await response.json();

  if (!result.success || !result.data) {
    throw new Error(result.message || '챌린지 통계 응답을 확인해주세요.');
  }

  return result.data;
}

const DashboardCharts = () => {

  // 회원 통계 저장
  const [memberCounts, setMemberCounts] = useState(null);
  const [error, setError] = useState('');

  // 챌린지 통계 저장
  const [challengeStats, setChallengeStats] = useState(null);
  const [challengeError, setChallengeError] = useState('');

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


useEffect(() => {
  const controller = new AbortController();
  const year = new Date().getFullYear();

  async function loadChallenges() {
    try {
      const data = await fetchChallengeStatistics(
        year,
        controller.signal,
      );

      setChallengeStats(data);
    } catch (error) {
      if (error.name !== 'AbortError') {
        setChallengeError(error.message);
      }
    }
  }

  loadChallenges();

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
        {challengeError ? (
          <p>{challengeError}</p>
        ) : challengeStats === null ? (
          <p>챌린지 통계를 불러오는 중입니다.</p>
        ) : challengeStats.completionRate == null ? (
          <p>조회 기간에 집계할 참여 데이터가 없습니다.</p>
        ) : (
          <ChallengeCompletionChart
            rate={challengeStats.completionRate}
          />
        )}
      </ChartCard>

      {/* 챌린지 인기 순위 차트 카드 */}
      <ChartCard
        title="챌린지 인기 순위"
        headerRight="진행 중 · 참여 인원 기준 TOP 5"
        legendContent={
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              fontSize: 11,
              color: '#6b7280',
            }}
          >
            <span>평균 진행률</span>
            <span>0%</span>
            <span
              aria-hidden="true"
              style={{
                width: 60,
                height: 8,
                borderRadius: 4,
                background:
                  'linear-gradient(to right, hsl(215, 10%, 90%), hsl(215, 10%, 40%))',
              }}
            />
            <span>100%</span>
          </div>
        }
      >
        <ChallengePopularityChart challenges={sampleChallenges} />
      </ChartCard>
          </div>
        );
      };

export default DashboardCharts;

