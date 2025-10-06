import React from "react";
import ReactDOM from "react-dom";
import "./Modal.css"; 

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        {children}
        <button className="modal-close" onClick={onClose}>Close</button>
      </div>
    </div>,
       document.getElementById('modal-root') 
  );
};

export default Modal;
