import { Col, Row } from "react-bootstrap";
import LazyImage from "../../components/LazyImage";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
function TinTucCongNghe() {
  return (
    <div>
      <div className="container tintuc">
        <h3 className="text-uppercase my-3 text-center fw-bold">
          TIN TỨC <span className="text-secondary fw-bold">CÔNG NGHỆ</span>
        </h3>
        <Row>
          <Col sm={12} md={6} lg={3}>
            <div className="item">
              {" "}
              <div className="image">
                <LazyImage
                  src="https://res.cloudinary.com/dkkh1gtoj/image/upload/c_fit,w_313,h_176/v1698041213/viettaiit-ecommerce/frontend-images/tin-tuc/tintuc01_axseyn.webp"
                  alt=""
                />
              </div>
              <h6 className="px-2 my-2">
                iPhone đã đúng khi không đụng đến tính năng này suốt những năm
                qua - Đình đám một thời nay đã chết yểu"
              </h6>
              <p className="px-2 my-2 fw-light">
                iPhone vẫn kiên định với thiết kế tai thỏ suốt nhiều năm dù bị
                nhiều người dùng chỉ trích. Thế nhưng, có vẻ như Apple một lần
              </p>
              <span className="px-2 my-2 d-flex gap-1 align-items-center pb-2">
                <FontAwesomeIcon icon={faClock} />
                <small>28/04/2023</small>
              </span>
            </div>
          </Col>
          <Col sm={12} md={6} lg={3}>
            <div className="item">
              {" "}
              <div className="image">
                <LazyImage
                  src="https://res.cloudinary.com/dkkh1gtoj/image/upload/c_fit,w_313,h_176/v1698041220/viettaiit-ecommerce/frontend-images/tin-tuc/tintuc02_qpvq0p.webp"
                  alt=""
                />
              </div>
              <h6 className="px-2 my-2">
                iPhone đã đúng khi không đụng đến tính năng này suốt những năm
                qua - Đình đám một thời nay đã chết yểu"
              </h6>
              <p className="px-2 my-2 fw-light">
                iPhone vẫn kiên định với thiết kế tai thỏ suốt nhiều năm dù bị
                nhiều người dùng chỉ trích. Thế nhưng, có vẻ như Apple một lần
              </p>
              <span className="px-2 my-2 d-flex gap-1 align-items-center pb-2">
                <FontAwesomeIcon icon={faClock} />
                <small>28/04/2023</small>
              </span>
            </div>
          </Col>
          <Col sm={12} md={6} lg={3}>
            <div className="item">
              {" "}
              <div className="image">
                <LazyImage
                  src="https://res.cloudinary.com/dkkh1gtoj/image/upload/c_fit,w_313,h_176/v1698041222/viettaiit-ecommerce/frontend-images/tin-tuc/tintuc03_w9oai1.webp"
                  alt=""
                />
              </div>
              <h6 className="px-2 my-2">
                iPhone đã đúng khi không đụng đến tính năng này suốt những năm
                qua - Đình đám một thời nay đã chết yểu"
              </h6>
              <p className="px-2 my-2 fw-light">
                iPhone vẫn kiên định với thiết kế tai thỏ suốt nhiều năm dù bị
                nhiều người dùng chỉ trích. Thế nhưng, có vẻ như Apple một lần
              </p>
              <span className="px-2 my-2 d-flex gap-1 align-items-center pb-2">
                <FontAwesomeIcon icon={faClock} />
                <small>28/04/2023</small>
              </span>
            </div>
          </Col>
          <Col sm={12} md={6} lg={3}>
            <div className="item">
              {" "}
              <div className="image">
                <LazyImage
                  src="https://res.cloudinary.com/dkkh1gtoj/image/upload/c_fit,w_313,h_176/v1698041223/viettaiit-ecommerce/frontend-images/tin-tuc/tintuc04_xmhkzi.webp"
                  alt=""
                />
              </div>
              <h6 className="px-2 my-2">
                iPhone đã đúng khi không đụng đến tính năng này suốt những năm
                qua - Đình đám một thời nay đã chết yểu"
              </h6>
              <p className="px-2 my-2 fw-light">
                iPhone vẫn kiên định với thiết kế tai thỏ suốt nhiều năm dù bị
                nhiều người dùng chỉ trích. Thế nhưng, có vẻ như Apple một lần
              </p>
              <span className="px-2 my-2 d-flex gap-1 align-items-center pb-2">
                <FontAwesomeIcon icon={faClock} />
                <small>28/04/2023</small>
              </span>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default React.memo(TinTucCongNghe);
