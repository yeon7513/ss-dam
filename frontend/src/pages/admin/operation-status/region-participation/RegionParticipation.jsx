import Card from '../../../../components/common/card/Card.jsx';
import styles from './RegionParticipation.module.scss';

const RegionParticipation = ({
      participationData = [],
      loading = false,
      error = "",
    }) => {
  return (
    <Card className={styles.bottomCard}>
      <div className={styles.cardHeader}>
        <h3>지역별 참여도</h3>
        <span>전체 챌린지 · 중복 제외</span>
      </div>

      {loading ? (
          <p className={styles.empty}>지역별 참여도를 불러오는 중입니다.</p>
        ) : error ? (
          <p className={styles.empty} role="alert">{error}</p>
        ) : participationData.length === 0 ? (
          <p className={styles.empty}>참여 데이터가 없습니다.</p>
        ) : (
        <ul className={styles.regionList} aria-label="지역별 참여 인원과 비율">
          {participationData.map((region) => (
            <li key={region.regionName} className={styles.regionRow}>
              <span className={styles.regionName}>
                <span className={styles.regionIcon} aria-hidden="true">
                  ◎
                </span>
                {region.regionName}
              </span>

              <strong className={styles.rate}>
                {region.participationRate == null
                  ? '-'
                  : `${region.participationRate.toFixed(1)}%`}
              </strong>

              <span className={styles.count}>
                {region.participationCount.toLocaleString()}명
              </span>
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
};

export default RegionParticipation;