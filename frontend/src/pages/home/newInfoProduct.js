import React from "react";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import LazyImage from "../../components/LazyImage";
import { Button, Col, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
function NewInfoProduct() {
  return (
    <div className="section-new-info mt-4">
      <div className="container">
        <h3 className="text-uppercase my-3 text-center fw-bold">
          THÔNG TIN SẢN PHẨM MỚI
        </h3>
        <Row className=" align-items-center">
          <Col sm={12} md={6}>
            <p className="text-secondary">iPhone 15 - 15 Pro Max</p>
            <h2 className="fw-bold">
              iPhone 15 Pro Max sẽ có viền màn hình mỏng nhất thế giới.
            </h2>
            <p className="text-size-16 lh-lg fw-light">
              Theo Apple Insider, dựa trên những bản CAD (thiết kế có sự hỗ trợ
              của máy tính) rò rỉ gần đây, iPhone 15 Pro Max có thể dày hơn
              iPhone 14 Pro Max, mặc dù phần lồi camera nhỏ hơn một chút. Thông
              tin mới nhất từ chuyên gia rò rỉ Ice Universe tiết lộ kích thước
              1,55 mm của phần khung viền trên iPhone 15 Pro Max sẽ phá kỷ lục
              trước đó được thiết lập bởi Xiaomi 13 là 1,81mm.
            </p>

            <Button variant="primary btn-md hover-bg-secondary">
              <span>Xem thêm</span>
              <FontAwesomeIcon icon={faChevronRight} shake className="ms-2" />
            </Button>
          </Col>
          <Col sm={12} md={6}>
            <motion.div
              animate={{ y: [0, 2, 4, 6, 8, 10, 8, 6, 4, 2, 0] }}
              transition={{
                duration: 4,
                ease: "easeInOut",
                repeat: Infinity,
              }}
            >
              <LazyImage
                src="https://res.cloudinary.com/dkkh1gtoj/image/upload/v1698041029/viettaiit-ecommerce/frontend-images/section/section_banner_new_product_suqcmt.webp"
                alt=""
              />
            </motion.div>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default React.memo(NewInfoProduct);
