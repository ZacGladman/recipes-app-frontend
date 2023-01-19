import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

export const baseURL =
  process.env.NODE_ENV === "production"
    ? "https://chefbookdb.onrender.com"
    : "http://localhost:4000";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
