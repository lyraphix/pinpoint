import React , { useState } from 'react';
import '../style/EventList.css';
import LeftArrow from './LeftArrow';
import RightArrow from './RightArrow';
import EventModal from './EventModal';


function EventList({ tagName, events }) {
  // states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(null);
  const scrollableRef = React.useRef(null);

  // Scrolling
  const handleScrollLeft = () => {
    const scrollValue = -300;  
    scrollableRef.current.scrollLeft += scrollValue;
  }

  const handleScrollRight = () => {
    const scrollValue = 300;  
    scrollableRef.current.scrollLeft += scrollValue;
  }

  // Function to handle the click on an event
  const handleEventClick = (event) => {
    setCurrentEvent(event);
    setIsModalOpen(true);
  };

  // Function to close modal
  function closeModal() {
    setIsModalOpen(false);
    setCurrentEvent(null);
  }

  return (    
  <div className="eventListContainer">
  <EventModal isOpen={isModalOpen} event={currentEvent} closeModal={closeModal} />
  <div className="eventList">
      <div className="tag">
          {tagName}
          <button>+</button>
      </div>
      <div className="scrollableWrapper">
          <LeftArrow scrollLeft={handleScrollLeft} />
          <div className="eventsScrollable">
              {events.map((event, index) => (
                  <button 
                      key={index}
                      className="eventCard" 
                      onClick={() => handleEventClick(event)}
                  >
                      <div className="imagePlaceholder">🖼️</div>
                      <p>{event.title}</p>
                      <div className="upvoteCount">
                          👍 {event.upvotes}
                      </div>
                  </button>
              ))}
          </div>
          <RightArrow scrollRight={handleScrollRight} />
      </div>
  </div>
</div>
);
}

export default EventList;