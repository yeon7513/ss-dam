import React from "react";
import styles from "./MarketGuide.module.scss";

console.log(styles);
const MarketGuide = () => {
  return (
    <main className={styles.marketguide}>
      <section className={styles.marketintro}>
        <div className={styles.content}>
          <h2 className={styles.title}>
            마켓
            <br /> 이용
            <br /> 가이드
          </h2>

          <div className={styles.grid}>
            <div className={styles.card}>
              <h3 className={styles.cardtitle}>
                물건에 새로운 가치를 연결해요
              </h3>
              <p className={styles.cardtext}>
                사용하지 않는 물건을 필요한 사람에게 다시 연결하며 버려지는
                자원을 줄이는 중고거래 공간입니다.
              </p>
            </div>

            <div className={styles.card}>
              <h3 className={styles.cardtitle}>환경을 위한 소비를 실천해요</h3>
              <p className={styles.cardtext}>
                새 제품 구매를 줄이고 재사용을 통해 일상 속 친환경 소비 문화를
                만들어갑니다.
              </p>
            </div>

            <div className={styles.card}>
              <h3 className={styles.cardtitle}>작은 실천이 큰 변화가 돼요</h3>
              <p className={styles.cardtext}>
                하나의 거래가 쓰레기를 줄이고 더 지속 가능한 생활로 이어질 수
                있습니다.
              </p>
            </div>

            <div className={styles.card}>
              <h3 className={styles.cardtitle}>함께 만드는 따뜻한 거래</h3>
              <p className={styles.cardtext}>
                판매와 구매를 넘어 서로 필요한 물건을 나누며 가치 있는 순환
                소비를 경험할 수 있어요.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default MarketGuide;
