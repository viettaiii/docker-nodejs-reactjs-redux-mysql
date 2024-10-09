import { useEffect } from "react";
import {
  Container,
  Form,
  Table,
  Button
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";


import { formatCurrency, formatDate } from "../../utils/format";
import { getOrderList } from "../../features/order/orderSlice";

function ListOrder() {
  const dispatch = useDispatch();
  const { orders } = useSelector((store) => store.order);
  useEffect(() => {
    dispatch(getOrderList());
  }, []);

  return (
    <Container className="products">
      {/* PAGE LIST PRODUCTS*/}
      <h4 className="py-4">
        <strong>Orders</strong>
      </h4>

      {/* SECTION */}
      {/*Tables  */}
      <div>
        <Table variant="light" responsive className="custom-table mt-4">
          <thead>
            <tr>
              <th>
                <Form.Check
                  type="checkbox"
                  name="selectAll"
                />
              </th>
              <th className="text-center">Đơn hàng</th>
              <th className="text-center">Khach Hang</th>
              <th className="text-center">Ngày</th>
              <th className="text-center">Địa chỉ</th>
              <th className="text-center">Giá trị đơn hàng</th>
              <th className="text-center">Status</th>
            </tr>
          </thead>
          <tbody>
          {orders && orders.length <= 0 ? (
          <div colSpan={5} className=" position-absolute p-center-x mt-3">
            Không có đơn hàng nào.
          </div>
        ) : (
          orders.map((order, index) => (
            <tr className="text-center" key={index}>
              <td
                className="align-middle text-info cursor p-2"
              >
                <Form.Check
                  type="checkbox"
                  name="selectAll"
                />
              </td>
              <td
                className="align-middle text-info cursor p-2"
              >
                <span className="text-nowrap">#{index + 1}</span>
              </td>
             
              <td className="align-middle p-2">
              {order.user.email}
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
      </div>
    </Container>
  );
}

export default ListOrder;


const createBtnStatus = (status) => {
  if (status === "pending")
    return (
      <Button variant="danger btn-xs w-50 fs-12" className=" text-uppercase">
        
        <span className="flex-center" >{status}</span>
      </Button>    );
  return (
    <Button variant="success btn-xs w-50 fs-12" className=" text-uppercase ">
      <span className="flex-center" >{status}</span>
    </Button>
  );
};