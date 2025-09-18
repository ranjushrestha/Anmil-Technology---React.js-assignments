import React from "react";

const InputComponent = ({ label, placeholder, id, ...props }) => {
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className="input-container" style={{ marginBottom: "1rem" }}>
      {label && <label htmlFor={inputId} className="input-label">{label}</label>}
      <input id={inputId} placeholder={placeholder} className="input" {...props} />
    </div>
  );
};

export default InputComponent;
