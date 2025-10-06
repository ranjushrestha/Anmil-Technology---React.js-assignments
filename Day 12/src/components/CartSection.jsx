import React from "react";
import { useCards } from "../context/CardContext";
import Button from "./Button"; 
import "../index.css";

const CartSection = () => {
  const { state, dispatch } = useCards();

  if (state.cart.length === 0) {
    return null;
  }

  return (
    <div className="cart-section">
      <h2>Your Cart</h2>
      {state.cart.map((item) => (
        <div key={item.cartId} className="cart-item">
          <img src={item.image} alt={item.title} className="cart-item-image" />
          <span className="cart-item-title">{item.title}</span>
          <Button
            variant="secondary"
            onClick={() =>
              dispatch({ type: "REMOVE_FROM_CART", payload: item.cartId })
            }
          >
            Remove
          </Button>
        </div>
      ))}
    </div>
  );
};

export default CartSection;
