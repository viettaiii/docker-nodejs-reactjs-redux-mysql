import { Outlet } from "react-router-dom";
import { clientRoutes } from "./routes";
import { lazy } from "react";

const Products = lazy(() => import("../pages/product"));
const CheckOut = lazy(() => import("../pages/checkout"));
const OrderDetail = lazy(() => import("../pages/auth/account/orderDetail"));
const ThankYouOrder = lazy(() => import("../pages/checkout/thankYou"));
const Address = lazy(() => import("../pages/auth/account/address"));
const Account = lazy(() => import("../pages/auth/account"));
const PaymentSuccess = lazy(() => import("../pages/checkout/payralSuccess"));
const Orders = lazy(() => import("../pages/auth/account/orders"));
const Cart = lazy(() => import("../pages/cart"));
const ProductSearch = lazy(() => import("../pages/product/productSearch"));
const ChangePassword = lazy(() =>
  import("../pages/auth/account/changePassword")
);
const AuthRequired = lazy(() => import("../pages/AuthRequired"));
const ResetPassword = lazy(() => import("../pages/auth/resetPassword"));
const VerifyEmail = lazy(() => import("../pages/auth/verifyEmail"));
const Home = lazy(() => import("../pages/home"));
const Login = lazy(() => import("../pages/auth/login"));
const Register = lazy(() => import("../pages/auth/register"));
const NotFound = lazy(() => import("../pages/notFound"));
const ProductDetail = lazy(() => import("../pages/product/productDetail"));
const LoginSuccess = lazy(() => import("../pages/auth/login/loginSuccess"));
const ProductLove = lazy(() => import("../pages/product/productLove"));

const clientPages = [
  { com: <Home />, path: clientRoutes.home },
  {
    com: <Outlet />,
    path: clientRoutes.account.main,
    children: [
      { com: <Account />, path: "", protected: true },
      {
        com: <Outlet />,
        path: "don-hang",
        protected: true,
        children: [
          { com: <Orders />, path: "", protected: true },
          { com: <OrderDetail />, path: ":id", protected: true },
        ],
      },

      { com: <VerifyEmail />, path: "xac-minh-tai-khoan" },
      { com: <Address />, path: "dia-chi", protected: true },
      { com: <ResetPassword />, path: "dat-lai-mat-khau" },
      { com: <Login />, path: "dang-nhap" },
      { com: <Register />, path: "dang-ky" },
      { com: <ChangePassword />, path: "thay-doi-mat-khau", protected: true },
      { com: <AuthRequired />, path: "yeu-cau-dang-nhap" },
    ],
  },
  {
    com: <Outlet />,
    path: clientRoutes.product.main,
    children: [
      { com: <Products />, path: ":name" },
      {
        com: <ProductDetail />,
        path: "chi-tiet/:slug",
      },
      {
        com: <ProductLove />,
        path: "yeu-thich",
      },
      {
        com: <ProductSearch />,
        path: "tim-kiem",
      },
    ],
  },

  { com: <Cart />, path: clientRoutes.cart },
  {
    com: <Outlet />,
    path: clientRoutes.checkout,
    only: true,
    children: [
      { com: <CheckOut />, path: "", protected: true },
      { com: <ThankYouOrder />, path: "cam-on/:id", protected: true },
      { com: <PaymentSuccess />, path: "thanh-cong", protected: true },
    ],
  },
  { com: <LoginSuccess />, path: "/login/success" },
  { com: <NotFound />, path: "*" },
];

export { clientRoutes, clientPages };
