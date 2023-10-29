import React from 'react';

function PinDetails({ image, title, likes }) {
  return (
    <div className="pin-details">
      <img src={image} alt={title} className="pin-image" />
      <div className="pin-info">
        <h3>{title}</h3>
        <h3><span role="img" aria-label="heart">❤️</span> {likes} likes</h3>
      </div>
    </div>
  );
}

export default PinDetails;
