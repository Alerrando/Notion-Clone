import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Router } from "./routes.js";
import { StoreProvider } from "./context/index.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <StoreProvider>
      <Router />
    </StoreProvider>
  </React.StrictMode>,
);
