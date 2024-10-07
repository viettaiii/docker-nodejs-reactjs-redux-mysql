import { useCallback, useEffect, useState } from "react";
import {
  Button,
  Container,
  Form,
  Image,
  Modal,
  OverlayTrigger,
  Pagination,
  Table,
  Tooltip,
} from "react-bootstrap";
import { useDebounce } from "@uidotdev/usehooks";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteManyProduct,
  deleteProduct,
  getProducts,
  setQueryProduct,
} from "../../features/product/productSlice";

import { formatCurrency, formatDate } from "../../utils/format";
import Section from "../../components/Section";
import OffvancasAddProduct from "../../components/Offcanvas/OffcanvasAddProduct";
import { setSpinner } from "../../features/spinnerSlice";
import OffvancasEditProduct from "../../components/Offcanvas/OffcanvasEditProduct";
import OffvancasViewProduct from "../../components/Offcanvas/OffcanvasViewProduct";

const optionsPrice = [
  {
    title: "Thấp đến Cao",
    value: "price",
  },
  {
    title: "Cao đến Thấp",
    value: "-price",
  },
  {
    title: "Ngày tạo mới đây",
    value: "createdAt",
  },
  {
    title: "Ngày tạo cũ nhất",
    value: "-createdAt",
  },
  {
    title: "Ngày sửa mới đây",
    value: "updatedAt",
  },
  {
    title: "Ngày sửa cũ nhất",
    value: "-updatedAt",
  },
];
function ListOrder() {

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
              <th>Tên</th>
              <th>Loại</th>
              <th>Nhà cung cấp</th>
              <th>Giá</th>
              <th>Giá sale</th>
              <th>Tồn kho</th>
              <th>Status</th>
              <th>Xem</th>
              <th>Ngày tạo</th>
              <th>Ngày sửa</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody></tbody>
        </Table>
      </div>
    </Container>
  );
}

export default ListOrder;
