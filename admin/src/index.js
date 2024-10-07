import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./style.scss";
import { Provider } from "react-redux";
import { persistor, store } from "./store";
import { PersistGate } from "redux-persist/integration/react";
import { AnimatePresence } from "framer-motion";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AnimatePresence>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </AnimatePresence>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

//
