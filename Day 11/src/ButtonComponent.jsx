import React from "react";

const ButtonComponent = ({ buttonText, variant = "primary", type = "button", ...props }) => {
  return (
    <button type={type} className={`btn ${variant}`} {...props}>
      {buttonText}
    </button>
  );
};

export default ButtonComponent;
