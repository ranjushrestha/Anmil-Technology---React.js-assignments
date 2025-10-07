import React from "react";
import { Link, useNavigate } from "react-router-dom";


const Navbar = () => {
  const navigate = useNavigate();

  const handleSignOut = () => {
    navigate("/"); // go back to login page
  };

  return (
    <nav className="navbar">
      <div className="nav-links">
        <Link to="/home">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
      </div>
      <button className="signout-btn" onClick={handleSignOut}>
        Sign Out
      </button>
    </nav>
  );
};

export default Navbar;
