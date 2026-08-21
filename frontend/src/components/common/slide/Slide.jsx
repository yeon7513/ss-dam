import cn from "classnames";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import styles from "./Slide.module.scss";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import ImageBox from "../image-box/ImageBox.jsx";
import { HOST } from "../../../lib/url.js";

// Slide 컴포넌트 사용법
// <Slide> 안에 <SwiperSlide>를 import해서 사용하세요!!
// import { SwiperSlide } from 'swiper/react';
// <SwiperSlide>가 하나의 슬라이드 콘텐츠 입니다.

function Slide({ children, images, className, isLoop = false, isAutoplay = false }) {

  console.log("슬라이드 이미지: ", images);

  // children이 있을 경우
  if (children) {
    return (
      <Swiper
        pagination={true}
        loop={isLoop}
        autoplay={
          isAutoplay && {
            delay: 2500,
            disableOnInteraction: false,
          }
        }
        modules={[Pagination, Navigation, isAutoplay ? Autoplay : ""]}
        className={cn(styles.wrap, className)}
      >
        {children}
      </Swiper>
    )
  }

  // 이미지가 없을 경우,
  // 슬라이드 X, placeholder 이미지로 대체
  if (!images || images.length === 0) {
    return (
      <ImageBox src={null} />
    );
  }

  // 기본 슬라이드
  if (!children && images.length > 0) {
    return (
      <Swiper
        pagination={true}
        loop={isLoop}
        autoplay={
          isAutoplay && {
            delay: 2500,
            disableOnInteraction: false,
          }
        }
        modules={[Pagination, Navigation, isAutoplay ? Autoplay : ""]}
        className={cn(styles.wrap, className)}
      >
        {!images > 0 && images.map((image, idx) => (
          <SwiperSlide key={idx} className={styles.thumb}>
            <ImageBox src={`${HOST}${image.path}`} />
          </SwiperSlide>
        ))}
      </Swiper>
    );
  }
}

export default Slide;
