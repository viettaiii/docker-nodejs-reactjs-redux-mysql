import { Button, Container, Form, Pagination, Table } from "react-bootstrap";
import Section from "../../components/Section";
import { useSelector } from "react-redux";
import { formatDate } from "../../utils/format";
import { useState } from "react";
function ListCategory() {
  const { categories } = useSelector((store) => store.category);
  const [editId, setEditId] = useState(null);
  const [value, setValue] = useState("");
  // add new category
  // render row category

  // create edit

  const createRowCategory = (categories) => {
    return categories.map((category, index) => {
      return (
        <tr key={category.id}>
          <td>
            <Form.Check
              className="mt-1"
              type="checkbox"
              name={category.categoryName}
              value={category.categoryName}
            />
          </td>
          <td>
            {category.id === editId ? (
              <input
                style={{ border: "1px solid gray" }}
                type="text"
                value={value || category.categoryName}
                onChange={(e) => setValue(e.target.value)}
              />
            ) : (
              <span>{category.categoryName}</span>
            )}
          </td>
          <td>
            <span>{formatDate(category.createdAt)}</span>
          </td>
          <td>
            <span>{formatDate(category.updatedAt)}</span>
          </td>
          <td>
            {editId ? (
              <div>
                <Button variant="success btn-sm">Lưu</Button>
                <Button
                  variant="danger btn-sm ms-1"
                  onClick={() => {
                    setEditId(null);
                    setValue(null);
                  }}
                >
                  Hủy
                </Button>
              </div>
            ) : (
              <div className="d-flex gap-3">
                <span
                  className="mdi mdi-note-edit-outline icon-md hover-color-success"
                  onClick={() => {
                    setEditId(category.id);
                    setValue(category.categoryName);
                  }}
                ></span>
                <span className="mdi mdi-trash-can-outline icon-md hover-color-success"></span>
              </div>
            )}
          </td>
        </tr>
      );
    });
  };
  return (
    <Container>
      <h4 className="py-4">
        <strong>Loại sản phẩm</strong>
      </h4>

      {/* SECTION */}
      <Section>
        <div className="d-flex gap-10">
          <Button variant="outline-secondary btn-xs btn-icon ">
            <span className="mdi mdi-export icon-md rotate--90"></span>
            <span>Export</span>
          </Button>
          <Button variant="outline-secondary btn-sm btn-icon ms-2">
            <span className="mdi mdi-export  icon-md  rotate-90"></span>
            <span>Import</span>
          </Button>
        </div>
        <div className="d-flex gap-10">
          <Button variant="danger btn-xl btn-icon">
            <span className="mdi mdi-trash-can-outline icon-md "></span>
            <span>Xóa</span>
          </Button>
          <Button variant="success btn-xl btn-icon ms-2">
            <span className="mdi mdi-plus icon-md "></span>
            <span>Thêm</span>
          </Button>
        </div>
      </Section>

      {/* SECTION */}
      <Section>
        <div className="w-100">
          <Form.Control
            type="text"
            placeholder="Tìm kiếm theo loại sản phẩm..."
            name="categoryName"
          />
        </div>
      </Section>

      <div>
        <Table variant="light" responsive className="custom-table mt-4">
          <thead>
            <tr>
              <th>
                <Form.Check type="checkbox" name="selectAll" />
              </th>
              <th>Tên</th>
              <th>Ngày tạo</th>
              <th>Ngày sửa</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{createRowCategory(categories)}</tbody>
        </Table>
      </div>
      {/* Pagination page */}
      <div className="w-100 bg-white rounded-bottom px-2 py-3 d-flex justify-content-between align-items-center">
        <div>{/* Show 1-{perPage} của {total} */}</div>
        <div>
          <Pagination>
            <Pagination.Prev />
            <Pagination.Item></Pagination.Item>
            <Pagination.Next />
          </Pagination>
        </div>
      </div>
    </Container>
  );
}

export default ListCategory;
