import { motion } from "framer-motion";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";

// MY IMPORTS
import { clientRoutes } from "../../../routes";
import { checkEmail, validateFormLogin } from "../../../utils/validate";

// REDUX SLICE
import {
  forgotPasswordAuth,
  loginAuth,
} from "../../../features/auth/authSlice";

import HelmetCustom from "../../../components/HelmetCustom";
import Breadcrumb from "../../../components/Breadcrumb";
import { toastWarning } from "../../../utils/toast";
import { Form } from "react-bootstrap";
import { FaFacebookF, FaGithub, FaGoogle } from "react-icons/fa";
import useScrollTop from "../../../hooks/useScrollTop";
import AnimationComp from "../../../components/AnimationComp";
import { setIsLoadingComp } from "../../../features/loadingCompSlice";
function Login() {
  useScrollTop();
  const [isForgotPwd, setIsForgotPwd] = useState(false);
  const [emailForgot, setEmailForgot] = useState("");
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
      navigate(clientRoutes.home);
      // toastSuccess(payload.message);
    }
    dispatch(setIsLoadingComp(false));
  };
  const handleForgotPwd = async (e) => {
    e.preventDefault();
    const isCheck = checkEmail(emailForgot);
    if (!isCheck) {
      toastWarning("Email không đúng định dạng!");
      return;
    }
    dispatch(setIsLoadingComp(true));
    await dispatch(forgotPasswordAuth({ email: emailForgot }));
    dispatch(setIsLoadingComp(false));
  };

  const { user } = useSelector((store) => store.auth);
  if (user) return <Navigate to={clientRoutes.home} />;
  return (
    <div className="login">
      <HelmetCustom title="Đăng nhập" />
      <Breadcrumb title="Đăng nhập tài khoản" />
      <div className="container overflow-hidden">
        <AnimationComp>
          <div className="login__form">
            <Form className="form">
              <h5 className="text-center py-2">ĐĂNG NHẬP</h5>
              <div className="form-group">
                <Form.Control
                  type="email"
                  placeholder="   Email"
                  name="email"
                  onChange={handleChange}
                />
                <Form.Control
                  type="password"
                  placeholder="   Mật khẩu"
                  name="password"
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
                <div className="mb-3">
                  <p className="d-flex justify-content-between">
                    <span
                      onClick={() => setIsForgotPwd(!isForgotPwd)}
                      className="hover-color-secondary "
                    >
                      Quên mật khẩu?
                    </span>
                    <Link
                      to={clientRoutes.account.register}
                      className="hover-color-secondary "
                    >
                      Đăng ký tại đây
                    </Link>
                  </p>
                </div>
                <motion.div
                  className="mb-3"
                  variants={animateForgotPassword}
                  initial="initial"
                  animate={isForgotPwd ? "open" : "exit"}
                >
                  <Form.Control
                    type="email"
                    placeholder="   Email"
                    onChange={(e) => setEmailForgot(e.target.value)}
                  />
                  <button
                    type="submit"
                    className="btn btn-primary w-100 hover-bg-secondary"
                    onClick={handleForgotPwd}
                  >
                    Lấy lại mật khẩu
                  </button>
                </motion.div>
                <div className="mb-3">
                  <p className="d-flex justify-content-center">
                    <span>hoặc đăng nhập qua</span>
                  </p>
                </div>
                <div className="mb-3 d-flex justify-content-center gap-2 align-items-center">
                  <button
                    className="btn btn-facebook"
                    onClick={(e) => {
                      e.preventDefault();
                      window.open(
                        "http://localhost:8080/api/v1/auth/facebook",
                        "_self"
                      );
                    }}
                  >
                    <span className="">
                      <FaFacebookF />
                    </span>
                    <span> Facebook</span>
                  </button>
                  <button
                    type="submit"
                    className="btn btn-google"
                    onClick={(e) => {
                      e.preventDefault();

                      window.open(
                        "http://localhost:8080/api/v1/auth/google",
                        "_self"
                      );
                    }}
                  >
                    <span className="">
                      <FaGoogle />
                    </span>
                    <span> Google</span>
                  </button>
                  <button
                    type="submit"
                    className="btn btn-github"
                    onClick={(e) => {
                      e.preventDefault();

                      window.open(
                        "http://localhost:8080/api/v1/auth/github",
                        "_self"
                      );
                    }}
                  >
                    <span className="">
                      <FaGithub />
                    </span>
                    <span> Github</span>
                  </button>
                </div>
              </div>
            </Form>
          </div>
        </AnimationComp>
      </div>
    </div>
  );
}

const animateForgotPassword = {
  initial: { height: 0, background: "#fff", overflow: "hidden" },
  open: { height: "auto" },
  exit: { height: 0, overflow: "hidden" },
};
export default Login;
