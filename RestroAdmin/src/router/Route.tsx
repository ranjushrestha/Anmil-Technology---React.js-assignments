
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Analytics from "../pages/Analytics";
import Login from "../pages/Login";
import Customers from "../pages/Customers";
import Menu from "../pages/Menu";
import Order from "../pages/Order";
import Settings from "../pages/Settings";
import Dashboard from "../pages/Dashboard";
import AdminLayout from "../layouts/AdminLayout";
import NotFoundPage from "../pages/NotFoundPage";
import ProtectedRoute from "./ProtectedRoute";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
       
        <Route path="/login" element={<Login />} />

       
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="customers" element={<Customers />} />
            <Route path="menu" element={<Menu />} />
            <Route path="order" element={<Order />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Route>

       
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
