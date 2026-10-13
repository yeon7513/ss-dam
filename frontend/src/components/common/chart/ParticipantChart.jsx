// ParticipantChart.jsx
import { formatNumber } from '../../../utils/formatNumber';
import styles from './ParticipantChart.module.scss';

export default function ParticipantChart({ points = [] }) {
  if (!points.length) {
    return <p className={styles.message}>시간별 데이터가 없습니다.</p>;
  }

  const maxCount = Math.max(
    1,
    ...points.flatMap((point) => [
      Number(point.todayCount ?? 0),
      Number(point.yesterdayCount ?? 0),
    ]),
  );

  return (
    <>
      <div className={styles.legend}>
        <span>
          <i className={styles.todayDot} /> 오늘
        </span>
        <span>
          <i className={styles.yesterdayDot} /> 어제
        </span>
      </div>

      <p className={styles.chartNote}>
        시간별 신규 참여자 · 세로축 최대 {formatNumber(maxCount)}명
      </p>

      <div className={styles.chartScroll}>
        <div className={styles.barChart}>
          {points.map((point) => {
            const today = point.todayCount;
            const yesterday = point.yesterdayCount;

            return (
              <div className={styles.hourColumn} key={point.hour}>
                <div
                  className={styles.barPair}
                  role="img"
                  aria-label={`${point.hour}시: 오늘 ${
                    today == null ? '미집계' : `${today}명`
                  }, 어제 ${yesterday}명`}
                  title={`${point.hour}시 · 오늘 ${
                    today == null ? '미집계' : `${today}명`
                  } / 어제 ${yesterday}명`}
                >
                  <div
                    className={styles.todayBar}
                    style={{
                      height:
                        today == null ? '0%' : `${(today / maxCount) * 100}%`,
                    }}
                  />

                  <div
                    className={styles.yesterdayBar}
                    style={{
                      height: `${(yesterday / maxCount) * 100}%`,
                    }}
                  />
                </div>

                <span className={styles.hourLabel}>
                  {point.hour % 3 === 0 ? `${point.hour}시` : ''}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <p className={styles.chartNote}>
        오늘 아직 도달하지 않은 시간은 미집계 상태입니다.
      </p>
    </>
  );
}