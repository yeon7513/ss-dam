import { SwiperSlide } from 'swiper/react';
import { HOST } from '../../../../lib/url';
import styles from '../../../../pages/feed/Feed.module.scss';
import ImageBox from './../../image-box/ImageBox';

import 'swiper/css';
import Slide from '../../slide/Slide';

function Thumbnail({ images = [] }) {
  const renderSlides = () => {
    // 이미지가 없을 경우, placeholder 이미지로 대체
    if (images.length === 0) {
      return (
        <Slide>
          <SwiperSlide>
            <ImageBox src={null} />
          </SwiperSlide>
        </Slide>
      );
    }

    // 기본적으로는 슬라이드 이미지로~
    return (
      <Slide>
        {images.map((image, idx) => (
          <SwiperSlide key={idx} className={styles.thumb}>
            <ImageBox src={`${HOST}${image.path}`} />
          </SwiperSlide>
        ))}
      </Slide>
    );
  };

  // 최종 렌더링
  return renderSlides();
}

export default Thumbnail;
