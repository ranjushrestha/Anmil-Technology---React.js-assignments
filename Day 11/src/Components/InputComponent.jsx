import React from "react";
import PropTypes from "prop-types";

const InputComponent = ({ label, value, placeholder, onChange }) => {
  return (
    <div className="input-container">
      {label && <label className="input-label">{label}</label>}
      <input className="input" value={value} placeholder={placeholder} onChange={onChange} />
    </div>
  );
};

InputComponent.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
};

export default InputComponent;
