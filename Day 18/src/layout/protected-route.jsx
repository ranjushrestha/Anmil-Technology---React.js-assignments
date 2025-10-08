import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Navbar from "../pages/Navbar";

const ProtectedRoute = () => {
  const token = localStorage.getItem("token"); 
  if (!token) {
    return <Navigate to="/login" replace />; 
  }

  return (
    <>
      <Navbar />
      <Outlet /> 
    </>
  );
};

export default ProtectedRoute;
