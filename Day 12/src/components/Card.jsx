import React from "react";
import Button from "./Button";
import { useCards } from "../context/CardContext";
import "../index.css";
import PropTypes from "prop-types";

const Card = ({ product }) => {
  const { dispatch } = useCards();

  const handleAdd = () => {
    dispatch({ type: "ADD_TO_CART", payload: product });
  };

  return (
    <div className="card">
      <img src={product.image} alt={product.title} className="card-img"/>
      <h3 className="card-title">{product.title}</h3>
      <p className="card-price">Price: ${product.price}</p>
      <p className="card-rating">Rating: {product.rating} ⭐</p>
      <Button variant= "primary" onClick={handleAdd}>Add to Cart</Button>
    </div>
  );
};

Card.propTypes = {
  product: PropTypes.shape({
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    rating: PropTypes.number,
  }).isRequired,
};

export default Card;
