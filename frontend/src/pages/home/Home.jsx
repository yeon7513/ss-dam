import Carousel from "./carousel/Carousel";
import ChallengeQuickMenu from "./challenge-quick-menu/ChallengeQuickMenu";
import styles from "./Home.module.scss";
import LatestMarketProducts from "./lastest-market-products/LatestMarketProducts";
import TrendingFeeds from "./trending-feeds/TrendingFeeds";

function Home() {
  return (
    <main className={styles.wrap}>
      <Carousel />
      <div className={styles.container}>
        <ChallengeQuickMenu />
        <TrendingFeeds />
        <LatestMarketProducts />
      </div>
    </main>
  );
}

export default Home;
