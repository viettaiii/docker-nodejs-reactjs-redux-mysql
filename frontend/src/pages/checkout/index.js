import { Button, Col, FloatingLabel, Form, Row } from "react-bootstrap";
import HelmetCustom from "../../components/HelmetCustom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";
import { clientRoutes } from "../../routes";
import { faMoneyBill } from "@fortawesome/free-solid-svg-icons";
import LazyImage from "../../components/LazyImage";
import { useDispatch, useSelector } from "react-redux";
import { formatCurrency } from "../../utils/format";
import { calculatePriceForDiscount } from "../../utils/calculatePrice";

import { toastInfo } from "../../utils/toast";
import { checkPhoneNumber } from "../../utils/validate";

import { setIsLoadingComp } from "../../features/loadingCompSlice";
import FormAddress from "../../components/Form/FormAddress";
import {
  resetFormAddress,
  setFromAddress,
} from "../../features/formAddressSlice";
import { useRef, useState } from "react";
import useHideOnClickOutside from "../../hooks/useHideOnClickOutSide";
import httpRequest from "../../api/httpRequest";
import { handlePaymentService } from "../../services/orderService";
function CheckOut() {
  const { cart, countCartItem, total } = useSelector((store) => store.cart);
  const { address } = useSelector((store) => store.formAddress);
  const { addresses } = useSelector((store) => store.address);
  const optionAddressesRef = useRef();
  const [isSelected, setIsSelected] = useState(false);
  const [isShowOptionAddresses, setIsShowOptionAddresses] =
    useHideOnClickOutside(optionAddressesRef);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [payOption, setPayOption] = useState(1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { fullName, phoneNumber } = address;
    if (fullName.length < 3) return toastInfo("Họ và tên yêu cầu!");
    if (!checkPhoneNumber(phoneNumber))
      return toastInfo("Định dạng số điện thoại không hợp lệ!");
    try {
      dispatch(setIsLoadingComp(true));
      if (payOption === 0)
        await handlePaymentService(
          {
            cart,
            address,
            status: "pending",
          },
          dispatch,
          navigate
        );
      else {
        const { data } = await httpRequest.post("/payment", { total });
        dispatch(setIsLoadingComp(false));
        window.open(data.redirect_url, "_self");
      }
    } catch (error) {}
  };
  return (
    <div className="vh-100 ">
      <HelmetCustom title="Thanh toán" />
      <div className="container w-70 ">
        <Row>
          <Col md={12} xl={8} className="">
            {/* <FontAwesomeIcon className="icon-size-sm  me-3  " /> */}

            <div className="w-100 flex-center">
              <Link
                to={clientRoutes.home}
                className={`logo d-block fs-4 text-white rounded w-15`}
              >
                <LazyImage src="" alt="" />
              </Link>
            </div>
            <Row className="">
              <Col md={12} xl={6}>
                <div className="d-flex justify-content-between">
                  <span className="fw-bold text-size-18 mb-3">
                    Thông tin nhận hàng
                  </span>
                  {/* <Link
                    to={clientRoutes.login}
                    className="text-info fw-bold text-size-14"
                  >
                    <FontAwesomeIcon icon={faUser} className="ms-2" /> Đăng nhập
                  </Link> */}
                </div>
                <div
                  className="d-flex mb-2 position-relative"
                  ref={optionAddressesRef}
                >
                  <FloatingLabel
                    controlId="floatingInputGrid"
                    label="Số địa chỉ"
                    className="w-100 d-flex"
                    onFocus={() => {
                      setIsShowOptionAddresses(true);
                    }}
                  >
                    <Form.Control
                      type="text"
                      value={
                        isSelected
                          ? ` ${address.fullName}, ${address.residence}, ${address.ward}...
                          `
                          : "Địa chỉ khác..."
                      }
                      placeholder="name@example.com"
                    ></Form.Control>
                  </FloatingLabel>
                  {isShowOptionAddresses && (
                    <div className="select_options scrollbar-primary">
                      <span
                        onClick={() => {
                          dispatch(resetFormAddress());
                          setIsShowOptionAddresses(false);
                          setIsSelected(false);
                        }}
                      >
                        Địa chỉ khác...
                      </span>

                      {addresses.map((item, i) => (
                        <span
                          key={i}
                          onClick={() => {
                            dispatch(setFromAddress(item));
                            setIsSelected(true);
                            setIsShowOptionAddresses(false);
                          }}
                        >
                          {item.fullName}, {item.residence}, {item.ward},
                          {item.district}, {item.province}, {item.country}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <FormAddress isSelected={isSelected} />
              </Col>
              <Col md={12} xl={6} className="">
                <div className=" mt-sm-5 ">
                  <span className="fw-bold text-size-18 mb-3 d-block">
                    Vận chuyển
                  </span>
                  <div className="d-flex justify-content-between align-items-center p-2 border ">
                    <Form.Check
                      type="radio"
                      label={`Giao hàng tận nơi`}
                      checked={true}
                      className="text-size-14 "
                    />
                    <span className="fw-bold text-size-14">40.000đ</span>
                  </div>
                </div>
                <div className="mt-4">
                  <span className="fw-bold text-size-18">Thanh toán</span>

                  {["Thanh toán khi giao hàng (COD)", "Chuyển khoản"].map(
                    (title, i) => (
                      <div
                        className="d-flex justify-content-between align-items-center p-2 border mt-2"
                        key={i}
                        onClick={() => setPayOption(parseInt(i))}
                      >
                        <Form.Check
                          type="radio"
                          label={title}
                          value={i}
                          checked={i === payOption}
                          className="text-size-14 "
                        />
                        <span className="fw-bold text-size-14">
                          <FontAwesomeIcon
                            icon={faMoneyBill}
                            className="text-info"
                          />
                        </span>
                      </div>
                    )
                  )}
                </div>
              </Col>
            </Row>
          </Col>
          <Col md={12} xl={4} className="px-0">
            <h6 className=" border-bottom text-size-20 fw-bold py-3 px-4 mb-0">
              Đơn hàng ({countCartItem} sản phẩm)
            </h6>

            <Row>
              <Col md={12} className="ps-5">
                <div>
                  {/* ITEM */}
                  {cart.cartItems.map((item, index) => (
                    <div
                      className="d-flex justify-content-between align-items-center border-bottom py-2"
                      key={index}
                    >
                      <div className="d-flex gap-1 align-items-center">
                        <div className=" position-relative">
                          <LazyImage
                            src={item.productItem.image}
                            alt=""
                            style={{ width: "45px" }}
                            className="border border-info rounded-5"
                          />
                          <div className="px-1 text-size-12 rounded-circle w-5 h-5 d-inline-block position-absolute top--10 right-1 bg-info text-white">
                            4
                          </div>
                        </div>
                        <span className="fw-light text-size-14">
                          {item.productItem.product.name}
                        </span>
                      </div>
                      <div className="fw-light text-size-14">
                        {" "}
                        {formatCurrency(
                          calculatePriceForDiscount(
                            item.productItem.product.price,
                            item.productItem.product.discount
                          )
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </Col>
              <Col md={12} className="ps-5">
                <div className="d-flex gap-2 justify-content-between py-3 border-bottom">
                  <FloatingLabel
                    controlId="floatingInputGrid"
                    label="Nhập mã sản phẩm"
                  >
                    <Form.Control type="text" placeholder="name@example.com" />
                  </FloatingLabel>
                  <Button disabled variant="info btn-md">
                    Áp dụng
                  </Button>
                </div>
              </Col>
              <Col md={12} className="ps-5">
                <div className="py-3 border-bottom">
                  <div className="d-flex justify-content-between align-items-center">
                    <span>Tạm tính</span>
                    <span>{formatCurrency(total)}</span>
                  </div>

                  <div className="d-flex justify-content-between align-items-center">
                    <span>Phí vận chuyển</span>
                    <span>40.000₫</span>
                  </div>
                </div>
              </Col>
              <Col md={12} className="ps-5 mb-10">
                <div className="">
                  <div className="d-flex justify-content-between align-items-center py-3">
                    <span className="text-size-14">Tổng cộng</span>
                    <span className="text-size-16 fw-bold text-info">
                      {formatCurrency(total + 40000)}
                    </span>
                  </div>
                  <div className="d-flex justify-content-between align-items-center mt-2">
                    <Link
                      to={clientRoutes.cart}
                      className="text-size-14 text-info"
                    >
                      ❮ Quay về giỏ hàng
                    </Link>
                    <Button
                      variant="info"
                      className="text-size-16 fw-bold btn-md"
                      onClick={handleSubmit}
                    >
                      ĐẶT HÀNG
                    </Button>
                  </div>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default CheckOut;
