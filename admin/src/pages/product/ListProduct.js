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
function ListProduct() {
  const dispatch = useDispatch();

  // STORE REDUX
  const { products, perPage, total, query, totalPages, page } = useSelector(
    (store) => store.product
  );
  const { categories } = useSelector((store) => store.category);
  const { providers } = useSelector((store) => store.provider);
  const { colors } = useSelector((store) => store.color);

  // DELETE PRODUCT
  const [slugsDelete, setSlugsDelete] = useState([]);
  const [slugProduct, setSlugProduct] = useState(null);
  const [isModal, setIsModal] = useState(false);
  // Handle check box select
  const handleCheckBoxChange = (e) => {
    const isSelected = slugsDelete.find((slug) => slug === e.target.value);
    if (isSelected) {
      setSlugsDelete((prev) => [
        ...prev.filter((slug) => slug !== e.target.value),
      ]);
      return;
    }
    setSlugsDelete((prev) => [...prev, e.target.value]);
  };

  // handle delete many product

  const handleDeleteManyProduct = async (slugsDelete) => {
    setSlugsDelete([]);
    const { payload } = await dispatch(deleteManyProduct(slugsDelete));
    if (payload.status === 200) {
      dispatch(getProducts());
    }
  };

  // delete one product
  const handleDeleteProduct = async (slugProduct) => {
    setSlugProduct(null);
    const { payload } = await dispatch(deleteProduct(slugProduct));
    if (payload.status === 200) {
      dispatch(getProducts());
    }
  };

  // handle modal delete product
  const handleModalDeleteProduct = () => {
    setIsModal(false);
    dispatch(setSpinner(true));
    if (slugProduct) {
      handleDeleteProduct(slugProduct);
    } else if (slugsDelete.length > 0) {
      handleDeleteManyProduct(slugsDelete);
    }
    dispatch(setSpinner(false));
  };

  // ============================== RENDER REACTJS ===================================
  // TẠO STATUS
  const createStatus = (inventoryCount) => {
    let status = "selling";
    if (parseInt(inventoryCount) <= 0) {
      status = "sold-out";
    }
    return <span className={status}>{status}</span>;
  };

  // TẠO ROWS TABLES PRODUCT
  const createRow = (products) => {
    return products.map((product, index) => {
      const isChecked = slugsDelete.includes(product.slug);
      return (
        <tr key={index + 1}>
          <td>
            <Form.Check
              className="mt-1"
              type="checkbox"
              name={product.name}
              value={product.slug}
              checked={isChecked}
              onChange={handleCheckBoxChange}
            />
          </td>
          <td className="  w-20 h-20">
            <div className="d-flex gap-1 align-items-center">
              <span className="me-1 w-10 h-10">
                <Image src={product.image} roundedCircle />
              </span>
              <OverlayTrigger
                placement="top"
                delay={{ show: 250, hide: 300 }}
                overlay={<Tooltip id={product.id}>{product.name}</Tooltip>}
              >
                <span className="text-wrap-1"> {product.name}</span>
              </OverlayTrigger>
            </div>
          </td>
          <td>{product.category.categoryName}</td>
          <td>{product.provider.providerName}</td>
          <td>
            <strong>{formatCurrency(product.price)}</strong>
          </td>
          <td>
            <strong>
              {formatCurrency(
                product.price - (product.price * product.discount) / 100
              )}
            </strong>{" "}
          </td>
          <td>{product.inventoryCount}</td>
          <td>{createStatus(product.inventoryCount)}</td>
          <td>
            <span
              className="mdi mdi-loupe icon-md hover-color-success"
              onClick={() => {
                setSlugProduct(product.slug);
                setShowView(true);
              }}
            ></span>
          </td>
          <td>
            <span>{formatDate(product.createdAt)}</span>
          </td>
          <td>
            <span>{formatDate(product.updatedAt)}</span>
          </td>
          <td>
            <div className="d-flex gap-3">
              <span
                className="mdi mdi-note-edit-outline icon-md hover-color-success"
                onClick={() => {
                  handleShowEdit();
                  setSlugProduct(product.slug);
                }}
              ></span>
              <span
                className="mdi mdi-trash-can-outline icon-md hover-color-success"
                onClick={() => {
                  setIsModal(true);
                  setSlugProduct(product.slug);
                }}
              ></span>
            </div>
          </td>
        </tr>
      );
    });
  };

  // TẠO OPTION CATEGORY
  const createOptionCategory = useCallback((categories) => {
    return categories.map((category) => {
      return (
        <option key={category.id} value={category.id}>
          {category.categoryName}
        </option>
      );
    });
  }, []);

  // TẠO OPTION PROVIDER
  const createOptionProvider = useCallback((providers) => {
    return providers.map((provider) => {
      return (
        <option key={provider.id} value={provider.id}>
          {provider.providerName}
        </option>
      );
    });
  }, []);
  // TẠO OPTION COLOR

  // Tạo options price
  const createOptionPrice = useCallback(
    (optionsPrice) => {
      return optionsPrice.map((option) => {
        return (
          <option key={option.value} value={option.value}>
            {option.title}
          </option>
        );
      });
    },
    [optionsPrice]
  );

  // button actions
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [showEdit, setShowEdit] = useState(false);
  const [showView, setShowView] = useState(false);
  const handleCloseEdit = () => {
    setShowEdit(false);
    setSlugProduct(null);
  };
  const handleCloseView = () => {
    setShowView(false);
    setSlugProduct(null);
  };
  const handleShowEdit = () => setShowEdit(true);

  // ================ SEARCH PRODUCT ================
  const debouncedSearchTerm = useDebounce(query, 500);
  const [isSearching, setIsSearching] = useState(false);
  const handleQuery = (e) => {
    setIsSearching(true);
    dispatch(setQueryProduct({ name: e.target.name, value: e.target.value }));
  };

  useEffect(() => {
    const executeSearch = async () => {
      setIsSearching(true);
      if (debouncedSearchTerm) {
        await dispatch(getProducts(debouncedSearchTerm));
      }
      setIsSearching(false);
    };
    executeSearch();
  }, [debouncedSearchTerm]);

  return (
    <Container className="products">
      {/* MODAL ADD NEW PRODUCt */}
      <OffvancasAddProduct
        optionsCategory={createOptionCategory(categories)}
        optionsProvider={createOptionProvider(providers)}
        colors={colors}
        show={show}
        handleClose={handleClose}
      />

      <OffvancasEditProduct
        optionsCategory={createOptionCategory(categories)}
        optionsProvider={createOptionProvider(providers)}
        colors={colors}
        show={showEdit}
        slug={slugProduct}
        handleClose={handleCloseEdit}
      />

      <OffvancasViewProduct
        optionsCategory={createOptionCategory(categories)}
        optionsProvider={createOptionProvider(providers)}
        colors={colors}
        show={showView}
        slug={slugProduct}
        handleClose={handleCloseView}
      />

      {/* PAGE LIST PRODUCTS*/}
      <h4 className="py-4">
        <strong>Sản pham</strong>
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
          <Button
            variant="danger btn-xl btn-icon"
            onClick={() => setIsModal(true)}
            disabled={slugsDelete.length <= 0}
          >
            <span className="mdi mdi-trash-can-outline icon-md "></span>
            <span>Xóa</span>
          </Button>
          <Button variant="success btn-xl btn-icon ms-2" onClick={handleShow}>
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
            placeholder="Tìm kiếm sản phẩm..."
            name="name"
            value={query.name}
            onChange={handleQuery}
          />
        </div>
        <div className="w-100 ms-1">
          <Form.Select name="categoryId" onChange={handleQuery}>
            <option hidden>Loại</option>
            <option value="all">All</option>
            {createOptionCategory(categories)}
          </Form.Select>
        </div>
        <div className="w-100 ms-1">
          <Form.Select name="providerId" onChange={handleQuery}>
            <option hidden>Nhà cung cấp</option>
            <option value="all">All</option>
            {createOptionProvider(providers)}
          </Form.Select>
        </div>
        <div className="w-100 ms-1">
          <Form.Select name="sort" onChange={handleQuery}>
            <option hidden>Giá</option>
            <option value="all">All</option>
            {createOptionPrice(optionsPrice)}
          </Form.Select>
        </div>
      </Section>

      {/*Tables  */}
      <div>
        <Table variant="light" responsive className="custom-table mt-4">
          <thead>
            <tr>
              <th>
                <Form.Check
                  type="checkbox"
                  name="selectAll"
                  checked={
                    products.length > 0 &&
                    slugsDelete.length === products.length
                  }
                  onChange={() => {
                    const isSelectedAll = slugsDelete.length > 0;
                    if (isSelectedAll) return setSlugsDelete([]);
                    const slugs = products.map((product) => product.slug);
                    setSlugsDelete(slugs);
                  }}
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
          {isSearching ? (
            <div className="d-flex align-content-center justify-content-center">
              Searching...
            </div>
          ) : (
            <tbody>{createRow(products)}</tbody>
          )}
        </Table>
      </div>

      {/* Pagination page */}
      <div className="w-100 bg-white rounded-bottom px-2 py-3 d-flex justify-content-between align-items-center">
        <div>
          Show 8 - {perPage} của {total}
        </div>
        <div>
          <Pagination>
            <Pagination.Prev
              onClick={() => {
                setIsSearching(true);
                let prePage = page - 1;
                if (page === 1) {
                  prePage = totalPages;
                }
                dispatch(getProducts({ page: prePage }));
                setIsSearching(false);
              }}
            />
            {Array.from({ length: totalPages }, (_, index) => (
              <Pagination.Item
                key={index + 1}
                active={page === index + 1}
                onClick={() => {
                  setIsSearching(true);
                  dispatch(getProducts({ page: index + 1 }));
                  setIsSearching(false);
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
                dispatch(getProducts({ page: nextPage }));
                setIsSearching(false);
              }}
            />
          </Pagination>
        </div>
      </div>

      {/* Modal comfirm delete product*/}
      <Modal
        show={isModal}
        size="xs"
        onHide={() => setIsModal(false)}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Xóa sản phẩm
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5 className="text-danger">Bạn có chắc là muốn xóa sản phẩm này</h5>
          <p>Sản phẩm này không thể khôi phục sau khi bạn đã xóa!</p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="success btn-md px-5"
            onClick={handleModalDeleteProduct}
          >
            Xóa
          </Button>
          <Button
            variant="outline-danger btn-md"
            onClick={() => setIsModal(false)}
          >
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default ListProduct;
