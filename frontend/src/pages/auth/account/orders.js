import { Button, Table } from "react-bootstrap";
import Account from ".";
import { useMediaQuery } from "react-responsive";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getOrdersMe } from "../../../features/order/orderSlice";
import { formatCurrency, formatDate } from "../../../utils/format";
import { clientRoutes } from "../../../routes";
import { useNavigate } from "react-router-dom";

function Orders() {
  const isTabletOrMobile = useMediaQuery({
    query: "(max-width: 1024px)",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { orders } = useSelector((store) => store.order);
  useEffect(() => {
    dispatch(getOrdersMe());
  }, []);
  return (
    <Account>
      <h5 className=" mt-sm-4 fw-light">ĐƠN HÀNG CỦA BẠN</h5>
      <div className="mt-4">
        {isTabletOrMobile ? (
          <OrdersDownDeskTop navigate={navigate} orders={orders} />
        ) : (
          <OrdersUpDeskTop navigate={navigate} orders={orders} />
        )}
      </div>
    </Account>
  );
}

export default Orders;

const createBtnStatus = (status) => {
  if (status === "pending")
    return (
      <Button variant="danger btn-xs w-50" className=" text-uppercase">
        {" "}
        <span className="flex-center">{status}</span>
      </Button>
    );
  return (
    <Button variant="success btn-xs w-50" className=" text-uppercase ">
      <span className="flex-center">{status}</span>
    </Button>
  );
};

function OrdersUpDeskTop({ orders, navigate }) {
  return (
    <Table bordered size="sm" className="m-0">
      <thead>
        <tr className="text-center">
          <th className="w-10 bg-danger align-middle">Đơn hàng</th>
          <th className="w-15  bg-danger align-middle">Ngày</th>
          <th className=" bg-danger align-middle">Địa chỉ </th>
          <th className="w-20 bg-danger align-middle">Giá trị đơn hàng </th>
          <th className="w-20  bg-danger align-middle">TT thanh toán</th>
        </tr>
      </thead>
      <tbody className=" position-relative">
        {orders && orders.length <= 0 ? (
          <div colSpan={5} className=" position-absolute p-center-x mt-3">
            Không có đơn hàng nào.
          </div>
        ) : (
          orders.map((order, index) => (
            <tr className="text-center" key={index}>
              <td
                className="align-middle text-info cursor p-2"
                onClick={() =>
                  navigate(clientRoutes.account.orders + "/" + order.id)
                }
              >
                <span className="text-nowrap">#{index + 1}</span>
              </td>
              <td className="align-middle p-2">
                {formatDate(order.createdAt)}
              </td>
              <td className="align-middle p-2">
                {order.address.residence +
                  ", " +
                  order.address.province +
                  ", " +
                  order.address.district +
                  ", " +
                  order.address.ward +
                  ", "}
              </td>
              <td className="align-middle p-2">
                {formatCurrency(order.orderTotal)}
              </td>
              <td className="align-middle p-2">
                {createBtnStatus(order.status)}
              </td>
            </tr>
          ))
        )}
      </tbody>
    </Table>
  );
}

function OrdersDownDeskTop({ orders, navigate }) {
  return (
    <Table>
      {orders.map((order, index) => (
        <>
          <tbody key={index}>
            <tr className="text-size-14">
              <td className="w-10 border border-white">Đơn hàng</td>
              <td
                className="fw-light border border-white text-info cursor text-nowrap"
                onClick={() =>
                  navigate(clientRoutes.account.orders + "/" + order.id)
                }
              >
                #{index + 1}
              </td>
            </tr>
            <tr className="text-size-14">
              <td className="w-10 border border-white">Ngày</td>
              <td className="fw-light border border-white">
                {formatDate(order.createdAt)}
              </td>
            </tr>
            <tr className="text-size-14">
              <td className="w-10 border border-white">Địa chỉ</td>
              <td className="fw-light border border-white">
              {order.address.residence +
                  ", " +
                  order.address.province +
                  ", " +
                  order.address.district +
                  ", " +
                  order.address.ward +
                  ", "}
              </td>
            </tr>
            <tr className="text-size-14">
              <td className="w-15 border border-white">Giá trị đơn hàng</td>
              <td className="fw-light border border-white">
                {" "}
                {formatCurrency(order.orderTotal)}
              </td>
            </tr>
            <tr className="text-size-14">
              <td className="w-10 border border-white">TT thanh toán</td>
              <td className="fw-light border border-white">
                {createBtnStatus(order.status)}
              </td>
            </tr>
          </tbody>{" "}
          <hr className="w-100 text-danger" />
        </>
      ))}
    </Table>
  );
}
