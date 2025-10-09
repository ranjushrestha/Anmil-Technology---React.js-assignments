import  { useState } from "react";
import { Navigate } from "react-router"; 

const Navbar = () => {
  const [redirect, setRedirect] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setRedirect(true);
  };

  //  redirect without reloading
  if (redirect) {
    return <Navigate to="/login" replace />;
  }

  return (
    <nav className="navbar">
      <div className="nav-links">
        <a href="/">Home</a>
        <a href="/about">About</a>
        <a href="/contact">Contact</a>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;
