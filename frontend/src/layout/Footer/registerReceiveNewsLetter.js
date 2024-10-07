import { Button, Form } from "react-bootstrap";
import React from "react";
function RegisterReceiveNewsletter() {
  return (
    <div className=" bg-black text-white mt-5 py-5">
      <div className="container d-flex flex-column gap-2 justify-content-center align-items-center">
        <h3 className="text-uppercase  text-center fw-bold">
          Đăng ký nhận tin từ Ecommerce
        </h3>
        <p className="fw-light">
          Nhận thông tin sản phẩm mới nhất và các chương trình khuyến mãi.
        </p>
        <Form className="w-50 ">
          <Form.Group className="d-lg-flex flex-column gap-sm-2 gap-md-0 flex-md-row">
            <Form.Control
              placeholder="Nhập địa chỉ email..."
              name="email"
              className=""
            />
            <Button variant="outline-danger btn-sm" className="flex-center">
              Gửi
            </Button>
          </Form.Group>
        </Form>
      </div>
    </div>
  );
}

export default React.memo(RegisterReceiveNewsletter);
