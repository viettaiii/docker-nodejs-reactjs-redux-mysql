import { Link, useNavigate, useParams } from "react-router-dom";
import HelmetCustom from "../../components/HelmetCustom";
import { clientRoutes } from "../../routes";
import LazyImage from "../../components/LazyImage";
import { Button, Col, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faPrint } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import useDataDetail from "../../hooks/useDataDetail";
import { formatCurrency } from "../../utils/format";
import { getAddressesMe } from "../../features/address/addressSlice";
import { useEffect } from "react";

function ThankYouOrder() {
  const { id } = useParams();
  const { user } = useSelector((store) => store.auth);
  const { data, _, __ } = useDataDetail("/orders/" + id);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    const getAllAddressesMeAsync = async () => await dispatch(getAddressesMe());
    getAllAddressesMeAsync();
  }, []);
  return (
    <>
      <HelmetCustom title="E-COMMERCE cảm ơn" />
      <div className="container px-lg-10">
        <div className="w-100 flex-center">
          <Link
            to={clientRoutes.home}
            className={`logo d-block fs-4 text-white rounded w-15`}
          >
            <LazyImage src="https://res.cloudinary.com/dkkh1gtoj/image/upload/v1717317641/logo_tfhi3m.png" alt="" />
          </Link>
        </div>

        <Row>
          <Col xs={12} className=" mb-md-3" lg={7}>
            <div className="d-flex gap-4 align-items-center mb-3">
              <FontAwesomeIcon
                icon={faCircleCheck}
                className="text-size-100 text-success"
              />
              <div>
                <p className="text-size-18 fw-bold">Cảm ơn bạn đã đặt hàng</p>
                <span className="text-size-14 fw-light">
                  Một email xác nhận đã được gửi tới {user.email}. Xin vui lòng
                  kiểm tra email của bạn
                </span>
              </div>
            </div>
            <div className="border p-3 d-flex justify-content-between ">
              <div className="text-start d-flex flex-column gap-1">
                <span className="text-size-21 fw-bold">Thông tin mua hàng</span>
                <span className="text-size-14 ">{data?.address.fullName}</span>
                <span className="text-size-14 ">{user.email}</span>
                <span className="text-size-14 ">
                  {data?.address.phoneNumber}
                </span>

                <span className="text-size-21 fw-bold mt-2">
                  Phương thức thanh toán
                </span>
                <span className="text-size-14 ">
                  Thanh toán khi giao hàng (COD)
                </span>
              </div>
              <div className="text-start d-flex flex-column gap-1">
                <span className="text-size-21 fw-bold">Địa chỉ nhận hàng</span>
                <span className="text-size-14 ">{data?.address.fullName}</span>
                <span className="text-size-14 ">{data?.address.address}</span>
                <span className="text-size-14 ">
                  {data?.address.ward}, {data?.address.district},{" "}
                  {data?.address.province}
                </span>

                <span className="text-size-21 fw-bold mt-2">
                  Phương thức vận chuyển
                </span>
                <span className="text-size-14 ">Giao hàng tận nơi</span>
              </div>
            </div>
          </Col>
          <Col xs={12} lg={5}>
            <div className=" shadow-lg">
              <span className="d-flex align-items-center text-size-16 fw-bold py-2 px-2 border-bottom">
                Đơn hàng #{data?.id}
              </span>

              <Row className="mt-2 py-2">
                {data?.ordersLine.map((orderLine, index) => (
                  <Col xs={12} className="" key={index}>
                    <div className="border-bottom ">
                      <Row className="px-2 py-1 ">
                        <Col xs={2}>
                          <div className=" position-relative">
                            <LazyImage src={orderLine.productItem.image} />
                            <div className="px-1 text-size-12 rounded-circle w-5 h-5 d-inline-block position-absolute top--10 right-1 bg-info text-white">
                              {orderLine.qty}
                            </div>
                          </div>
                        </Col>
                        <Col xs={10}>
                          {" "}
                          <div>
                            <span className="d-flex text-size-16 fw-bold">
                              {orderLine.productItem.product.name}
                            </span>
                            <div className="d-flex justify-content-between align-items-center">
                              <span className="text-size-12 opacity-50">
                                {" "}
                                {orderLine.productItem.color.value}
                              </span>
                              <span className="text-size-14">
                                {" "}
                                {formatCurrency(orderLine.price)}
                              </span>
                            </div>
                          </div>
                        </Col>
                      </Row>
                    </div>
                  </Col>
                ))}

                <Col xs={12} className="">
                  <div className="border-bottom p-2">
                    <div className="text-size-14 d-flex justify-content-between">
                      <span>Tạm tính</span>
                      <span>{formatCurrency(data?.orderTotal)}</span>
                    </div>
                    <div className="text-size-14 d-flex justify-content-between">
                      <span>Phí vận chuyển</span>
                      <span>40.000₫</span>
                    </div>
                  </div>
                </Col>
                <Col xs={12} className="">
                  <div className="d-flex justify-content-between p-2">
                    <span>Tổng cộng</span>
                    <span className="text-size-20 text-info fw-bold">
                      {formatCurrency(data?.orderTotal + 40000)}
                    </span>
                  </div>
                </Col>
              </Row>
            </div>
          </Col>

          <div className="flex-center mt-2 gap-4">
            <Button
              onClick={() => navigate(clientRoutes.home)}
              variant="info btn-lg"
            >
              Tiếp tục mua hàng
            </Button>
            <FontAwesomeIcon
              onClick={() => window.print()}
              className="cursor text-info "
              icon={faPrint}
            />
          </div>
        </Row>
      </div>
    </>
  );
}

export default ThankYouOrder;
