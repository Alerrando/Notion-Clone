import React from "react";
import ReactDOM from "react-dom/client";
import { Router } from "./routes.js";
import "./index.css";
import CreateContextProvider from "./context/index.js";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <CreateContextProvider>
      <Router />
    </CreateContextProvider>
  </React.StrictMode>,
);
