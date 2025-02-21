import React from "react";
import "./Popup.css";

const Popup = ({ show, onClose, input }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="Popup">
      <span className="Close" onClick={onClose}>
        &times;
      </span>
      <p>{input}</p>
    </div>
  );
};

export default Popup;
