import { useParams } from "react-router-dom";
import { Col, Pagination, Row, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Scrollbar } from "swiper/modules";
import { memo, useEffect, useMemo } from "react";
import PropTypes from "prop-types";
// MY IMPORTS
import useScrollTop from "../../hooks/useScrollTop";
import {
  getProducts,
  setQueryProduct,
} from "../../features/product/productSlice";
import Breadcrumb from "../../components/Breadcrumb";
import HelmetCustom from "../../components/HelmetCustom";
import ProductItem from "../../components/Product/productItem";
import LazyImage from "../../components/LazyImage";
import BarQuery from "./barQuery";
import ProductNone from "../../components/Product/productNone";
import NavSearch from "../../components/Search/NavSearch";
import { getColors } from "../../features/color/colorSlice";
import { getProviders } from "../../features/provider/providerSlice";
import { useDebounce } from "@uidotdev/usehooks";

const optionsName = {
  "san-pham-khuyen-mai": "Sản phẩm khuyến mãi",
  "tat-ca": "Tất cả sản phẩm",
};
function Products() {
  useScrollTop();
  const dispatch = useDispatch();
  const { name } = useParams();
  const { products, query, page, totalPages, isLoading } = useSelector(
    (store) => store.product
  );
  const { optionChoose } = useSelector((store) => store.navSearch);
  useEffect(() => {
    if (isLoading) return;
    dispatch(getProducts());
  }, [dispatch, query, optionChoose]);
  useEffect(() => {
    dispatch(getColors());
    dispatch(getProviders());
  }, []);

  const title = useMemo(() => optionsName[name], optionsName[name]);
  return (
    <div className="product-query">
      {/*  TỐI ƯU */}
      <Breadcrumb title={title} />
      <HelmetCustom title={title} />
      <div className="container">
        <h3 className="text-center fw-bold text-size-26 mb-2">{title}</h3>
        <div
          style={{
            backgroundImage: `url("https://res.cloudinary.com/dkkh1gtoj/image/upload/v1698041921/viettaiit-ecommerce/frontend-images/sliders/slider-1/1_xzscxa.webp")`,
            paddingTop: "25%",
            border: "10px",
          }}
        ></div>

        {/* sub categories */}

        <SubCategories categoryId={query.categoryId} />

        {/* bar query */}
        <BarQuery sortValue={query["sort"]} />

        {/* LIST PRODUCT */}

        <div>
          {isLoading ? (
            <div className="flex-center p-5">
              <Spinner animation="border" variant="primary" />
            </div>
          ) : (
            <Row>
              {products && products.length > 0 ? (
                products.map((product, index) => (
                  <Col xs={12} sm={6} md={4} lg={3} key={index}>
                    <ProductItem product={product} />
                  </Col>
                ))
              ) : (
                <ProductNone />
              )}
            </Row>
          )}

          <div className="my-4 d-flex align-items-center justify-content-center">
            <Pagination>
              <Pagination.Prev
                disabled={page === 1}
                onClick={() => {
                  var curPage;
                  if (page <= 1) curPage = totalPages;
                  else curPage = page - 1;
                  dispatch(setQueryProduct({ name: "page", value: curPage }));
                }}
              />
              {Array.from({ length: totalPages }, (_, index) => (
                <Pagination.Item
                  onClick={() => {
                    dispatch(
                      setQueryProduct({ name: "page", value: index + 1 })
                    );
                  }}
                  key={index + 1}
                  active={page === index + 1}
                >
                  {index + 1}
                </Pagination.Item>
              ))}
              <Pagination.Next
                disabled={page === totalPages}
                onClick={() => {
                  var curPage;
                  if (page >= totalPages) curPage = 1;
                  else curPage = page + 1;
                  dispatch(setQueryProduct({ name: "page", value: curPage }));
                }}
              />
            </Pagination>
          </div>
        </div>
      </div>{" "}
      <NavSearch />
    </div>
  );
}

export default Products;

const SubCategories = memo(function SubCategories({ categoryId }) {
  const { categories } = useSelector((store) => store.category);
  const dispatch = useDispatch();
  const handleQueryProduct = (name, value) => {
    dispatch(setQueryProduct({ name, value }));
  };
  return (
    <div className="sub-categories">
      <Swiper
        spaceBetween={25}
        navigation={true}
        scrollbar={true}
        modules={[Navigation, Autoplay, Scrollbar]}
        breakpoints={{
          100: {
            slidesPerView: 2,
            spaceBetween: 50,
          },
          500: {
            slidesPerView: 3,
            spaceBetween: 10,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 10,
          },
          1024: {
            slidesPerView: 7,
            spaceBetween: 25,
          },
        }}
        className="list-product-slide items"
      >
        <>
          <SwiperSlide
            className={`item ${categoryId ? "" : "active"}`}
            onClick={() => handleQueryProduct("categoryId", "all")}
          >
            <span>
              <LazyImage
                className="w-100 h-100 rounded-circle"
                src={require("../../assets/no-image.webp")}
                alt=""
              />
            </span>
            <small>All</small>
          </SwiperSlide>
          {categories.map((category, index) => (
            <SwiperSlide
              className={`item ${categoryId === category.id ? "active" : ""}`}
              key={index}
              onClick={() => handleQueryProduct("categoryId", category.id)}
            >
              <span>
                <LazyImage
                  src={
             
                    category.image
                  }
                  alt=""
                />
              </span>
              <small>{category.categoryName}</small>
            </SwiperSlide>
          ))}
        </>
      </Swiper>
    </div>
  );
});

SubCategories.propTypes = {
  categoryId: PropTypes.string,
};
