// Modal.js
import React from 'react';
import './Modal.css';

function Modal({ isOpen, onClose, children }) {
    if (!isOpen) return null;
  
    // This function stops the click event from propagating up to the modalOverlay
    const handleContentClick = (e) => {
      e.stopPropagation();
    };
  
    return (
      <div className="modalOverlay" onClick={onClose}>
        <div className="modalContent" onClick={handleContentClick}>
          <button className="modalCloseButton" onClick={onClose}>X</button>
          {children}
        </div>
      </div>
    );
  }
  

export default Modal;
