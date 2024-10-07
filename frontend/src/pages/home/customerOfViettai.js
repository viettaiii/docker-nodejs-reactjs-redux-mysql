import { Col, Row } from "react-bootstrap";
import LazyImage from "../../components/LazyImage";
import React from "react";
function CustomersOfVietTai() {
  return (
    <div className="container khachhang mt-5">
      <h3 className="text-uppercase my-3 text-center fw-bold">
        KHÁCH HÀNG CỦA <span className="text-secondary">VIẾT TÀI</span>
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
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default React.memo(CustomersOfVietTai);
