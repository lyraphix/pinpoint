import React from 'react';
import "./ScrollButton.css";

function ScrollButton() {
  const handleScroll = () => {
    // This will scroll the page down by 500px. You can adjust this value.
    window.scrollBy(0, 500);
  };

  return <button className="scrollButton" onClick={handleScroll}>&darr; &darr; &darr;</button>;
}

export default ScrollButton;