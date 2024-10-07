import { Link } from "react-router-dom";
import HelmetCustom from "../components/HelmetCustom";
import { clientRoutes } from "../routes";

function AuthRequired() {
  return (
    <>
      <HelmetCustom title="Yêu cầu đăng nhập" />
      <div className="container">
        <div className="d-flex pt-5 align-items-center vh-100 text-white flex-column">
    
          <p className=" w-50 text-center text-wrap fs-4 text-primary d-flex align-items-center flex-column gap-1">
            Vui lòng đăng nhập!
          </p>
          <Link to={clientRoutes.account.login} className="fw-bold text-info">
            Đăng nhập ngay!
          </Link>
        </div>
      </div>
    </>
  );
}

export default AuthRequired;
