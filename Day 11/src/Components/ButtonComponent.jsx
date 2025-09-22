import React from "react";
import PropTypes from "prop-types";

const ButtonComponent = ({ buttonText, variant = "", onClick }) => {
  return (
    <button className={`btn ${variant}`} onClick={onClick}>
      {buttonText}
    </button>
  );
};

ButtonComponent.propTypes = {
  buttonText: PropTypes.string.isRequired,
  variant: PropTypes.oneOf(["primary", "secondary"]),
  onClick: PropTypes.func, 
};

export default ButtonComponent;
