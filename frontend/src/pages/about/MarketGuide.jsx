import React from "react";
import styles from "./MarketGuide.module.scss";
import cn from "classnames";

console.log(styles);
const MarketGuide = () => {
  return (
    <div className={styles.main}>
      {/* 왼쪽 고정제목 영역 */}
      <section className={styles.movingTitle}>
        <h2 className={styles.mainTitle}>
          마켓
          <br /> 이용
          <br /> 가이드
        </h2>
      </section>

      {/* 오른쪽 콘텐츠 영역 */}
      <section className={styles.content}>
        {/* 다시쓰담 소개 */}
        <article className={styles.intro}>
          <h3 className={styles.subTitle}>🍀다시쓰담 소개</h3>

          <div className={styles.grid}>
            <div className={cn(styles.card, styles.leftTop)}>
              <h4 className={styles.cardTitle}>
                물건에 <span className={styles.pointText}>새로운 가치</span>를
                연결해요
              </h4>
              <p className={styles.cardText}>
                사용하지 않는 물건을 필요한 사람에게 다시 연결하며 버려지는
                자원을 줄이는 중고거래 공간입니다.
              </p>
            </div>

            <div className={cn(styles.card, styles.rightTop)}>
              <h4 className={styles.cardTitle}>
                <span className={styles.pointText}>환경을 위한 소비</span>를
                실천해요
              </h4>
              <p className={styles.cardText}>
                새 제품 구매를 줄이고 재사용을 통해 일상 속 친환경 소비 문화를
                만들어갑니다.
              </p>
            </div>

            <div className={cn(styles.card, styles.leftBottom)}>
              <h4 className={styles.cardTitle}>
                <span className={styles.pointText}>작은 실천</span>이 큰 변화가
                돼요
              </h4>
              <p className={styles.cardText}>
                하나의 거래가 쓰레기를 줄이고 더 지속 가능한 생활로 이어질 수
                있습니다.
              </p>
            </div>

            <div className={cn(styles.card, styles.rightBottom)}>
              <h4 className={styles.cardTitle}>
                함께 만드는
                <span className={styles.pointText}> 따뜻한 거래</span>
              </h4>
              <p className={styles.cardText}>
                판매와 구매를 넘어 서로 필요한 물건을 나누며 가치 있는 순환
                소비를 경험할 수 있어요.
              </p>
            </div>
          </div>
        </article>

        {/* 다시쓰담 이용가이드 */}
        <article className={styles.guide}>
          <h3 className={styles.subTitle}>📖다시쓰담 이용가이드</h3>

          {/* 거래 진행 과정 */}
          <div className={styles.stepProcess}>
            <h4 className={styles.contentTitle}>거래 진행 과정</h4>
            <div>
              <div className={styles.stepTitle}>
                <h5 className={styles.stepText}>
                  <span className={styles.stepBox}>STEP 01</span> 구매자가
                  거래글의 [채팅하기] 버튼을 눌러 거래를 요청한다.
                </h5>
              </div>

              <div className={styles.stepTitle}>
                <h5 className={styles.stepText}>
                  <span className={styles.stepBox}>STEP 02</span> 채팅을 통해
                  판매자와 구매자는 상호협의하여 거래의사를 확인한다.
                </h5>
              </div>

              <div className={styles.stepTitle}>
                <h5 className={styles.stepText}>
                  <span className={styles.stepBox}>STEP 03</span> 거래가
                  성사되면 구매자는 협의된 거래 금액을 판매자에게
                  포인트송금한다.
                </h5>
              </div>

              <div className={styles.stepTitle}>
                <h5 className={styles.stepText}>
                  <span className={styles.stepBox}>STEP 04</span> 접선 장소를
                  상호협의하여 약속을 잡고 직거래를 한다.
                </h5>
              </div>

              <div className={styles.stepTitle}>
                <h5 className={styles.stepText}>
                  <span className={styles.stepBox}>STEP 05</span> 판매자가
                  구매자에게 물품 전달 후, 상호간 거래완료(판매완료 및 구매완료)
                  버튼을 누른다.
                </h5>
              </div>

              <div className={styles.stepTitle}>
                <h5 className={styles.stepText}>
                  <span className={styles.stepBox}>STEP 06</span> 구매자가
                  사전에 송금한 포인트가 판매자에게 포인트적립된다.
                </h5>
              </div>
            </div>
          </div>
        </article>

        {/* 이용 시 유의사항 */}
        <article className={styles.notice}>
          <h3 className={styles.subTitle}>🚨이용 시 유의사항</h3>

          <div>
            <h4 className={styles.contentTitle}>우리 모두 안전하게 거래해요</h4>
            <ul className={styles.noticeList}>
              <li>거래 전 상품 정보를 충분히 확인해주세요.</li>
              <li>직거래 시에는 사람이 많은 안전한 장소를 이용해주세요.</li>
              <li>개인정보 및 계좌 정보 공유에 주의해주세요.</li>
            </ul>
          </div>

          <div>
            <h4 className={styles.contentTitle}>문의 안내</h4>
            <p className={styles.contentText}>
              고객센터의 자주 묻는 질문 페이지를 참조해주세요.
            </p>
          </div>
        </article>
      </section>
    </div>
  );
};

export default MarketGuide;
