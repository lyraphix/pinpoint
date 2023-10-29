import React from 'react';
import './Modal.css'; // Ensure this is the correct path to your CSS file

const WelcomeModal = ({ onClose }) => {
  return (
    <div className="modalOverlay">
      <div className="modalContent">
        <button className="modalCloseButton" onClick={onClose}>&times;</button>
        <h2>Welcome to Mappy!</h2>
        <img src="path_to_your_image.jpg" alt="Welcome to Mappy" className="modalImage" />
        <h3>Start clicking around to explore what other users have added. Don't forget to post your picture and join the community!</h3>
      </div>
    </div>
  );
}

export default WelcomeModal;
