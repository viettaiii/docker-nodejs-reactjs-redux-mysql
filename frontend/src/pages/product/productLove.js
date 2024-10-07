import { useSelector } from "react-redux";

// MY IMPORTS
import Breadcrumb from "../../components/Breadcrumb";
import HelmetCustom from "../../components/HelmetCustom";
import ListProductSlide from "../../components/ListProductSlide";
import ProductNone from "../../components/Product/productNone";

function ProductLove() {
  const { productsLove } = useSelector((store) => store.productFutureLocal);
  return (
    <div>
      <Breadcrumb title="Sản phẩm ưu thích" />
      <HelmetCustom title="Sản phẩm ưu thích" />
      <div className="container mt-2">
        <h5 className="fw-bold ">SẢN PHẨM YÊU THÍCH</h5>
        {productsLove && productsLove.length <= 0 ? (
          <ProductNone />
        ) : (
          <ListProductSlide
            products={productsLove}
            hiddenSold
            hiddenDesc
            cart
          />
        )}
      </div>
    </div>
  );
}

export default ProductLove;
