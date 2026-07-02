import FeedCard from "../../../components/feed/feed-card/FeedCard";
import styles from "./TrendingFeeds.module.scss";

const testFeeds = []

const TrendingFeeds = () => {
  return (
    <section className={styles.trendingFeeds}>
      <div className={styles.title}>
        <h2>다들 어떻게 실천하고 있을까요?</h2>
        <p>
          소소하지만 확실한 환경 보호 인증샷! 서로 칭찬하고 영감도 얻어보세요.
        </p>
      </div>
      {/* 임시 데이터 */}
      <div className={styles.contents}>
        {testFeeds.map((feed) => (
          <FeedCard key={feed.code} feed={feed} />
        ))}
      </div>
    </section>
  );
};

export default TrendingFeeds;
