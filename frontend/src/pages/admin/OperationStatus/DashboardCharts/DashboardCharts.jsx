import React from "react";
import ChartCard from "../../../../components/common/card/ChartCard.jsx";
import styles from "./DashboardCharts.module.scss";

const DashboardCharts = () => {
  return (
    // 중단 3열: 차트 레이아웃
    <div className={styles.middleGrid}>
      <ChartCard
        className={styles.chartCard}
        title="월간 신규 회원"
        legends={[
          { label: "올해", isDark: true },
          { label: "지난해", isDark: false },
        ]}
      >
        <div className={styles.chartPlaceholder}>
          <span>[ 월간 신규 회원 차트 영역 ]</span>
        </div>
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
  );
};

export default DashboardCharts;
