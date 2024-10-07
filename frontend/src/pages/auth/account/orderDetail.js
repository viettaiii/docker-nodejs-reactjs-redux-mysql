import { Col, Row, Table } from "react-bootstrap";
import Account from ".";
import LazyImage from "../../../components/LazyImage";
import { useParams } from "react-router-dom";
import useDataDetail from "../../../hooks/useDataDetail";
import { formatCurrency, formatDate } from "../../../utils/format";

import { useMediaQuery } from "react-responsive";
const createBtnStatus = (status) => {
  if (status === "pending")
    return <span className="flex-center text-danger">{status}</span>;
  return <span className="flex-center text-success">{status}</span>;
};

function OrderDetail() {
  const { id } = useParams();
  const { data, _, __ } = useDataDetail("/orders/" + id);
  const isTabletOrMobile = useMediaQuery({
    query: "(max-width: 1024px)",
  });
  return (
    <Account>
      <div className="d-flex justify-content-between mt-md-5">
        <span> Chi tiết đơn hàng #{data?.id}</span>
        <span>Ngày tạo: {formatDate(data?.createdAt)}</span>
      </div>

      <div className="d-flex gap-5 mt-3 ">
        <span>
          {" "}
          Trạng thái thanh toán:{" "}
          <span className="text-danger">
            {data?.status === "completed" ? "Đã thanh toán" : "Chưa thanh toán"}
          </span>
        </span>
        <span className="d-flex gap-2">
          {" "}
          <span> Trạng thái vận chuyển: </span>
          <span className="text-primary fw-bold">
            {createBtnStatus(data?.status)}
          </span>
        </span>
      </div>

      <div className="d-flex gap-3 mt-3">
        <Row>
          <Col xs={12} lg={6}>
            <span>ĐỊA CHỈ GIAO HÀNG</span>
            <div className="border px-2 py-2 h-75 d-flex flex-column gap-1 pb-3 fw-light text-size-16">
              <span>VIẾT TÀI </span>
              <span>
                Địa chỉ: {data?.address.residence}, {data?.address.ward},{" "}
                {data?.address.district}, {data?.address.province}
              </span>
              <span>Số điện thoại: {data?.address.phoneNumber}</span>
            </div>
          </Col>
          <Col xs={12} lg={3}>
            <span>THANH TOÁN</span>
            <div className="border px-2 py-2 h-75">
              <p>Thanh toán khi giao hàng (COD)</p>
            </div>
          </Col>
          <Col xs={12} lg={3} className="mt-md-3">
            <span>GHI CHÚ</span>
            <div className="border px-2 py-2 h-75">
              <p>{data?.note}</p>
            </div>
          </Col>
        </Row>
      </div>
      {isTabletOrMobile ? (
        <OrderDetailTableDownDesktop data={data} />
      ) : (
        <OrderDetailTableUpDesktop data={data} />
      )}
    </Account>
  );
}

export default OrderDetail;

function OrderDetailTableUpDesktop({ data }) {
  return (
    <div className="table-order-detail">
      <Table size="sm" className="m-0">
        <thead>
          <tr className="text-center">
            <th className="w-10 text-start align-middle">Sản phẩm</th>
            <th className="w-15   align-middle">Đơn giá</th>
            <th className="  align-middle">Số lượng</th>
            <th className="w-20  align-middle">Tổng</th>
          </tr>
        </thead>
        <tbody className=" position-relative">
          {data?.ordersLine.map((orderLine, index) => (
            <tr className="" key={index}>
              <td className="cursor w-50 py-3">
                <div>
                  <Row>
                    <Col xs={2}>
                      <LazyImage src={orderLine.productItem.image} />
                    </Col>
                    <Col
                      xs={10}
                      className="d-flex flex-column align-content-center mt-2"
                    >
                      <div>{orderLine.productItem.product.name}</div>
                      <span className="text-size-12 fw-light opacity-50">
                        {orderLine.productItem.color.value}
                      </span>
                    </Col>
                  </Row>
                </div>
              </td>
              <td className="align-middle text-center p-2">
                {formatCurrency(orderLine.price)}
              </td>
              <td className="align-middle text-center p-2 ">{orderLine.qty}</td>
              <td className="align-middle text-center p-2">
                {formatCurrency(orderLine.price * orderLine.qty)}
              </td>
            </tr>
          ))}

          <tr className="">
            <td className="cursor w-50 py-3"></td>
            <td className="align-middle text-center p-2">
              <div className="d-flex flex-column gap-3 text-end text-size-15 fw-light">
                <span>Khuyến mại </span>
                <span>Phí vận chuyển </span>
                <span>Tổng tiền </span>
              </div>
            </td>
            <td className="align-middle text-end p-2 " colSpan={2}>
              <div className="d-flex flex-column gap-3">
                <span>0d</span>
                <span>40.000₫ (Giao hàng tận nơi)</span>
                <span className="text-danger text-size-20 fw-bold">
                  {formatCurrency(data?.orderTotal + 40000)}
                </span>
              </div>
            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}

function OrderDetailTableDownDesktop({ data }) {
  return (
    <div className="table-order-detail-down-desktop mt-3">
      <div className="border-top py-2">
        {data?.ordersLine.map((orderLine, index) => (
          <Row key={index}>
            <Col xs={3}>
              <LazyImage src={orderLine.productItem.image} />
            </Col>
            <Col xs={9} className="text-size-16 fw-light mt-2">
              <div>{orderLine.productItem.product.name}</div>
              <div> {orderLine.productItem.color.value}</div>
              <div className="d-flex justify-content-between align-content-center">
                <span className=" opacity-50">x {orderLine.qty}</span>
                <span className="fw-bold">
                  {" "}
                  {formatCurrency(orderLine.price)}
                </span>
              </div>
            </Col>
          </Row>
        ))}
        <hr />
        <div className="d-flex justify-content-end">
          <tr className="">
            <td className="cursor  py-3"></td>
            <td className="align-middle text-center p-2">
              <div className="d-flex flex-column gap-3 text-end text-size-15 fw-light">
                <span>Khuyến mại </span>
                <span>Phí vận chuyển </span>
                <span>Tổng tiền </span>
              </div>
            </td>
            <td className="align-middle text-end p-2 " colSpan={2}>
              <div className="d-flex flex-column gap-3">
                <span>0d</span>
                <span>40.000₫ (Giao hàng tận nơi)</span>
                <span className="text-danger text-size-20 fw-bold">
                  {formatCurrency(data?.orderTotal + 40000)}
                </span>
              </div>
            </td>
          </tr>
        </div>
      </div>
    </div>
  );
}
