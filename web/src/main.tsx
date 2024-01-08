import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Router } from "./routes.js";
import { UseNotionContext } from "./context/index.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <UseNotionContext>
      <QueryClientProvider client={queryClient}>
        <Router />
      </QueryClientProvider>
    </UseNotionContext>
  </React.StrictMode>,
);
