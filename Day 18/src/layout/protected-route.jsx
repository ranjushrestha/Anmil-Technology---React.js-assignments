
import { Navigate, Outlet } from "react-router";
import Navbar from "../pages/Navbar";

const ProtectedRoute = () => {
  const token = false; // localStorage.getItem('token')

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
