import ChallengePopularityChart from "../../../components/common/chart/dashboard/ChallengePopularityChart.jsx";
import styles from "./MyRanking.module.scss";

export default function MyChallengeChart({ challenges = [] }) {
  if (challenges.length === 0) {
    return <p>참여한 챌린지가 없습니다.</p>;
  }

  const items = challenges.map((challenge) => ({
    ...challenge,
    proofCount: Math.max(0, Number(challenge.proofCount) || 0),
    achievementRate: Math.min(
      100,
      Math.max(0, Number(challenge.achievementRate) || 0),
    ),
  }));

  return (
    <div className={styles.participationChart}>
      <div className={styles.colorScale}>
        <span>달성률 0%</span>
        <span className={styles.colorGradient} aria-hidden="true" />
        <span>100%</span>
      </div>

      <div className={styles.chartArea}>
        <div className={styles.chartCanvas}>
          <ChallengePopularityChart challenges={items} mode="personal" />
        </div>
      </div>
    </div>
  );
}
