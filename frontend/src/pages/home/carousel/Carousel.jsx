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
          <ImageBox src="https://plus.unsplash.com/premium_photo-1780500270657-d4fa79d19b39?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
          <div className={styles.content}>
            <h2>쓰담쓰담 소개</h2>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ab
              voluptatibus, quod sit dolor quaerat similique?
            </p>
          </div>
        </SwiperSlide>
        <SwiperSlide className={cn(styles.item, styles.market)}>
          <ImageBox src="https://plus.unsplash.com/premium_photo-1780605742275-e5cb1d5b340e?q=80&w=1193&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
          <div className={styles.content}>
            <h2>다시쓰담 소개</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Adipisci, quam.
            </p>
          </div>
        </SwiperSlide>
        <SwiperSlide className={cn(styles.item, styles.feed)}>
          <ImageBox src="https://images.unsplash.com/photo-1780547300423-c6a539738adb?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
          <div className={styles.content}>
            <h2>챌린지 및 피드 소개</h2>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. A
              excepturi ipsum tenetur dignissimos voluptatum rem ipsa fugiat
              maxime, veritatis quae quibusdam sapiente est suscipit,
              voluptatibus porro? Temporibus saepe nulla perspiciatis!
            </p>
          </div>
        </SwiperSlide>
        <SwiperSlide className={cn(styles.item, styles.notice)}>
          <ImageBox src="https://plus.unsplash.com/premium_photo-1780666389668-7c723130218e?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
          <div className={styles.content}>
            <h2>공지사항 및 유의사항</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum,
              expedita?
            </p>
          </div>
        </SwiperSlide>
      </Slide>
    </section>
  );
}

export default Carousel;
