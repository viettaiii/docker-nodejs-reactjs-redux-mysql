import { Button, Container, Form, Pagination, Table } from "react-bootstrap";
import Section from "../../components/Section";
import { useDispatch, useSelector } from "react-redux";
import { formatDate } from "../../utils/format";
import { useEffect, useState } from "react";
import { useDebounce } from "@uidotdev/usehooks";
import {
  getUsers,
  resetQueryUser,
  setQueryUser,
} from "../../features/user/userSlice";
function ListCustomer() {
  const { users, totalPages, query, page } = useSelector((store) => store.user);

  const dispatch = useDispatch();
  const [selectBy, setSelectBy] = useState("name");

  // add new category
  // render row category

  // create status verify
  const createStatus = (isVerified) => {
    let status = "verified";
    if (!isVerified) {
      status = "unverified";
    }
    return <span className={status}>{status}</span>;
  };

  const createRow = (users) => {
    return users.map((user) => {
      return (
        <tr key={user.id}>
          <td>
            <span>{user.name}</span>
          </td>
          <td>
            <span>{user.email}</span>
          </td>
          <td>{createStatus(user.isVerified)}</td>
          <td>
            <span>
              {user.verifiedDate
                ? formatDate(user.verifiedDate)
                : createStatus(user.verifiedDate)}
            </span>
          </td>
          <td>
            <span>{formatDate(user.createdAt)}</span>
          </td>
          <td>
            <span>{formatDate(user.updatedAt)}</span>
          </td>
          <td>
            <div className="d-flex gap-3">
              <span className="mdi mdi-note-edit-outline icon-md hover-color-success"></span>
              <span className="mdi mdi-trash-can-outline icon-md hover-color-success"></span>
            </div>
          </td>
        </tr>
      );
    });
  };

  // handle query
  const debouncedSearchTerm = useDebounce(query, 500);
  const [isSearching, setIsSearching] = useState(false);
  const handleQuery = (e) => {
    setIsSearching(true);
    dispatch(
      setQueryUser({ name: e.target.name, value: e.target.value.trim() })
    );
  };

  useEffect(() => {
    const executeSearch = async () => {
      setIsSearching(true);
      if (debouncedSearchTerm) {
        await dispatch(getUsers(debouncedSearchTerm));
      }
      setIsSearching(false);
    };
    executeSearch();
  }, [debouncedSearchTerm]);

  return (
    <Container>
      <h4 className="py-4">
        <strong>Khách hàng</strong>
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
        <div className="d-flex gap-10"></div>
      </Section>

      {/* SECTION */}
      <Section>
        <div className="w-100">
          <Form.Control
            name={selectBy}
            placeholder={`Tìm kiếm theo ${selectBy}`}
            value={query[selectBy]}
            onChange={handleQuery}
          />
        </div>
        <div className="w-100 ms-2">
          <Form.Select
            onChange={(e) => {
              dispatch(resetQueryUser());
              setSelectBy(e.target.value);
            }}
          >
            <option value="name">Tìm theo tên</option>
            <option value="email">Tìm theo email</option>
          </Form.Select>
        </div>
      </Section>

      <div>
        <Table variant="light" responsive className="custom-table mt-4">
          <thead>
            <tr>
              <th>Tên</th>
              <th>Email</th>
              <th>Xác minh</th>
              <th>Ngày xác minh</th>
              <th>Ngày tạo</th>
              <th>Ngày sửa</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{createRow(users)}</tbody>
        </Table>
      </div>
      {/* Pagination page */}
      <div className="w-100 bg-white rounded-bottom px-2 py-3 d-flex justify-content-between align-items-center">
        <div>{/* Show 1-{perPage} của {total} */}</div>
        <div>
          <Pagination>
            <Pagination.Prev
              onClick={() => {
                setIsSearching(true);
                let prePage = page - 1;
                if (page === 1) {
                  prePage = totalPages;
                }
                dispatch(getUsers({ page: prePage }));
              }}
            />
            {Array.from({ length: totalPages }, (_, index) => (
              <Pagination.Item
                key={index + 1}
                active={page === index + 1}
                onClick={() => {
                  setIsSearching(true);
                  dispatch(getUsers({ page: index + 1 }));
                }}
              >
                {index + 1}
              </Pagination.Item>
            ))}
            <Pagination.Next
              onClick={() => {
                setIsSearching(true);
                let nextPage = page + 1;
                if (page === totalPages) {
                  nextPage = 1;
                }
                dispatch(getUsers({ page: nextPage }));
              }}
            />
          </Pagination>
        </div>
      </div>
    </Container>
  );
}

export default ListCustomer;
