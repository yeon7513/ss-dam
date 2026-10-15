import cn from "classnames";
import { SwiperSlide } from "swiper/react";
import Slide from "../../../components/common/slide/Slide";
import ImageBox from "./../../../components/common/image-box/ImageBox";
import styles from "./Carousel.module.scss";

// 임시 이미지 넣었음 -> 나중에 수정할 것
function Carousel() {
  return (
    <section className={styles.carousel}>
      <Slide isAutoplay={true} isLoop={true}>
        <SwiperSlide className={cn(styles.item, styles.introduce)}>
          <ImageBox src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=1200&auto=format&fit=crop" />
          <div className={styles.content}>
            <h2>쓰담쓰담으로 시작하는 초록빛 일상</h2>
            <p>
              지구도 구하고 내 멘탈도 케어하는 진짜 가치소비 모먼트예요. <br />
              작고 소소한 그린 리추얼 하나로 매일 더 스페셜한 일상을 완성해요.
            </p>
          </div>
        </SwiperSlide>

        <SwiperSlide className={cn(styles.item, styles.market)}>
          <ImageBox src="https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?q=80&w=1200&auto=format&fit=crop" />
          <div className={styles.content}>
            <h2>버리지 말고 다시 쓰담!</h2>
            <p>
              나에겐 살짝 멀어진 취향이 누군가에겐 취향 저격 보물이 돼요. <br />
              버려짐 없이 온기까지 연결되는 세상에서 가장 힙하고 알뜰한
              나눔이에요.
            </p>
          </div>
        </SwiperSlide>

        <SwiperSlide className={cn(styles.item, styles.notice)}>
          <ImageBox src="https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?q=80&w=1200&auto=format&fit=crop" />
          <div className={styles.content}>
            <h2>요즘 제일 핫한 갓생, 그린 라이프</h2>
            <p>
              감성 텀블러부터 마이 에코백까지, 요즘 갓생러들의 똑똑한 일상
              루틴이에요. <br />
              무심한 듯 센스 있는 실천으로 나만의 차별화된 친환경 라이프를
              즐겨요.
            </p>
          </div>
        </SwiperSlide>
      </Slide>
    </section>
  );
}

export default Carousel;
