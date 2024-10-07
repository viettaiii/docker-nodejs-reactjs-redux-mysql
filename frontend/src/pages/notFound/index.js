import { useNavigate } from "react-router-dom";

// MY IMPORTS
import LazyImage from "../../components/LazyImage";
import HelmetCustom from "../../components/HelmetCustom";
function NotFound() {
  const navigate = useNavigate();
  return (
    <div>
      <HelmetCustom title="not found" />
      <div className="container">
        <div className="d-flex  align-items-center vh-100 text-white flex-column">
          <LazyImage
            src={
              "https://res.cloudinary.com/dkkh1gtoj/image/upload/v1698039166/viettaiit-ecommerce/not-found.png"
            }
            className={"w-50 h-50 mt-5 object-fit-contain"}
          />
          <p className=" w-50 text-center text-wrap fs-4 text-primary d-flex align-items-center flex-column gap-1">
            Xin lỗi, trang này không tồn tại, vui lòng quay lại trang chủ
          </p>
          <button
            onClick={() => navigate(-1)}
            type="button"
            className="btn btn-secondary"
          >
            Quay lại trang chủ
          </button>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
