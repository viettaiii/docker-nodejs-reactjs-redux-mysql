import {
  faArrowLeftLong,
  faArrowRightLong,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import React from "react";
import { useMediaQuery } from "react-responsive";
import { Col, Row, Spinner } from "react-bootstrap";

// MY IMPORTS
import ProductItem from "../../components/Product/productItem";

import httpRequest from "../../api/httpRequest";
import ListProductSlide from "../../components/ListProductSlide";
import { clientRoutes } from "../../routes";
import { setQueryProduct } from "../../features/product/productSlice";
import ProductNone from "../../components/Product/productNone";
import PropTypes from "prop-types";
import { useDebounce } from "@uidotdev/usehooks";
import { setCacheProductType } from "../../features/cacheProduct";
function CategoryProduct({ category: cate, listSubCategory, title, list }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [category, setCategory] = useState(cate);
  const [indexActive, setIndexActive] = useState(0);
  const [products, setProducts] = useState();
  const isTabletOrMobile = useMediaQuery({
    query: "(max-width: 1024px)",
  });
  const debouncedSearchTerm = useDebounce(category, 500);
  useEffect(() => {
    const getProductsAsync = async (category) => {
      try {
        const { data } = await httpRequest.get("/products", {
          params: {
            name: category,
          },
        });
        setProducts(data.data);
        let type;
        if (category.startsWith("Apple")) type = "listAppleWatch";
        if (category.startsWith("Mac")) type = "listMac";
        if (category.startsWith("Iphone")) type = "listIphone";
        if (category.startsWith("Ipad")) type = "listIpad";
        dispatch(
          setCacheProductType({
            type,
            list: data.data,
          })
        );
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    };
    if (debouncedSearchTerm) getProductsAsync(category);
  }, [debouncedSearchTerm]);

  const handleQueryProductSubCategory = (index) => {
    setIsLoading(true);
    if (listSubCategory[index] === "All") {
      setCategory(cate);
    } else {
      setCategory(listSubCategory[index]);
    }
    setIndexActive(index);
  };
  // handle render responsive
  const createListProduct = () => {
    if (isLoading) {
      return (
        <div className="flex-center p-5">
          <Spinner animation="border" variant="primary" />
        </div>
      );
    }
    if (products && products.length <= 0) {
      return <ProductNone />;
    }
    if (isTabletOrMobile) {
      return (
        <ListProductSlide
          spaceBetween={25}
          slidesPerView={4}
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
          products={products}
        />
      );
    }
    return (
      <Row>
        {products &&
          products.map((product, index) => (
            <Col lg={3} key={index}>
              <ProductItem product={product} hiddenSold />
            </Col>
          ))}
      </Row>
    );
  };

  return (
    <div className="container mt-3 categoryProduct">
      <h3 className=" text-uppercase mt-5 mt-3 text-center fw-bold">{title}</h3>
      <div className="listSubcategory">
        <FontAwesomeIcon
          icon={faArrowLeftLong}
          className="me-2 d-none max-md-display icon "
        />
        <div className="d-flex justify-content-center align-items-center items">
          {listSubCategory.map((subCategory, index) => {
            return (
              <Fragment key={index}>
                <span
                  className={`item ${index === indexActive ? "active" : ""}`}
                  onClick={() => handleQueryProductSubCategory(index)}
                >
                  {subCategory}
                </span>
                {index !== listSubCategory.length - 1 && (
                  <small className="mx-2">/</small>
                )}
              </Fragment>
            );
          })}
        </div>
        <FontAwesomeIcon
          icon={faArrowRightLong}
          className="ms-2 d-none max-md-display icon "
        />
      </div>
      {createListProduct()}
      <div className="text-center">
        <div
          className="btn btn-outline-primary my-4 btn-md"
          onClick={() => {
            dispatch(setQueryProduct({ name: "discount", value: "false" }));
            navigate(clientRoutes.product.main + "/all");
          }}
        >
          <span>Xem tất cả</span>

          <FontAwesomeIcon icon={faChevronRight} shake className="ms-2" />
        </div>
      </div>
    </div>
  );
}

export default React.memo(CategoryProduct);

CategoryProduct.propTypes = {
  category: PropTypes.string,
  listSubCategory: PropTypes.array,
  title: PropTypes.string,
};
