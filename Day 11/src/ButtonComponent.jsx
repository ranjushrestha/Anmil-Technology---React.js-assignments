import React from "react";
import PropTypes from "prop-types";

const ButtonComponent = ({ buttonText, variant = "primary" }) => {
  return <button className={`btn ${variant}`}>{buttonText}</button>;
};

ButtonComponent.propTypes = {
  buttonText: PropTypes.string.isRequired,
  variant: PropTypes.oneOf(["primary", "secondary"]),
};


export default ButtonComponent;
