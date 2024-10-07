import { Col, Row } from "react-bootstrap";
import RegisterReceiveNewsLetter from "./registerReceiveNewsLetter";
import { Link } from "react-router-dom";
import LazyImage from "../../components/LazyImage";

function Footer() {
  return (
    <div>
      <RegisterReceiveNewsLetter />
      <div className=" bg-primary text-white mt-1">
        <div className="container py-4 ">
          <Row>
            <Col xs={12} lg={4}>
              <Link
                to={"/"}
                className={`logo d-block fs-4 text-white rounded w-50 `}
                style={{
                  width: "120px",
                }}
              >
                <LazyImage src="https://res.cloudinary.com/dkkh1gtoj/image/upload/v1717317641/logo_tfhi3m.png" alt="" />
              </Link>
              <div className="d-flex flex-column gap-3 text-size-16">
                {" "}
                <span>
                  Hệ thống cửa hàng E-COMMERCE chuyên bán lẻ điện thoại, máy
                  tính laptop, smartwatch, smarthome, phụ kiện chính hãng - Giá
                  tốt, giao miễn phí.
                </span>
                <span>Địa chỉ: 255 Hải Châu, Đà Nẵng</span>
                <span>Điện thoại: 000 000 000</span>
                <span>Email: group3@gmail.com</span>
              </div>
            </Col>
            <Col xs={12} lg={2}>
              <div className="d-flex flex-column gap-3">
                {" "}
                <span>CHÍNH SÁCH</span>
                <span>Chính sách mua hàng</span>
                <span>Chính sách đổi trả</span>
                <span>Chính sách vận chuyển</span>
                <span>Chính sách bảo mật</span>
                <span>Cam kết cửa hàng</span>
              </div>
            </Col>
            <Col xs={12} lg={2}>
              <div className="d-flex flex-column gap-3">
                <span>HƯỚNG DẪN</span>
                <span>Hướng dẫn mua hàng</span>
                <span>Hướng dẫn đổi trả</span>
                <span>Hướng dẫn chuyển khoản</span>
                <span>Hướng dẫn trả góp</span>
                <span>Hướng dẫn hoàn hàng</span>{" "}
              </div>
            </Col>
            <Col xs={12} lg={4}>
              <div className="d-flex flex-column gap-3">
                {" "}
                <span>KẾT NỐI VỚI CHÚNG TÔI</span>
                <div className="d-flex gap-2">
                  <LazyImage
                    src="https://bizweb.dktcdn.net/100/480/632/themes/900313/assets/facebook_2.svg?1696132938724"
                    style={{ width: "35px" }}
                  />
                  <LazyImage
                    src="https://bizweb.dktcdn.net/100/480/632/themes/900313/assets/instagram_1.svg?1696132938724"
                    style={{ width: "35px" }}
                  />
                  <LazyImage
                    src="https://bizweb.dktcdn.net/100/480/632/themes/900313/assets/shopee.svg?1696132938724"
                    style={{ width: "35px" }}
                  />
                  <LazyImage
                    src="https://bizweb.dktcdn.net/100/480/632/themes/900313/assets/lazada.svg?1696132938724"
                    style={{ width: "35px" }}
                  />
                  <LazyImage
                    src="https://bizweb.dktcdn.net/100/480/632/themes/900313/assets/tiktok.svg?1696132938724"
                    style={{ width: "35px" }}
                  />
                </div>
                <div className="d-flex flex-column gap-3 ">
                  <span>HỖ TRỢ THANH TOÁN</span>
                  <div className="d-flex gap-3 flex-wrap">
                    <LazyImage
                      src="https://bizweb.dktcdn.net/100/480/632/themes/900313/assets/payment_1.svg?1696132938724"
                      style={{ width: "63px", height: "29px" }}
                    />
                    <LazyImage
                      src="https://bizweb.dktcdn.net/100/480/632/themes/900313/assets/payment_2.svg?1696132938724"
                      style={{ width: "63px", height: "29px" }}
                    />
                    <LazyImage
                      src="https://bizweb.dktcdn.net/100/480/632/themes/900313/assets/payment_3.svg?1696132938724"
                      style={{ width: "63px", height: "29px" }}
                    />
                    <LazyImage
                      src="https://bizweb.dktcdn.net/100/480/632/themes/900313/assets/payment_4.svg?1696132938724"
                      style={{ width: "63px", height: "29px" }}
                    />
                    <LazyImage
                      src="https://bizweb.dktcdn.net/100/480/632/themes/900313/assets/payment_5.svg?1696132938724"
                      style={{ width: "63px", height: "29px" }}
                    />
                    <LazyImage
                      src="https://bizweb.dktcdn.net/100/480/632/themes/900313/assets/payment_6.svg?1696132938724"
                      style={{ width: "63px", height: "29px" }}
                    />
                    <LazyImage
                      src="https://bizweb.dktcdn.net/100/480/632/themes/900313/assets/payment_7.svg?1696132938724"
                      style={{ width: "63px", height: "29px" }}
                    />
                  </div>{" "}
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
}

export default Footer;
