import React, { useState } from "react";
import { useCards } from "../context/CardContext";
import Button from "./Button"; // import your reusable Button
import "../index.css";

const Navbar = () => {
  const { state, dispatch } = useCards();
  const [showCart, setShowCart] = useState(false);

  return (
    <nav className="navbar">
      <div className="nav-left">My Shop</div>

      <div className="nav-right">
        <button className="cart-btn" onClick={() => setShowCart(!showCart)}>
          🛒  {state.cart.length}
        </button>

        {showCart && (
          <div className="cart-dropdown">
            {state.cart.length === 0 ? (
              <p>Your cart is empty</p>
            ) : (
              state.cart.map((item) => (
                <div key={item.cartId} className="cart-item">
                  <span>{item.title}</span >
    
                  <Button 
                    variant="remove"
                    onClick={() =>
                      dispatch({ type: "REMOVE_FROM_CART", payload: item.cartId })
                    }
                  >
                    Remove
                 </Button>
                 </div>
              ))
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
