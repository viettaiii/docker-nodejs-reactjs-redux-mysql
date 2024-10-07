import {
  faCircleCheck,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Col, Modal, Row } from "react-bootstrap";
import LazyImage from "../LazyImage";
import { useDispatch, useSelector } from "react-redux";
import { setCartItemNewBuy } from "../../features/cart/cartSlice";
import { formatCurrency } from "../../utils/format";
import {  useNavigate } from "react-router-dom";
import { clientRoutes } from "../../routes";

function ModalCartView({}) {
  const { countCartItem, cartItemNewBuy } = useSelector((store) => store.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  if (!cartItemNewBuy) return null;
  return (
    <Modal
      onHide={() => dispatch(setCartItemNewBuy(null))}
      size="md"
      show={cartItemNewBuy ? true : false}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header className="py-2 bg-primary text-white d-flex justify-content-between">
        <h5 className="m-0 text-size-16 flex-fill">
          <FontAwesomeIcon icon={faCircleCheck} className="me-1" />
          Mua hàng thành công
        </h5>
        <div>
          <FontAwesomeIcon
            icon={faCircleXmark}
            className="me-1 text-size-24 cursor"
            onClick={() => dispatch(setCartItemNewBuy(null))}
          />
        </div>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col xs={2}>
            <LazyImage
              src={
                
                cartItemNewBuy.image
              }
            />
          </Col>
          <Col xs={10}>
            <h6 className="fw-bold text-size-14">{cartItemNewBuy.name}</h6>
            <h6 className="fw-bold text-size-16">
              {formatCurrency(cartItemNewBuy.price)}
              <span className="ms-2 opacity-50 fw-light text-size-14">
                {cartItemNewBuy.colorValue}
              </span>
            </h6>
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <p className="text-start w-100 text-size-14 fw-light">
          Giỏ hàng của bạn hiện có{" "}
          <span className="text-danger fw-bold">{countCartItem}</span> sản phẩm
        </p>
        <div className="d-flex gap-2 w-100">
          <Button
            variant="outline-primary btn-md w-100"
            onClick={() => dispatch(setCartItemNewBuy(null))}
          >
            Tiếp tục mua hàng
          </Button>
          <Button
            variant="primary hover-bg-secondary btn-md w-100"
            onClick={() => {
              dispatch(setCartItemNewBuy(null));
              navigate(clientRoutes.checkout);
            }}
          >
            Thanh toán ngay
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalCartView;
