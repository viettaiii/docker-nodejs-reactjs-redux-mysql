import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { verifyEmailAuth } from "../../../features/auth/authSlice";
import { useDispatch } from "react-redux";

import { clientRoutes } from "../../../routes";
import HelmetCustom from "../../../components/HelmetCustom";
import Breadcrumb from "../../../components/Breadcrumb";
import { setIsLoadingComp } from "../../../features/loadingCompSlice";

function VerifyEmail() {
  const location = useLocation();
  const dispatch = useDispatch();
  const params = new URLSearchParams(location.search);
  const verificationToken = params.get("token");
  const email = params.get("email");
  const navigate = useNavigate();
  useEffect(() => {
    const verifyEmailAsync = async () => {
      await dispatch(verifyEmailAuth({ verificationToken, email }));
      navigate(clientRoutes.account.login);
    };
    dispatch(setIsLoadingComp(true));
    verifyEmailAsync();
    dispatch(setIsLoadingComp(false));
  }, []);
  return (
    <div className="container d-flex align-content-center justify-content-center">
      <HelmetCustom title="Xác minh" />
      <Breadcrumb title="Xác minh tài khoản" />
    </div>
  );
}

export default VerifyEmail;
