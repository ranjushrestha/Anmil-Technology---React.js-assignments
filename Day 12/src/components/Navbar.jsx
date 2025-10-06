import React, { useState } from "react";
import { useCards } from "../context/CardContext";
import "../index.css";

const Navbar = () => {
  const { state } = useCards();

  return (
    <nav className="navbar">
      <div className="nav-left">My Shop</div>

      <div className="nav-right">
        <button className="cart-btn">
          🛒 {state.cart.length}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
