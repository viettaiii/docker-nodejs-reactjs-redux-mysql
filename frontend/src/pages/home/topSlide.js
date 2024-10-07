import { Swiper, SwiperSlide } from "swiper/react";
import React from "react";
import { Navigation } from "swiper/modules";
import { sliders1} from "../../assets/sliders";
import LazyImage from "../../components/LazyImage";
function TopSlide() {
  return (
    <Swiper
      navigation={true}
      modules={[Navigation]}
      className="home__slider"
    >
      {sliders1.map((slider, idx) => (
        <SwiperSlide key={idx}>
          <LazyImage src={slider} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default React.memo(TopSlide);
