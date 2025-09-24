import React from "react";
import "../index.css";
import PropTypes from "prop-types";

const Button = ({ onClick, children, variant }) => {
  return (
    <button className={`btn ${variant || ""}`} onClick={onClick}>
      {children}
    </button>
  );
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  variant: PropTypes.string, 
};

export default Button;
