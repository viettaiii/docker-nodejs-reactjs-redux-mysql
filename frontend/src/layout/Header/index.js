// FRAMEWORKS
import { easeInOut, motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
// COMPONENTS
import FrameHover from "../../components/FrameHover";
import Search from "./Search";

// STYLES
// REDUX
import { useDispatch, useSelector } from "react-redux";
import { toggleNavBar } from "../../features/navBarSlice";
import {
  faAngleDown,
  faArrowLeft,
  faArrowRightToBracket,
  faBars,
  faCartPlus,
  faClose,
  faFaceSmile,
  faHeart,
  faPhoneVolume,
  faPlus,
  faRotate,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { clientRoutes } from "../../routes";

// REDUX SLICE
import { logoutAuth } from "../../features/auth/authSlice";
import LazyImage from "../../components/LazyImage";
import NavbarDeskTop from "../NavBar/NavbarDeskTop";
import NavBarDownDeskTop from "../NavBar/NavBarDownDeskTop";
import { getCartMe, resetCart } from "../../features/cart/cartSlice";
import { formatCurrency } from "../../utils/format";
import { calculatePriceForDiscount } from "../../utils/calculatePrice";
import ButtonQuantityUpdateQty from "../../components/Button/ButtonQuantityUpdateQty";
import {
  deleteCartItemService,
  updateQtyService,
} from "../../services/cartService";
import { setIsLoadingComp } from "../../features/loadingCompSlice";

function Header() {
  const [isHoveredAccount, setIsHoveredAccount] = useState(false);
  const [disabledUpdateQty, setDisabledUpdateQty] = useState(false);
  const [isHoveredCart, setIsHoveredCart] = useState(false);
  const { user } = useSelector((store) => store.auth);
  const { isOpen } = useSelector((store) => store.navBar);
  const { productsLove } = useSelector((store) => store.productFutureLocal);
  const { countCartItem, cart, total } = useSelector((store) => store.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) dispatch(resetCart());
    else {
      dispatch(getCartMe());
    }
  }, [dispatch, user]);

  return (
    <>
      <div className="header">
        <div className="header-top container-xxl">
          <div className="left w-15">
            <FontAwesomeIcon
              icon={faBars}
              onClick={() => dispatch(toggleNavBar())}
              className="icon-size-sm d-lg-none me-3"
            />

            <Link
              to={"/"}
              className={`logo d-block fs-4 text-white rounded w-100`}
              style={{
                width: "120px",
              }}
            >
              <LazyImage src="https://res.cloudinary.com/dkkh1gtoj/image/upload/v1717317641/logo_tfhi3m.png" alt="" />
            </Link>
          </div>
          <Search className="max-lg-none" />
          <div className="right">
            <div className="item max-lg-none">
              <FontAwesomeIcon icon={faPhoneVolume} className="icon-size-2xs" />
              <span>
                <small className="title">Gọi mua hàng</small>
                <small>1900 6750</small>
              </span>
            </div>
            <motion.div
              onMouseEnter={() => setIsHoveredAccount(true)}
              onMouseLeave={() => setIsHoveredAccount(false)}
              className="item"
            >
              <FontAwesomeIcon icon={faUser} className="icon-size-2xs" />
              <FontAwesomeIcon
                icon={faAngleDown}
                className="d-none max-lg-display"
              />
              <span>
                <small className="title">Thông tin</small>
                <small className=" max-lg-none">
                  Tài khoản <FontAwesomeIcon icon={faAngleDown} size="xs" />
                </small>
              </span>
              <FrameHover isHovered={isHoveredAccount}>
                <motion.div
                  variants={account}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="frame-hover"
                >
                  <div className="account">
                    {user ? (
                      <>
                        <Link
                          to={clientRoutes.account.main}
                          className="account__item"
                        >
                          <FontAwesomeIcon icon={faUser} size="lg" />
                          <small>Tài khoản</small>
                        </Link>
                        <span
                          className="account__item"
                          onClick={async () => {
                            dispatch(setIsLoadingComp(true));
                            await dispatch(logoutAuth());
                            dispatch(setIsLoadingComp(false));
                          }}
                        >
                          <FontAwesomeIcon icon={faArrowLeft} size="lg" />
                          <small>Đăng xuất</small>
                        </span>
                      </>
                    ) : (
                      <>
                        <Link
                          to={clientRoutes.account.login}
                          className="account__item"
                        >
                          <FontAwesomeIcon
                            icon={faArrowRightToBracket}
                            size="lg"
                          />
                          <small>Đăng nhập</small>
                        </Link>
                        <Link
                          to={clientRoutes.account.register}
                          className="account__item"
                        >
                          <FontAwesomeIcon icon={faPlus} size="lg" />
                          <small>Đăng ký</small>
                        </Link>
                      </>
                    )}

                    <Link
                      to={clientRoutes.product.love}
                      className="account__item"
                    >
                      <FontAwesomeIcon icon={faHeart} size="lg" />
                      <small>Danh sách yêu thích ({productsLove.length})</small>
                    </Link>
                    <span className="account__item">
                      <FontAwesomeIcon icon={faRotate} size="lg" />
                      <small>So sánh sản phẩm (0)</small>
                    </span>
                  </div>
                </motion.div>
              </FrameHover>
            </motion.div>
            <motion.div
              onMouseEnter={() => setIsHoveredCart(true)}
              onMouseLeave={() => setIsHoveredCart(false)}
              className="item"
            >
              <FontAwesomeIcon
                className="icon-cart icon-size-2xs"
                icon={faCartPlus}
                onClick={(e) => {
                  navigate(clientRoutes.cart);
                }}
              />
              <span>
                <small>Giỏ hàng</small>
              </span>
              <div className="circle">{countCartItem}</div>
              <FrameHover isHovered={isHoveredCart}>
                <motion.div
                  variants={account}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  style={{ width: "350px" }}
                  className="frame-hover"
                >
                  <div className="cart">
                    {countCartItem === 0 ? (
                      <div className="cart__none">
                        <FontAwesomeIcon icon={faFaceSmile} beat size="4x" />
                        <small className="text-center hover-none">
                          Không có sản phẩm nào!
                          <Link
                            to={clientRoutes.product.main + "/all"}
                            className="text-info d-block cursor"
                          >
                            Mua ngay!
                          </Link>
                        </small>
                      </div>
                    ) : (
                      <>
                        <h6>GIỎ HÀNG</h6>
                        <div className="cart__display scrollbar-primary">
                          {cart &&
                            cart.cartItems.map((item, index) => (
                              <div className="cart__item position-relative">
                                <div className="left">
                                  <Link
                                    to={
                                      clientRoutes.product.detail +
                                      "/" +
                                      item.productItem.product.slug
                                    }
                                  >
                                    <LazyImage
                                      className="cursor"
                                      src={item.productItem.image}
                                      rounded
                                    />
                                  </Link>
                                </div>
                                <div className="right">
                                  <div>
                                    <span className="name">
                                      <Link
                                        to={
                                          clientRoutes.product.detail +
                                          "/" +
                                          item.productItem.product.slug
                                        }
                                      >
                                        {item.productItem.product.name}
                                      </Link>
                                    </span>
                                    <motion.span
                                      initial={{ rotate: 0 }}
                                      whileHover={{ rotate: -360, size: 10 }}
                                      transition={{ duration: 0.2 }}
                                      className=" align-items-start icon-close d-block"
                                      onClick={() =>
                                        deleteCartItemService(item.id, dispatch)
                                      }
                                    >
                                      <FontAwesomeIcon
                                        icon={faClose}
                                        size="xl"
                                      />
                                    </motion.span>
                                  </div>
                                  <div>
                                    <ButtonQuantityUpdateQty
                                      disabled={disabledUpdateQty}
                                      as="small"
                                      increaseQty={async () => {
                                        if (item.qty > 1000) return;
                                        setDisabledUpdateQty(true);
                                        await updateQtyService(
                                          {
                                            qty: 1,
                                            productItemId: item.productItemId,
                                          },
                                          dispatch
                                        );
                                        setDisabledUpdateQty(false);
                                      }}
                                      decreaseQty={async () => {
                                        setDisabledUpdateQty(true);
                                        if (item.qty === 1) {
                                          return await deleteCartItemService(
                                            item.id,
                                            dispatch
                                          );
                                        }
                                        await updateQtyService(
                                          {
                                            qty: -1,
                                            productItemId: item.productItemId,
                                          },
                                          dispatch
                                        );
                                        setDisabledUpdateQty(false);
                                      }}
                                      qty={item.qty}
                                      className="btn-sm"
                                    />
                                    <small className="price">
                                      {" "}
                                      {formatCurrency(
                                        calculatePriceForDiscount(
                                          item.productItem.product.price,
                                          item.productItem.product.discount
                                        )
                                      )}
                                    </small>
                                  </div>
                                </div>
                              </div>
                            ))}
                        </div>
                        <div className="total">
                          <div className="left">
                            <small>Tổng tiền</small>
                            <small> {formatCurrency(total)}</small>
                          </div>
                          <Button variant="primary hover-bg-secondary">
                            <Link to={clientRoutes.checkout}> THANH TOÁN</Link>
                          </Button>
                        </div>
                      </>
                    )}
                  </div>
                </motion.div>
              </FrameHover>
            </motion.div>
          </div>
        </div>
        {isOpen ? <NavBarDownDeskTop /> : <NavbarDeskTop />}
        <Search className="d-lg-none max-lg-display mx-3" />
      </div>
    </>
  );
}

export default Header;

const account = {
  initial: { scale: 0.3, originX: 1, originY: 0, opacity: 0.5 },
  animate: { scale: 1, originX: 0, originY: 1, opacity: 1 },
  exit: { scale: 0.5, originX: 0, originY: 1, opacity: 0.5 },
  transition: { duration: 1, ease: easeInOut(2) },
};
