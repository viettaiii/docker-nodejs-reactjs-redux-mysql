import {
  faCircleCheck,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Col, Modal, Row } from "react-bootstrap";
import PropTypes from "prop-types";

function ModalConfirmation({ onSave, onReject, show, title, children }) {
  return (
    <Modal
      onHide={() => onReject()}
      size="md"
      show={show}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header className="py-2 bg-primary text-white d-flex justify-content-between">
        <h5 className="m-0 text-size-16 flex-fill">
          <FontAwesomeIcon icon={faCircleCheck} className="me-1" />
          {title}
        </h5>
        <div>
          <FontAwesomeIcon
            icon={faCircleXmark}
            className="me-1 text-size-24 cursor"
            onClick={onReject}
          />
        </div>
      </Modal.Header>
      <Modal.Body>
        {children ? (
          children
        ) : (
          <Row>
            <Col xs={12}>
              Hành động sẽ không thể khôi phục lại dữ liệu của bạn? Bạn có muốn
              xóa không?
            </Col>
          </Row>
        )}
      </Modal.Body>
      <Modal.Footer>
        <div className="d-flex gap-2 w-100">
          <Button variant="outline-primary btn-md w-100" onClick={onReject}>
            Hủy
          </Button>
          <Button
            variant="primary hover-bg-secondary btn-md w-100"
            onClick={onSave}
          >
            Đồng ý
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}

ModalConfirmation.propTypes = {
  onSave: PropTypes.func,
  onReject: PropTypes.func,
  show: PropTypes.bool,
  title: PropTypes.string,
  children: PropTypes.node,
};
export default ModalConfirmation;
