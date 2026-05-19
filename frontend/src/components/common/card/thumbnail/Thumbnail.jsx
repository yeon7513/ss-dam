import { SwiperSlide } from 'swiper/react';
import { HOST } from '../../../../lib/url';
import ImageBox from './../../image-box/ImageBox';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

function Thumbnail({ images = [] }) {
  const renderSlides = () => {
    // 이미지가 없을 경우, placeholder 이미지로 대체
    if (images.length === 0) {
      return (
        <SwiperSlide>
          <ImageBox src={null} />
        </SwiperSlide>
      );
    }

    // 기본적으로는 슬라이드 이미지로~
    return images.map((image, idx) => (
      <SwiperSlide key={idx}>
        <ImageBox src={`${HOST}${image.path}`} />
      </SwiperSlide>
    ));
  };

  // 최종 렌더링
  return renderSlides();
}

export default Thumbnail;
