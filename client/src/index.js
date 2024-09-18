import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";

import "react-toastify/dist/ReactToastify.css";
import "rsuite/dist/rsuite.min.css";
import 'react-quill/dist/quill.snow.css';
import './assets/css/Snow.css'
import "./index.css";

import App from "./App";
import Store from "./context/store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={Store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>
);
