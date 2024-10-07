import { useEffect, useState } from "react";
import OffcanvasFrame from "./OffcanvasFrame";
import {
  Button,
  Col,
  Form,
  Image,
  OverlayTrigger,
  Row,
  Tooltip,
} from "react-bootstrap";
import { useDispatch } from "react-redux";
import httpRequest from "../../api/httpRequest";

function OffvancasViewProduct({
  handleClose,
  show,
  optionsCategory,
  optionsProvider,
  colors,
  slug,
}) {
  const dispatch = useDispatch();

  useEffect(() => {
    const getProductDetail = async (slug) => {
      try {
        const { data } = await httpRequest.get("/products/" + slug);
        setProduct(data.data);
        setProductItems(data.data.productItems);
      } catch (err) {
        console.log(err);
      }
    };

    slug && getProductDetail(slug);
  }, [slug, dispatch]);

  // REACT
  const [product, setProduct] = useState({});

  const [productItems, setProductItems] = useState([
    { qtyInStock: 0, image: null, colorId: "" },
  ]);

  // TẠO OPTIONS COLORS
  const createOptionColor = (colors) => {
    return colors.map((color) => {
      return (
        <option key={color.id} disabled={true} value={color.id}>
          {color.value}
        </option>
      );
    });
  };

  // Fake image selected
  const fakeImage = (image) => {
    if (typeof image === "object") image = URL.createObjectURL(image);
    else image = process.env.REACT_APP_BACKEND_UPLOAD_URL + "/" + image;
    return <Image className="w-50 h-50" src={image} alt="" />;
  };

  // TẠO RENDER PRODUCT ITEM
  const renderProductItem = (productItems) => {
    return productItems.map((productItem, index) => {
      return (
        <Form.Group key={index} className="mt-1">
          <Row>
            <Col>
              <Form.Control
                type="number"
                placeholder="Số lượng"
                name="qtyInStock"
                value={productItem.qtyInStock}
                disabled={true}
              />
            </Col>
            <Col xl="2">
              <Form.Label htmlFor={`product-item-image-${index}`}>
                {productItem.image ? (
                  fakeImage(productItem.image)
                ) : (
                  <Form.Control
                    type="file"
                    id={`product-item-image-${index}`}
                    name="image"
                    disabled={true}
                  />
                )}
                <Form.Control
                  type="file"
                  id={`product-item-image-${index}`}
                  name="image"
                  hidden={true}
                  disabled={true}
                />
              </Form.Label>
            </Col>
            <Col>
              <Form.Select name="colorId" value={productItem.colorId}>
                <option hidden disabled={true}>
                  Màu SP
                </option>
                {createOptionColor(colors)}
              </Form.Select>
            </Col>
            <Col xl="1" className="d-flex align-items-center">
              <OverlayTrigger
                placement="top"
                delay={{ show: 150, hide: 200 }}
                overlay={
                  <Tooltip id="button-tooltip">
                    Mô tả: Sản phẩm đặc biệt liên hể để mua
                  </Tooltip>
                }
              >
                <Form.Check // prettier-ignore
                  type="switch"
                  name="isSpecial"
                  value={productItem.isSpecial}
                  disabled={true}
                />
              </OverlayTrigger>
            </Col>
          </Row>
        </Form.Group>
      );
    });
  };

  return (
    <OffcanvasFrame
      show={show}
      title={"View"}
      handleClose={handleClose}
      className="w-40"
    >
      <span className="text-success text-md">Thông tin</span>
      <hr />
      <Form>
        <Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Tên</Form.Label>
            <Form.Control
              type="text"
              placeholder="Tên sản phẩm..."
              name="name"
              value={product.name}
              disabled={true}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Giá</Form.Label>
            <Form.Control
              type="text"
              placeholder="Giá"
              name="price"
              value={product.price}
              disabled={true}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Mô tả </Form.Label>
            <Form.Control
              type="text"
              placeholder="Giá"
              name="description"
              value={product.description}
              disabled={true}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>% Sales</Form.Label>
            <Form.Control
              type="text"
              placeholder="%Sales"
              name="discount"
              value={product.discount}
              disabled={true}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Loại</Form.Label>
            <Form.Select
              name="categoryId"
              value={product.categoryId}
              disabled={true}
            >
              <option hidden>Loại</option>
              {optionsCategory}
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Nhà cung cấp</Form.Label>
            <Form.Select
              name="providerId"
              value={product.providerId}
              disabled={true}
            >
              <option hidden>Nhà cung cấp</option>
              {optionsProvider}
            </Form.Select>
          </Form.Group>
          <Form.Group>
            <Form.Label className="text-success">Sản phẩm con</Form.Label>
            {renderProductItem(productItems)}
          </Form.Group>
        </Form.Group>
      </Form>
    </OffcanvasFrame>
  );
}

export default OffvancasViewProduct;
