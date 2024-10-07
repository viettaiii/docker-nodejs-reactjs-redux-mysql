import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Button, Form, Offcanvas } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setIsNavSearch, setOptionChoose } from "../../features/navSearchSlice";

let menu = [
  {
    title: "CHỌN MỨC GIÁ",
    subMenu: [
      { title: "Tất cả", name: "numericFilters", value: "all" },
      { title: "Dưới 2 triệu", name: "numericFilters", value: "price<2000000" },
      {
        title: "Từ 2 triệu - 6 triệu",
        name: "numericFilters",
        value: "price>2000000,price<=6000000",
      },
      {
        title: "Từ 6 triệu - 15 triệu",
        name: "numericFilters",
        value: "price>6000000,price<=15000000",
      },
      {
        title: "Từ 15 triệu - 20 triệu",
        name: "numericFilters",
        value: "price>15000000,price<=20000000",
      },
      {
        title: "Trên 20 triệu",
        name: "numericFilters",
        value: "price>20000000",
      },
    ],
  },
];

function NavSearch({}) {
  const dispatch = useDispatch();
  // create menu el
  const { isNavSearch, optionChoose } = useSelector((store) => store.navSearch);
  // const { categories } = useSelector((store) => store.category);
  // const { colors } = useSelector((store) => store.color);
  // const { providers } = useSelector((store) => store.provider);
  // useEffect(() => {
  //   const subMenuCategory = categories.map((category) => {
  //     const option = {
  //       title: category.categoryName,
  //       name: "categoryId",
  //       value: category.id,
  //     };
  //     return option;
  //   });
  //   const subMenuColor = colors.map((color) => {
  //     const option = {
  //       title: stringUpperCase(color.value),
  //       name: "colorId",
  //       value: color.id,
  //     };
  //     return option;
  //   });
  //   const subMenuProvider = providers.map((provider) => {
  //     const option = {
  //       title: provider.providerName,
  //       name: "providerId",
  //       value: provider.id,
  //     };
  //     return option;
  //   });
  //   menu.push({ title: "LOẠI SẢN PHẨM", subMenu: subMenuCategory });
  //   menu.push({ title: "NHÀ CUNG CẤP", subMenu: subMenuProvider });
  //   menu.push({ title: "MÀU SẮC", subMenu: subMenuColor });
  // }, []);

  const createMenu = () => {
    return menu.map((item, index) => (
      <div key={index} className=" border-bottom py-2 mt-1 ">
        {" "}
        <h4 className="text-size-16 fw-bold">{item.title}</h4>
        <div className="">
          {item.subMenu.map((subItem, subIndex) => (
            <div key={subIndex} className="text-size-14 fw-light py-1">
              <Form.Check
                inline
                onClick={() => {
                  dispatch(setOptionChoose(subItem));
                  dispatch(setIsNavSearch(false));
                }}
                label={subItem.title}
                checked={subItem.title === optionChoose?.title}
                name="group1"
                id={`inline-${subIndex}`}
                type="checkbox"
              />
            </div>
          ))}
        </div>
      </div>
    ));
  };
  return (
    <Offcanvas
      style={{ width: "320px" }}
      show={isNavSearch}
      onHide={() => dispatch(setIsNavSearch(false))}
    >
      <Offcanvas.Header>
        <div className="w-100">
          <div className="d-flex justify-content-between align-items-center w-100 mb-2">
            <span className="fw-bold text-primary text-size-15 d-block">
              Bạn chọn
            </span>
            <span
              className="fw-light text-danger text-size-14 d-block cursor"
              onClick={() => {
                dispatch(setOptionChoose({ title: "Tất cả" }));
                setIsNavSearch(false);
              }}
            >
              Reset <FontAwesomeIcon icon={faClose} />
            </span>
          </div>
          <div className="w-100 d-flex gap-1 flex-lg-wrap">
            {optionChoose && (
              <span className="px-2 py-1 bg-primary text-size-14 rounded-2 text-white">
                <FontAwesomeIcon
                  icon={faClose}
                  className="px-1"
                  onClick={() => {
                    dispatch(setOptionChoose({ title: "Tất cả" }));
                    setIsNavSearch(false);
                  }}
                />
                {optionChoose?.title}
              </span>
            )}
          </div>
        </div>
      </Offcanvas.Header>
      <Offcanvas.Body>
        {createMenu()}

        <Button
          onClick={() => dispatch(setIsNavSearch(false))}
          className="py-2 px-2 position-absolute top-0 right--10 text-white hover-bg-secondary"
        >
          <FontAwesomeIcon icon={faClose} />
        </Button>
      </Offcanvas.Body>
    </Offcanvas>
  );
}

export default NavSearch;
