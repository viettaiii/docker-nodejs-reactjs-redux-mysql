import ListProduct from "./pages/product/ListProduct";
import Sidebar from "./components/SideBar";
import {
  Routes,
  Route,
  useLocation,
  Navigate,
  useNavigate,
} from "react-router-dom";
import NavBar from "./components/NavBar";
import { useDispatch, useSelector } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingOverlay from "react-loading-overlay";
import { useEffect, useState } from "react";
import {
  getProducts,
  resetQueryProduct,
} from "./features/product/productSlice";
import { getCategories } from "./features/category/categorySlice";
import { getProviders } from "./features/provider/providerSlice";
import { getColors } from "./features/color/colorSlice";
import { getUsers, resetQueryUser } from "./features/user/userSlice";
import ListCategory from "./pages/category/ListCategory";
import ListProvider from "./pages/provider/ListProvider";
import ListCustomer from "./pages/customer/ListCustomer";
import Login from "./pages/login/index";
import Dashboard from "./pages/dashboard";
import { loginAuth } from "./features/auth/authSlice";
import ListOrder from "./pages/order/ListOrder";

function App() {
  const { isSideBarOpen } = useSelector((store) => store.sideBar);
  const { isSpinner } = useSelector((store) => store.spinner);
  const { user } = useSelector((store) => store.auth);
  const [isAdmin, setIsAdmin] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    setIsAdmin(user?.role === "admin");
  }, [user?.role, isAdmin, dispatch]);
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);
  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);
  useEffect(() => {
    dispatch(getProviders());
  }, [dispatch]);
  useEffect(() => {
    dispatch(getColors());
  }, [dispatch]);
  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const location = useLocation();
  if (location.pathname !== "/admin/customers") {
    dispatch(resetQueryUser());
  }
  if (location.pathname !== "/admin/products") {
    dispatch(resetQueryProduct());
  }
  const variantsSideBar = {
    initial: {
      x: -200,
      opacity: 0.5,
      width: 0,
    },
    animate: { x: 0, opacity: 1, width: "auto" },
    exit: {
      x: -200,
      opacity: 0.5,
      width: 0,
    },
    transition: { duration: 4, ease: "ease-in-out" },
  };

  const ProtectedRoute = ({ isAdmin, children }) => {
    if (!isAdmin) {
      return <Navigate to="/admin/login" replace />;
    }

    return children;
  };

  return (
    <>
      <div className="App">
        <div className="main-content">
          <AnimatePresence>
            {isSideBarOpen && (
              <motion.div
                variants={variantsSideBar}
                initial="initial"
                animate="animate"
                exit="exit"
                transition="transition"
              >
                {isAdmin && <Sidebar />}
              </motion.div>
            )}
          </AnimatePresence>
          <div className="w-100">
            {isAdmin && <NavBar />}
            <Routes>
              <Route
                path="/"
                element={
                  <ProtectedRoute isAdmin={isAdmin}>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/products"
                element={
                  <ProtectedRoute isAdmin={isAdmin}>
                    <ListProduct />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/categories"
                element={
                  <ProtectedRoute isAdmin={isAdmin}>
                    <ListCategory />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/orders"
                element={
                  <ProtectedRoute isAdmin={isAdmin}>
                    <ListOrder />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/providers"
                element={
                  <ProtectedRoute isAdmin={isAdmin}>
                    <ListProvider />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/customers"
                element={
                  <ProtectedRoute isAdmin={isAdmin}>
                    <ListCustomer />
                  </ProtectedRoute>
                }
              />

              <Route path="/admin/login" element={<Login />} />
            </Routes>
          </div>
        </div>

        {/* Toast message */}
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </div>

      {/* Loading overlay */}
      {isSpinner && (
        <LoadingOverlay
          active={isSpinner}
          spinner
          text="Waiting for me..."
        ></LoadingOverlay>
      )}
    </>
  );
}

export default App;
