import { BrowserRouter, Route, Routes } from "react-router-dom";
import { App } from "./App";
import { RouterRole } from "./context/typesContext";
import { Login } from "./pages/Login";

export const routesRole: RouterRole[] = [
  {
    path: "/editor",
    role: "USER",
  },
  {
    path: "/",
    role: "",
  },
];

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/editor/:id" element={<App />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}
