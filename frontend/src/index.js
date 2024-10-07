import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "react-placeholder/lib/reactPlaceholder.css";
import "./style.scss";
import { Provider } from "react-redux";
import store, { persistor } from "./store";
import { HelmetProvider } from "react-helmet-async";
import { PersistGate } from "redux-persist/integration/react";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <HelmetProvider>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </HelmetProvider>
  </Provider>
);

//
