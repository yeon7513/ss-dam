import React from "react";
import ChartCard from "../../../../components/common/card/ChartCard.jsx";
import styles from "./DashboardCharts.module.scss";

const DashboardCharts = () => {
  /* 중단 대시보드 차트 영역 */
  return (
    <div className={styles.middleGrid}>
      {/* 월간 신규 회원 차트 카드 */}
      <ChartCard
        title="월간 신규 회원"
        legends={[
          { label: "올해", isDark: true },
          { label: "지난해", isDark: false },
        ]}
        className={styles.chartCard}
      >
        <div className={styles.chartPlaceholder}>
          <span>[ 월간 신규 회원 차트 영역 ]</span>
        </div>
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
