import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Scrollbar } from "swiper/modules";
import React from "react";
import PropTypes from "prop-types";
// MY IMPORTS
import ProductItem from "../Product/productItem";
import ProductNone from "../Product/productNone";
function ListProductSlide({
  products = [],
  spaceBetween,
  slidesPerView,
  navigation,
  scrollbar,
  delay,
  breakpoints = {
    100: {
      slidesPerView: 1,
      spaceBetween: 50,
    },
    500: {
      slidesPerView: 2,
      spaceBetween: 10,
    },
    768: {
      slidesPerView: 4,
      spaceBetween: 10,
    },
    1024: {
      slidesPerView: 4,
      spaceBetween: 25,
    },
  },
  hiddenSold = false,
  hiddenDesc = false,
  cart = false,
  title,
}) {
  if (products && products.length < 0) return <ProductNone />;
  return (
    <Swiper
      spaceBetween={spaceBetween || 10}
      slidesPerView={slidesPerView || 4}
      navigation={navigation || true}
      scrollbar={scrollbar || true}
      modules={[Navigation, Autoplay, Scrollbar]}
      autoplay={{ delay: delay || 1000 * 60 * 20 }}
      breakpoints={breakpoints ? breakpoints : {}}
      className="list-product-slide"
    >
      {products.map((product, index) => (
        <SwiperSlide key={index}>
          <ProductItem
            product={product}
            hiddenSold={hiddenSold}
            hiddenDesc={hiddenDesc}
            cart={cart}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default React.memo(ListProductSlide);

ListProductSlide.propTypes = {
  products: PropTypes.array,
  spaceBetween: PropTypes.number,
  slidesPerView: PropTypes.number,
  navigation: PropTypes.bool,
  scrollbar: PropTypes.bool,
  delay: PropTypes.number,
  breakpoints: PropTypes.object,
  hiddenSold: PropTypes.bool,
  hiddenDesc: PropTypes.bool,
  cart: PropTypes.bool,
  title: PropTypes.string,
};
