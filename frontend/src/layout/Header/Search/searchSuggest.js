import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFire } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";
import { navigateAndAttachQuery } from "../../../utils/attachQueryToURL";
import { clientRoutes } from "../../../routes";
import { Col, Row, Spinner } from "react-bootstrap";
import LazyImage from "../../../components/LazyImage";
import { formatCurrency } from "../../../utils/format";
import { calculatePriceForDiscount } from "../../../utils/calculatePrice";
import ProductNone from "../../../components/Product/productNone";
const listSuggestSearch = [
  "IPhone 11",
  "IPhone 12",
  "Macbook Pro",
  "Macbook Air",
  "Sạc nhanh",
  "Cáp Type C",
];
const search = {
  initial: { height: 0, opacity: 0, display: "none" },
  focus: { height: "auto", opacity: 1, display: "block" },
  blur: { height: 0, opacity: 0, display: "none" },
  transition: { duration: 2, ease: "linear" },
};
function SearchSuggest({ isVisible, products, isSearching }) {
  const navigate = useNavigate();
  return (
    <motion.div
      variants={search}
      initial="initial"
      animate={isVisible ? "focus" : "blur"}
      transition="transition"
      className="suggest"
    >
      <div className="suggest__top">
        <FontAwesomeIcon icon={faFire} />
        <span>TÌM KIẾM NHIỀU NHẤT</span>
      </div>
      {/* <Form action="/san-pham/search" method="GET" ref={formRef}> */}
      <div className="suggest__bottom">
        {listSuggestSearch.map((item, idx) => (
          <span
            key={idx}
            onClick={() =>
              navigateAndAttachQuery(clientRoutes.product.search, navigate, {
                name: item,
              })
            }
          >
            {item}
          </span>
        ))}
      </div>
      {isSearching ? (
        <div className="flex-center p-3">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : (
        products && (
          <div
            className="d-flex flex-column gap-1 text-black scrollbar-primary"
            style={{
              overflowY: "scroll",
              overflowX: "hidden",
              maxHeight: "300px",
            }}
          >
            {products.length > 0 ? (
              products.map((product, index) => (
                <Link
                  to={clientRoutes.product.detail + "/" + product.slug}
                  className="border-bottom p2"
                  key={index}
                >
                  <div className="p-2 hover-bg-gray-25">
                    <Row>
                      <Col xs={1}>
                        <LazyImage src={product.image} />
                      </Col>
                      <Col xs={11}>
                        <div className="d-flex flex-column gap-1">
                          <span className="text-size-13">{product.name}</span>
                          <div className="d-flex gap-2 text-size-12">
                            <span className="text-danger fw-bold">
                              {formatCurrency(
                                calculatePriceForDiscount(
                                  product.price,
                                  product.discount
                                )
                              )}
                            </span>
                            <span className=" text-decoration-line-through opacity-75">
                              {formatCurrency(product.price)}
                            </span>
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </Link>
              ))
            ) : (
              <ProductNone />
            )}
          </div>
        )
      )}

      {/* </Form> */}
    </motion.div>
  );
}

export default SearchSuggest;

SearchSuggest.propTypes = {
  isVisible: PropTypes.bool,
  products: PropTypes.any,
  isSearching: PropTypes.bool,
};
