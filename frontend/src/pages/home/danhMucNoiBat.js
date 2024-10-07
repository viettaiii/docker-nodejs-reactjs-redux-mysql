import { Col } from "react-bootstrap";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Scrollbar } from "swiper/modules";
import LazyImage from "../../components/LazyImage";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../../features/category/categorySlice";
import { useNavigate } from "react-router-dom";
import { clientRoutes } from "../../routes";
import { setQueryProduct } from "../../features/product/productSlice";
function DanhMucNoiBat() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);
  const { categories } = useSelector((store) => store.category);
  return (
    <div className="container mt-5 danhmucnoibat">
      <h3 className="text-uppercase text-center mb-4">DANH MỤC NỔI BẬT</h3>
      <Swiper
        spaceBetween={25}
        navigation={true}
        scrollbar={true}
        modules={[Navigation, Autoplay, Scrollbar]}
        breakpoints={{
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
            slidesPerView: 6,
            spaceBetween: 25,
          },
        }}
      >
        {categories.map((category, index) => (
          <SwiperSlide key={index}>
            <Col className="item">
              <div
                onClick={() => {
                  dispatch(
                    setQueryProduct({ name: "categoryId", value: category.id })
                  );
                  navigate(clientRoutes.product.main + "/all");
                }}
                className="border-1 d-flex flex-column gap-1 align-items-center"
              >
                <LazyImage
                  src={
                 
                    category.image
                  }
                  alt={category.categoryName}
                />
                <span className="mt-2 text-size-16">
                  {category.categoryName}
                </span>
              </div>
            </Col>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default React.memo(DanhMucNoiBat);
