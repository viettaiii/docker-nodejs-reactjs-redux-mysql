import { useNavigate, useParams } from "react-router-dom";
import Breadcrumb from "../../components/Breadcrumb";
import HelmetCustom from "../../components/HelmetCustom";
import { Button, Col, Row, Table } from "react-bootstrap";
import LazyImage from "../../components/LazyImage";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { IconFire } from "../../assets/icons";
import ButtonQuantity from "../../components/Button/ButtonQuantity";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretDown,
  faCartShopping,
  faClock,
  faEye,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";
import promoBoxes from "../../assets/promoBox";
import useDataDetail from "../../hooks/useDataDetail";
import { formatCurrency } from "../../utils/format";
import { useEffect, useMemo, useState } from "react";
import ListProductSlide from "../../components/ListProductSlide";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import {
  setProductsHaveBeenSaw,
  setProductsLove,
} from "../../features/productFutureLocal";

import { toastInfo } from "../../utils/toast";
import { addItemToCartService } from "../../services/cartService";
import CountdownTimer from "../../components/CoutdownTimer";
import { clientRoutes } from "../../routes";
import { setCartItemNewBuy } from "../../features/cart/cartSlice";
import { getProductsPhuKien } from "../../features/product/productSlice";
import SpinnerButton from "../../components/Loading/SpinnerButton";
import { setIsLoadingComp } from "../../features/loadingCompSlice";
import { RectShape, TextBlock } from "react-placeholder/lib/placeholders";
function ProductDetail() {
  const { slug: name } = useParams();
  const [isLoadingAdd, setIsLoadingAdd] = useState(false);
  const navigate = useNavigate();
  const [qty, setQty] = useState(1);
  const { data, isLoading, __ } = useDataDetail("/products/" + name);
  const { user } = useSelector((store) => store.auth);

  const dispatch = useDispatch();
  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(setProductsHaveBeenSaw(data));
  }, [name, data]);

  const thumbImages = useMemo(
    () => data?.productItems.map((productItem) => productItem.image) || [],
    [data]
  );

  const colors = useMemo(
    () => data?.productItems.map((productItem) => productItem.color) || [],
    [data]
  );
  const [idxSelected, setIdxSelected] = useState(0);
  const isSpecial = data?.productItems[idxSelected]?.isSpecial;
  const isInStock = data?.productItems[idxSelected].qtyInStock === 0;
  // Fake phu kien tam thoi
  const { productsPhukien } = useSelector((store) => store.product);
  const { productsHaveBeenSaw, productsLove } = useSelector(
    (store) => store.productFutureLocal
  );

  useEffect(() => {
    dispatch(getProductsPhuKien());
  }, []);

  // handle change qty
  const handleChangeQty = (e) => {
    setQty(parseInt(e.target.value));
  };
  const itemView = {
    image: data?.image,
    price: data?.price - (data?.price * data?.discount) / 100,
    colorValue: colors[idxSelected]?.value,
    name: data?.name,
  };
  const addItemToCart = async () => {
    if (!user) {
      toastInfo("Bạn cần phải đăng nhập!");
      return;
    }
    const inputs = {
      qty,
      productItemId: data.productItems[idxSelected].id,
    };
    setIsLoadingAdd(true);
    await addItemToCartService(inputs, dispatch);
    setIsLoadingAdd(false);
  };

  if (isLoading) {
    dispatch(setIsLoadingComp(true));
  } else {
    dispatch(setIsLoadingComp(false));
  }
  return (
    <div className="product-detail">
      <HelmetCustom title="Chi tiết sản phẩm" />
      <Breadcrumb title={data?.name} />
      <div className="container">
        <Row>
          <Col lg={4} xs={12} className="mb-3 overflow-hidden">
            <div className=" ">
              {isLoading ? (
                <RectShape
                  showLoadingAnimation={true}
                  color="#E0E0E0"
                  style={{ width: 400, height: 400 }}
                />
              ) : (
                <LazyImage
                  src={thumbImages && thumbImages[idxSelected]}
                  alt={data?.name}
                />
              )}
            </div>
            <Swiper
              spaceBetween={10}
              slidesPerView={5}
              navigation={true}
              modules={[Navigation]}
              className="list-product-slide thumb-images"
            >
              {thumbImages &&
                thumbImages.map((thumb, index) => (
                  <SwiperSlide
                    className={`thumb-image ${
                      idxSelected === index ? "active" : ""
                    }`}
                    key={index}
                    onClick={() => setIdxSelected(index)}
                  >
                    {isLoading ? (
                      <RectShape
                        showLoadingAnimation={true}
                        color="#E0E0E0"
                        style={{ width: "100%", height: "100%" }}
                      />
                    ) : (
                      <LazyImage src={thumb} alt={data?.name} />
                    )}
                  </SwiperSlide>
                ))}
            </Swiper>

            <div className=" border-2 overflow-hidden">
              <LazyImage
                src="https://res.cloudinary.com/dkkh1gtoj/image/upload/v1698040982/viettaiit-ecommerce/frontend-images/product-detail/big-sales_btxa3w.webp"
                alt=""
              />
            </div>
          </Col>
          <Col lg={5} xs={12}>
            {isLoading ? (
              <TextBlock
                color="#E0E0E0"
                rows={12}
                showLoadingAnimation={true}
              />
            ) : (
              <>
                {" "}
                <h4 className="fw-bold">{data?.name}</h4>
                <p className="fw-light text-size-13">
                  <span>
                    Thương hiệu : <small>{data?.provider.providerName}</small>
                  </span>
                  <span className="mx-2">|</span>
                  <span>
                    Tình trạng :{" "}
                    <small>{isInStock ? "Hết hàng" : "Còn hàng"}</small>
                  </span>
                </p>
                <hr />
                {/* BLOCK SALES */}
                <div className="block-sale">
                  <div className="block-sale__top py-1">
                    <span className="block-sale__top__left">
                      <p className=" text-size-14">HOT SALE CUỐI TUẦN</p>
                      <IconFire />
                    </span>
                    <CountdownTimer />
                  </div>
                </div>
                {/* PRICE */}
                <div className="my-3">
                  {isSpecial ? (
                    <h5 className="text-danger text-size-22 fw-bold ">
                      Liên hệ
                    </h5>
                  ) : (
                    <>
                      <span className="text-secondary fw-bold text-size-22">
                        {formatCurrency(
                          data?.price - (data?.price * data?.discount) / 100
                        )}
                      </span>
                      <span className="text-gray-100 text-decoration-line-through opacity-25 ms-2">
                        {formatCurrency(data?.price)}
                      </span>
                    </>
                  )}
                </div>
                <div className="my-3">
                  <p className="text-size-16">
                    <span className="text-16">
                      Màu sắc :{" "}
                      <small
                        className="fw-bold ms-2"
                        style={{ color: `${colors[idxSelected]?.value}` }}
                      >
                        {colors &&
                          colors[idxSelected]?.value.slice(0, 1).toUpperCase() +
                            colors[idxSelected]?.value.slice(1)}
                      </small>
                    </span>
                  </p>
                  <div className="colors">
                    {colors &&
                      colors.map((color, index) => (
                        <span
                          onClick={() => setIdxSelected(index)}
                          className={`p-3 d-inline-block border-2 overflow-auto mx-1 color ${
                            idxSelected === index ? "active" : ""
                          } `}
                          key={color?.id}
                          style={{ background: `${color?.value}` }}
                        ></span>
                      ))}
                  </div>

                  <div className="my-4">
                    <div className="fw-light text-size-14">
                      ✔️ {data?.description}
                    </div>
                    <div className="fw-light text-size-14">
                      ✔️ {data?.description}
                    </div>
                    <div className="fw-light text-size-14">
                      ✔️ {data?.description}
                    </div>
                  </div>

                  {/* SO LUONG */}

                  {!isSpecial &&
                    (isInStock ? (
                      <Button variant="primary w-100 btn-lg" disabled>
                        HẾT HÀNG
                      </Button>
                    ) : (
                      <>
                        <div>
                          <span>
                            Số lượng :{" "}
                            <ButtonQuantity
                              className="btn-lg"
                              qty={qty}
                              handleChangeQty={handleChangeQty}
                              setQty={setQty}
                            />
                          </span>
                        </div>

                        {/* Mua NGAY */}
                        <div className="my-4">
                          <Button
                            variant="primary hover-bg-secondary"
                            onClick={async () => {
                              if (addItemToCart())
                                navigate(clientRoutes.checkout);
                            }}
                          >
                            {" "}
                            <div className="fw-bold text-size-20 mb-2 ">
                              MUA NGAY
                            </div>
                            <div className="fw-light text-size-16">
                              Giao tận nơi hoặc nhận tại cửa hàng
                            </div>{" "}
                          </Button>
                          <Button
                            variant="outline-secondary ms-4"
                            className=" position-relative"
                            disabled={isLoadingAdd}
                            onClick={async () => {
                              if (isLoadingAdd) return;
                              await addItemToCart();
                              if (user)
                                await dispatch(setCartItemNewBuy(itemView));
                            }}
                          >
                            <div className="fw-bold text-size-20 mb-2 ">
                              <FontAwesomeIcon icon={faCartShopping} />
                            </div>
                            <div className="fw-light text-size-16">
                              Thêm vào giỏ
                            </div>
                            <SpinnerButton show={isLoadingAdd} />
                          </Button>
                        </div>
                      </>
                    ))}
                </div>
              </>
            )}
          </Col>
          <Col lg={3} xs={12}>
            <div>
              <div className=" border-2 overflow-hidden rounded-top overflow-auto bg-secondary text-white p-2">
                <div className="fw-fold">
                  <FontAwesomeIcon icon={faCartShopping} />
                  <span className="fw-bold ms-2">Khuyến mãi đặc biệt</span>
                </div>
              </div>
              <div className="p-2 border  border-secondary rounded-bottom">
                <div className="text-size-14">
                  <small>-</small> Giảm trực tiếp 40%, tối đa{" "}
                  <span className="text-secondary fw-bold">600.000 VNĐ</span>{" "}
                  khi mở thẻ TP Bank EVO .
                </div>
                <div className="text-size-14">
                  <small>-</small> Giảm trực tiếp 40%, tối đa{" "}
                  <span className="text-secondary fw-bold">600.000 VNĐ</span>{" "}
                  khi mở thẻ TP Bank EVO .
                </div>
                <div className="text-size-14">
                  <small>-</small> Giảm trực tiếp 40%, tối đa{" "}
                  <span className="text-secondary fw-bold">600.000 VNĐ</span>{" "}
                  khi mở thẻ TP Bank EVO .
                </div>
              </div>
            </div>

            {/* Chinh sahc ho tro */}

            <div className="mt-4">
              <div className=" border-2 overflow-hidden rounded-top overflow-auto bg-primary text-white p-2">
                <div className="fw-fold">
                  <FontAwesomeIcon icon={faCartShopping} />
                  <span className="fw-bold ms-2">Chính sách hỗ trợ</span>
                </div>
              </div>
              <div className="p-2 border  border-primary rounded-bottom bg-gray-100">
                {promoBoxes.map((promo, index) => (
                  <>
                    <div
                      className="d-flex gap-2 py-2 border-bottom"
                      key={index}
                    >
                      <div className="w-15 h-15">
                        <LazyImage src={promo.image} alt="" />
                      </div>
                      <span className="mt--1">
                        <div className="fw-bold text-primary text-size-16">
                          Vận chuyển miễn phí
                        </div>
                        <small className="fw-light opacity-50  text-size-14">
                          Hóa đơn trên 5 triệu
                        </small>
                      </span>
                    </div>
                  </>
                ))}
              </div>
            </div>

            <div className="bts mt-2">
              <Button
                variant="btn btn-love mb-2 btn-md w-100 "
                onClick={() => dispatch(setProductsLove(data))}
              >
                <FontAwesomeIcon
                  icon={faHeart}
                  style={{
                    color: productsLove.find((prLove) => prLove.id === data?.id)
                      ? "red"
                      : "",
                  }}
                />{" "}
                {productsLove.find((prLove) => prLove.id === data?.id)
                  ? "Bỏ yêu thích"
                  : " Thêm vào yêu thích"}
              </Button>
              <Button variant="btn btn-love btn-md w-100">
                {" "}
                <FontAwesomeIcon icon={faEye} />
                Thêm vào vào so sánh
              </Button>
            </div>
          </Col>
        </Row>

        {/* LIST PHU KIEN */}
        <div className="container mt-3">
          <h5 className="ms-3 text-uppercase fw-bold">Phụ kiện đi kèm</h5>
          <ListProductSlide
            products={productsPhukien}
            hiddenSold
            hiddenDesc
            cart
          />
        </div>

        {/* THONG TIN SAN PHAM */}
        <div className="container mt-4 ">
          <Row>
            <Col sm={12} md={8}>
              <motion.div className="bg-gray-200 rounded-4 p-3">
                <h6 className="fw-bold text-uppercase">THÔNG TIN SẢN PHẨM</h6>
                <p className="lh-base">
                  Trong loạt siêu phẩm iPhone 2020, iPhone 12 được cho là mẫu
                  máy đáng mua nhất nhờ có nhiều ưu điểm vượt trội so với iPhone
                  11, đồng thời không quá thua thiệt các anh em “Pro”. Trong đó,
                  phiên bản iPhone 12 256GB lại càng hấp dẫn hơn với khả năng
                  lưu trữ không giới hạn.
                </p>
                <p className="fw-medium lh-base">
                  Thiết kế vuông vức mang dáng dấp iPhone 5
                </p>
                <p className=" fw-medium lh-base">
                  Trong loạt siêu phẩm iPhone 2020, iPhone 12 được cho là mẫu
                  máy đáng mua nhất nhờ có nhiều ưu điểm vượt trội so với iPhone
                  11, đồng thời không quá thua thiệt các anh em “Pro”. Trong đó,
                  phiên bản iPhone 12 256GB lại càng hấp dẫn hơn với khả năng
                  lưu trữ không giới hạn.
                </p>
                <div>
                  <LazyImage
                    src="https://bizweb.dktcdn.net/100/480/632/files/iphone-12-256-gb-6.jpg?v=1681681328174"
                    alt=""
                  />
                </div>
                <p className=" fw-medium lh-base mt-2">
                  Trong loạt siêu phẩm iPhone 2020, iPhone 12 được cho là mẫu
                  máy đáng mua nhất nhờ có nhiều ưu điểm vượt trội so với iPhone
                  11, đồng thời không quá thua thiệt các anh em “Pro”. Trong đó,
                  phiên bản iPhone 12 256GB lại càng hấp dẫn hơn với khả năng
                  lưu trữ không giới hạn.
                </p>
                <div className="d-flex align-content-center justify-content-center mt-3">
                  <Button
                    variant="primary hover-bg-secondary"
                    className="d-flex align-content-center justify-content-center gap-2"
                  >
                    <span className="">Xem thêm</span>
                    <FontAwesomeIcon icon={faCaretDown} />
                  </Button>
                </div>
              </motion.div>
            </Col>
            <Col sm={12} md={4}>
              <div className="specifications mt-4">
                <h6 className="fw-bold text-uppercase mb-4">
                  THÔNG SỐ KỸ THUẬT
                </h6>
                <Table striped>
                  <tbody>
                    <tr className="text-size-14">
                      <td>Hãng sản xuất </td>
                      <td colSpan={2} className="fw-light">
                        Apple
                      </td>
                    </tr>
                    <tr className="text-size-14">
                      <td>Kích thước màn hình </td>
                      <td colSpan={2} className="fw-light">
                        6.1 inches
                      </td>
                    </tr>
                    <tr className="text-size-14">
                      <td>Độ phân giải màn hình</td>
                      <td colSpan={2} className="fw-light">
                        {" "}
                        1170 x 2532 pixels
                      </td>
                    </tr>
                    <tr className="text-size-14">
                      <td>Loại màn hình </td>
                      <td colSpan={2} className="fw-light">
                        Super Retina XDR OLED, HDR10, Dolby Vision, Wide color
                        gamut, True-tone
                      </td>
                    </tr>
                    <tr className="text-size-14">
                      <td>Bộ nhớ trong </td>
                      <td colSpan={2} className="fw-light">
                        64/128/256 GB
                      </td>
                    </tr>
                    <tr className="text-size-14">
                      <td>Chipset</td>
                      <td colSpan={2} className="fw-light">
                        Chip A16 Bionic,CPU 6 nhân, GPU 5 lõi, 16-core Neural
                        Engine
                      </td>
                    </tr>
                    <tr className="text-size-14">
                      <td>CPU </td>
                      <td colSpan={2} className="fw-light">
                        Hexa-core
                      </td>
                    </tr>
                  </tbody>
                </Table>{" "}
                <div className="d-flex align-content-center justify-content-center mt-3">
                  <Button
                    variant="primary hover-bg-secondary"
                    className="d-flex align-content-center justify-content-center gap-2"
                  >
                    <span className="">Xem cấu hình chi tiết</span>
                    <FontAwesomeIcon icon={faCaretDown} />
                  </Button>
                </div>
              </div>

              {/* TIN TUc NOI BAT */}
              <div className="container mt-4">
                <h6 className="text-uppercase my-3  fw-bold">
                  TIN TỨC NỔI BẬT
                </h6>
                <Row>
                  <Col lg={12}>
                    <div className="item d-flex p-2">
                      <div className="image w-100 h-100 me-2 ">
                        <LazyImage
                          src="https://res.cloudinary.com/dkkh1gtoj/image/upload/v1698041213/viettaiit-ecommerce/frontend-images/tin-tuc/tintuc01_axseyn.webp"
                          alt=""
                          className="rounded-2"
                        />
                      </div>
                      <h6 className="fw-light text-size-14">
                        iPhone đã đúng khi không đụng đến tính năng này suốt
                        những năm qua - Đình đám một thời nay đã chết yểu"
                        <p className="mt-1 lh-base">
                          <FontAwesomeIcon icon={faClock} />
                          <small className="ms-1 ">28/04/2023</small>
                        </p>
                      </h6>
                    </div>
                  </Col>
                  <Col lg={12}>
                    <div className="item d-flex p-2">
                      <div className="image w-100 h-100 me-2 ">
                        <LazyImage
                          src="https://res.cloudinary.com/dkkh1gtoj/image/upload/v1698041220/viettaiit-ecommerce/frontend-images/tin-tuc/tintuc02_qpvq0p.webp"
                          alt=""
                          className="rounded-2"
                        />
                      </div>
                      <h6 className="fw-light text-size-14">
                        iPhone đã đúng khi không đụng đến tính năng này suốt
                        những năm qua - Đình đám một thời nay đã chết yểu"
                        <p className="mt-1 lh-base">
                          <FontAwesomeIcon icon={faClock} />
                          <small className="ms-1 ">28/04/2023</small>
                        </p>
                      </h6>
                    </div>
                  </Col>
                  <Col lg={12}>
                    <div className="item d-flex p-2">
                      <div className="image w-100 h-100 me-2 ">
                        <LazyImage
                          src="https://res.cloudinary.com/dkkh1gtoj/image/upload/v1698041222/viettaiit-ecommerce/frontend-images/tin-tuc/tintuc03_w9oai1.webp"
                          alt=""
                          className="rounded-2"
                        />
                      </div>
                      <h6 className="fw-light text-size-14">
                        iPhone đã đúng khi không đụng đến tính năng này suốt
                        những năm qua - Đình đám một thời nay đã chết yểu"
                        <p className="mt-1 lh-base">
                          <FontAwesomeIcon icon={faClock} />
                          <small className="ms-1 ">28/04/2023</small>
                        </p>
                      </h6>
                    </div>
                  </Col>
                  <Col lg={12}>
                    <div className="item d-flex p-2">
                      <div className="image w-100 h-100 me-2 ">
                        <LazyImage
                          src="https://res.cloudinary.com/dkkh1gtoj/image/upload/v1698041223/viettaiit-ecommerce/frontend-images/tin-tuc/tintuc04_xmhkzi.webp"
                          alt=""
                          className="rounded-2"
                        />
                      </div>
                      <h6 className="fw-light text-size-14">
                        iPhone đã đúng khi không đụng đến tính năng này suốt
                        những năm qua - Đình đám một thời nay đã chết yểu"
                        <p className="mt-1 lh-base">
                          <FontAwesomeIcon icon={faClock} />
                          <small className="ms-1 ">28/04/2023</small>
                        </p>
                      </h6>
                    </div>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </div>

        {/* SAN PHAM LIEN QUAN */}
        <div className="container mt-3">
          <h5 className="ms-3 text-uppercase fw-bold">SẢN PHẨM LIÊN QUAN</h5>
          <ListProductSlide
            products={productsPhukien || []}
            hiddenSold
            title={"SẢN PHẨM LIÊN QUAN"}
          />
        </div>

        {/* SAN PHAM DA XEM*/}
        <div className="container mt-3">
          <h5 className="ms-3 text-uppercase fw-bold">SẢN PHẨM BẠN ĐÃ XEM</h5>
          <ListProductSlide
            products={productsHaveBeenSaw || []}
            hiddenSold
            title={"SẢN PHẨM BẠN ĐÃ XEM"}
          />
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
