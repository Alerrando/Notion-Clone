import { BrowserRouter, Route, Routes } from "react-router-dom";
import { App } from "./App";
import { RouterRole } from "./context/types";
import { Login } from "./pages/Login";

export const routesRole: RouterRole[] = [
  {
    path: "/editor",
    role: "USER",
  },
  {
    path: "/",
    role: "USER",
  },
];

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<Login />} />
        <Route path="/" element={<Login />} />
        <Route path="/editor/:id" element={<App />} />
      </Routes>
    </BrowserRouter>
  );
}
