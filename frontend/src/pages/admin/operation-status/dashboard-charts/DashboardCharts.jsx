import { useEffect, useState } from 'react';
import ChartCard from "../../../../components/common/card/ChartCard.jsx";
import styles from "./DashboardCharts.module.scss";

import ChallengeCompletionChart from '../../../../components/common/chart/dashboard/ChallengeCompletionChart.jsx';
import ChallengePopularityChart from '../../../../components/common/chart/dashboard/ChallengePopularityChart.jsx';
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

// 진행 중인 챌린지 인기 TOP 5 조회
async function fetchPopularChallenges(signal) {
  const response = await fetch(
    "/api/admin/stats/challenges/popular",
    { signal },
  );

  if (!response.ok) {
    throw new Error(`챌린지 인기 순위 조회 실패 (${response.status})`);
  }

  const result = await response.json();

  if (!result.success || !Array.isArray(result.data)) {
    throw new Error(
      result.message || "챌린지 인기 순위 응답을 확인해주세요.",
    );
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

  // 인기 순위: null은 로딩 중, []는 조회 결과 없음
  const [popularChallenges, setPopularChallenges] = useState(null);
  const [popularError, setPopularError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function loadPopularChallenges() {
      try {
        const data = await fetchPopularChallenges(controller.signal);

        if (controller.signal.aborted) return;

        setPopularChallenges(data);
        setPopularError("");
      } catch (error) {
        if (!controller.signal.aborted) {
          setPopularError(error.message);
        }
      }
    }

    loadPopularChallenges();

    return () => controller.abort();
  }, []);

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
        {popularError ? (
          <p role="alert">{popularError}</p>
        ) : popularChallenges === null ? (
          <p>챌린지 인기 순위를 불러오는 중입니다.</p>
        ) : popularChallenges.length === 0 ? (
          <p>진행 중인 챌린지가 없습니다.</p>
        ) : popularChallenges.every((item) => item.participantCount === 0) ? (
          <p>진행 중인 챌린지에 아직 참여자가 없습니다.</p>
        ) : (
          <ChallengePopularityChart challenges={popularChallenges} />
        )}
      </ChartCard>
          </div>
        );
      };

export default DashboardCharts;

