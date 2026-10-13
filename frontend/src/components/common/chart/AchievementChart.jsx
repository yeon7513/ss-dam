import styles from './AchievementChart.module.scss';

// 달성률을 0~100% 범위의 게이지로 표시
export default function AchievementChart({ value }) {
  const rate =
    value == null ? null : Math.min(100, Math.max(0, Number(value)));

  return (
    <>
      <div className={styles.legend}>
        <span>
          <i className={styles.achievedDot} /> 달성률
        </span>
        <span>
          <i className={styles.remainingDot} /> 남은 비율
        </span>
      </div>

      <div className={styles.gauge}>
        <svg
          viewBox="0 0 200 200"
          role="img"
          aria-label={rate == null ? '달성률 데이터 없음' : `달성률 ${rate}%`}
        >
          {/* 전체 게이지 배경: 원 둘레의 75% */}
          <circle
            cx="100"
            cy="100"
            r="75"
            fill="none"
            stroke="#e2e5ea"
            strokeWidth="16"
            strokeLinecap="round"
            pathLength="100"
            strokeDasharray="75 100"
            transform="rotate(135 100 100)"
          />

          {/* 달성률에 해당하는 만큼 표시 */}
          {rate > 0 && (
            <circle
              cx="100"
              cy="100"
              r="75"
              fill="none"
              stroke="#858e99"
              strokeWidth="16"
              strokeLinecap="round"
              pathLength="100"
              strokeDasharray={`${rate * 0.75} 100`}
              transform="rotate(135 100 100)"
            />
          )}

          <text x="100" y="160" textAnchor="middle">
            {rate == null ? '-' : `${rate}%`}
          </text>
        </svg>
      </div>
    </>
  );
}