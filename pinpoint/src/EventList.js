import React from 'react';
import './EventList.css';

function EventList({ tagName, events }) {
    
  // Function to handle the click on an event
  const handleEventClick = (eventTitle) => {
    alert(`You clicked on: ${eventTitle}`);
  };

  return (
    <div className="eventList">
      <div className="tag">
        {tagName}
        <button>+</button>
      </div>
      <div className="eventsScrollable">
        {events.map((event, index) => (
            <button 
                key={index}
                className="eventCard" 
                onClick={() => handleEventClick(event.title)}
            >
                <div className="imagePlaceholder">🖼️</div>
                <p>{event.title}</p>
                <div className="upvoteCount">
                👍 {event.upvotes}
                </div>
            </button>
            ))}
      </div>
    </div>
  );
}

export default EventList;