import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { resetPasswordAuth } from "../../../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";

import { clientRoutes } from "../../../routes";
import HelmetCustom from "../../../components/HelmetCustom";
import Breadcrumb from "../../../components/Breadcrumb";
import { validateFormResetPassword } from "../../../utils/validate";
import { toastWarning } from "../../../utils/toast";
import { Button, Form } from "react-bootstrap";
import { setIsLoadingComp } from "../../../features/loadingCompSlice";

function ResetPassword() {
  const location = useLocation();
  const [inputs, setInputs] = useState({
    password1: "",
    password2: "",
  });
  const dispatch = useDispatch();
  const params = new URLSearchParams(location.search);
  const passwordToken = params.get("token");
  const email = params.get("email");
  const { isLoading } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // useEffect(() => {
  //   const verifyEmailAsync = async () => {
  //
  //   };
  //   verifyEmailAsync();
  // }, []);
  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (isLoading) return;
    const err = validateFormResetPassword(inputs);
    if (err) {
      toastWarning(err);

      return;
    }
    dispatch(setIsLoadingComp(true));
    const { payload } = await dispatch(
      resetPasswordAuth({
        passwordToken,
        email,
        password: inputs.password1,
        confirmPassword: inputs.password2,
      })
    );

    if (payload.status === 200) {
      navigate(clientRoutes.account.login);
    }
    dispatch(setIsLoadingComp(false));
  };
  return (
    <>
      <Breadcrumb title="Đặt lại mật khẩu" />
      <HelmetCustom title="Đặt lại mật khẩu" />
      <div className="container">
        <h4>Lấy lại mật khẩu</h4>
        <p>Nhập mật khẩu mới</p>
        <Form className="form d-flex flex-column gap-2">
          <label className="">
            Mật khẩu<sup>*</sup>
          </label>
          <Form.Control
            type="password"
            name="password1"
            onChange={handleChange}
          />
          <label className="">
            Xác nhận mật khẩu<sup>*</sup>
          </label>
          <Form.Control
            type="password"
            name="password2"
            onChange={handleChange}
          />
          <div className="mb-3">
            <Button
              variant="primary"
              className="me-5"
              onClick={handleResetPassword}
            >
              Đổi mật khẩu
            </Button>
            <Button
              onClick={(e) => {
                e.preventDefault();
                navigate(clientRoutes.home);
              }}
              variant="outline-primary"
              className="text-decoration-underline"
            >
              Hủy
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
}

export default ResetPassword;
