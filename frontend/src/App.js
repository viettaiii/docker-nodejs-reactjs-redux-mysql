import { BrowserRouter, Route, Routes } from "react-router-dom";
import { clientPages } from "./routes";
import Layout from "./layout";
import { Suspense } from "react";
import { ToastContainer } from "react-toastify";
import { AnimatePresence } from "framer-motion";
import "react-toastify/dist/ReactToastify.css";
import ButtonScrollTop from "./components/Button/ButtonScrollTop";
import ModalCartView from "./components/Modal/ModalCartView";
import ProtectedRoute from "./components/ProtectedRoute";
import LoadingComp from "./components/Loading/LoadingComp";

function App() {
  const createChildrenRoute = (route, Comp) => {
    return (
      <Route exact element={Comp} path={route.path}>
        {route?.children.map((childRoute, childIdx) => {
          let element = childRoute.com;
          if (childRoute.children)
            return createChildrenRoute(childRoute, element);
          if (childRoute.protected) {
            element = <ProtectedRoute>{childRoute.com}</ProtectedRoute>;
          }
          return (
            <Route key={childIdx} element={element} path={childRoute.path} />
          );
        })}
      </Route>
    );
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Suspense fallback={<div></div>}>
          <Routes>
            {clientPages.map((route, idx) => {
              let Comp = <AnimatePresence>{route.com}</AnimatePresence>;
              if (route.protected) {
                Comp = <ProtectedRoute>{Comp}</ProtectedRoute>;
              }
              if (!route.only) Comp = <Layout key={idx}>{Comp}</Layout>;
              if (route.children) return createChildrenRoute(route, Comp);
              return (
                <Route exact element={Comp} path={route.path} key={idx + 100} />
              );
            })}
          </Routes>
        </Suspense>
        <LoadingComp />
        <ToastContainer position="top-center" />
        <ModalCartView />
        <ButtonScrollTop />
      </BrowserRouter>
    </div>
  );
}

// chua login => Xem duoc client
// login - admin => Xem duoc client , admin
// login - client => Xem duoc client
export default App;
