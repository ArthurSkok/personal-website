import React from "react";
import "./Popup.css";

const Popup = ({ show, onClose, input }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="popup">
      <span className="close" onClick={onClose}>
        &times;
      </span>
      <p>{input}</p>
    </div>
  );
};

export default Popup;
