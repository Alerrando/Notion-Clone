import React from "react";
import ReactDOM from "react-dom/client";
import { Router } from "./routes.js";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>,
);
