import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";

// MY IMPORTS
import { checkEmail, validateFormLogin } from "../../utils/validate";

// REDUX SLICE
import {
  forgotPasswordAuth,
  loginAuth,
  logoutAuth,
} from "../../features/auth/authSlice";

import { toastSuccess, toastWarning } from "../../utils/toast";
import { Form } from "react-bootstrap";
import { setIsLoadingComp } from "../../features/loadingCompSlice";
function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  let disabled = !inputs.email || !inputs.password;
  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const err = validateFormLogin(inputs);
    if (err) {
      toastWarning(err);
      return;
    }
    dispatch(setIsLoadingComp(true));
    const { payload } = await dispatch(loginAuth(inputs));
    if (payload.status === 200) {
      if (payload.data.role !== "admin") {
        await dispatch(logoutAuth());
        toastWarning("You do not have permission to access this page");
        navigate("/admin/login");
      } else {
        toastSuccess(payload.message);
        navigate("/admin");
      }
    }
    dispatch(setIsLoadingComp(false));
  };

  const { user } = useSelector((store) => store.auth);
  if (user) return <Navigate to={"/admin"} />;
  return (
    <div className="login">
      <div className="container overflow-hidden">
        <div className="login__form login-admin__form">
          <Form className="form">
            <h5 className="text-center py-2">ĐĂNG NHẬP</h5>
            <div className="form-group">
              <Form.Control
                type="email"
                placeholder="   Email"
                name="email"
                className="mb-3"
                onChange={handleChange}
              />
              <Form.Control
                type="password"
                placeholder="   Mật khẩu"
                name="password"
                className="mb-3"
                onChange={handleChange}
              />
              <div className="mb-3 ">
                <button
                  type="submit"
                  className="btn btn-primary w-100 hover-bg-secondary btn-md"
                  onClick={handleSubmit}
                  disabled={disabled}
                >
                  ĐĂNG NHẬP
                </button>
              </div>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Login;
