import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import "bootstrap/dist/css/bootstrap.min.css";
import './css/regionFilter.css';
import './css/letterFilter.css';
import './css/navBar.css';
import './css/countryCard.css';
import './css/singleCountry.css'

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
