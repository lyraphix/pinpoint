import React from 'react';
import './EventList.css';

function EventList({ tagName, events, onEventClick }) {
    
  // Function to handle the click on an event
  const handleEventClick = (eventTitle) => {
    onEventClick();  // This will open the modal
  };

  return (
    <div className="eventList">
      <div className="tag">
        {tagName}
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
                {event.upvotes}
                </div>
            </button>
            ))}
      </div>
    </div>
  );
}

export default EventList;