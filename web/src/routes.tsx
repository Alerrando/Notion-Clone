import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "./pages/Login";
import { App } from "./App";

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/editor" element={<App />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}
