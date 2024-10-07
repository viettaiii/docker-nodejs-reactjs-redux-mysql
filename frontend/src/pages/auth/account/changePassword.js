import { Button, Form } from "react-bootstrap";
import Account from ".";

function ChangePassword() {
  return (
    <Account>
      <h5 className=" mt-sm-4 fw-light">ĐỔI MẬT KHẨU</h5>
      <div className="mt-4">
        <p className="fw-light text-size-16">
          Để đảm bảo tính bảo mật bạn vui lòng đặt lại mật khẩu với ít nhất 8 kí
          tự
        </p>
        <Form className="form">
          <Form.Group className="mb-3">
            <Form.Label>Mật khẩu cũ <span className="text-danger">*</span></Form.Label>
            <Form.Control type="password" />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Mật khẩu mới <span className="text-danger">*</span></Form.Label>
            <Form.Control type="password" multiple />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Xác nhận lại mật khẩu <span className="text-danger">*</span></Form.Label>
            <Form.Control type="password" />
          </Form.Group>
          <Button variant="primary hover-bg-secondary w-100 btn-md" type="submit">Đặt lại mật khẩu</Button>
        </Form>
      </div>
    </Account>
  );
}

export default ChangePassword;
