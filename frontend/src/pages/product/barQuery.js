import { useDispatch, useSelector } from "react-redux";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { faArrowDownAZ, faFilter } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// MY IMPORTS
import { setQueryProduct } from "../../features/product/productSlice";
import { setIsNavSearch } from "../../features/navSearchSlice";
import PropTypes from "prop-types";
function BarQuery({ sortValue }) {
  const dispatch = useDispatch();
  const handleQueryProduct = (name, value) => {
    dispatch(setQueryProduct({ name, value }));
  };
  const itemRight = [
    {
      title: "Mặc định",
      value: "createdAt",
    },
    { title: "Tên A-Z", value: "name" },
    {
      title: "Tên A-Z",
      value: "-name",
    },
    {
      title: "Giá thấp đến cao",
      value: "price",
    },
    { title: "Giá cao đến thấp", value: "-price" },
  ];
  return (
    <div className="bar-query my-4">
      <div className="wrapper">
        <div className="left" onClick={() => dispatch(setIsNavSearch(true))}>
          <FontAwesomeIcon icon={faFilter} />
          <span>Bộ lọc</span>
          <small className=" ">0</small>
        </div>
        <div className="right  max-lg-none">
          <div className="d-flex gap-2 align-items-center">
            <FontAwesomeIcon icon={faArrowDownAZ} />
            <span>Xếp theo</span>
          </div>
          {itemRight.map((item, index) => (
            <div
              key={index}
              className={`item ${sortValue === item.value ? "active" : ""}`}
              onClick={() => handleQueryProduct("sort", item.value)}
            >
              {item.title}
            </div>
          ))}
        </div>
        <DropdownButton
          id="dropdown-basic-button"
          className="max-lg-display d-none right"
          title="Tùy chọn"
        >
          {" "}
          <div className="d-flex gap-2 align-items-center">
            <FontAwesomeIcon icon={faArrowDownAZ} />
            <span>Xếp theo</span>
          </div>
          {itemRight.map((item, index) => (
            <Dropdown.Item
              key={index}
              className={`item ${sortValue === item.value ? "active" : ""}`}
              onClick={() => handleQueryProduct("sort", item.value)}
            >
              {item.title}
            </Dropdown.Item>
          ))}
        </DropdownButton>
      </div>
    </div>
  );
}

export default BarQuery;

BarQuery.propTypes = {
  sortValue: PropTypes.string,
};
