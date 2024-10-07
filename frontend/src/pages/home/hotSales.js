import { Button } from "react-bootstrap";
import ListProductSlide from "../../components/ListProductSlide";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { IconFire } from "../../assets/icons";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useMemo } from "react";
import {
  getProductsHotSales,
  setQueryProduct,
} from "../../features/product/productSlice";
import { useNavigate } from "react-router-dom";
import { clientRoutes } from "../../routes";
import CountdownTimer from "../../components/CoutdownTimer";

function HotSales() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getProductsHotSales());
  }, [dispatch]);
  const { productsHotSales } = useSelector((store) => store.product);
  const memoizedProductsHotSales = useMemo(
    () => productsHotSales,
    [productsHotSales]
  );
  return (
    <div className="container">
      <div className="block-sale">
        <div className="block-sale__top">
          <span className="block-sale__top__left">
            <p>HOT SALE CUỐI TUẦN</p>
            <IconFire />
          </span>
          <CountdownTimer />
        </div>
        <ListProductSlide
          spaceBetween={25}
          slidesPerView={4}
          delay={3000}
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
              slidesPerView: 4,
              spaceBetween: 25,
            },
          }}
          products={memoizedProductsHotSales}
        />
        <div className="d-flex justify-content-center align-items-center pb-3">
          <Button
            className="hover-bg-secondary btn-md btn-icon-text btn-md"
            variant="primary"
            onClick={() => {
              dispatch(setQueryProduct({ name: "discount", value: "true" }));
              navigate(clientRoutes.product.sales);
            }}
          >
            Xem tất cả
            <FontAwesomeIcon className="btn-icon-append" icon={faAngleRight} />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default React.memo(HotSales);
