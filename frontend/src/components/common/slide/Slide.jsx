import cn from 'classnames';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper } from 'swiper/react';
import styles from './Slide.module.scss';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Slide 컴포넌트 사용법
// <Slide> 안에 <SwiperSlide>를 import해서 사용하세요!!
// import { SwiperSlide } from 'swiper/react';
// <SwiperSlide>가 하나의 슬라이드 콘텐츠 입니다.

function Slide({ children, className }) {
  return (
    <Swiper
      pagination={true}
      modules={[Pagination, Navigation]}
      className={cn(styles.wrap, className)}
    >
      {children}
    </Swiper>
  );
}

export default Slide;
