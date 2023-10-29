import React from 'react';
import '../style/EventModal.css';

const EventModal = ({ isOpen, event, closeModal }) => {
    if (!isOpen || !event) return null;

    return (
        <div className="modalOverlay">
            <div className="modalContent">
                <button className="closeButton" onClick={closeModal}>×</button>
                <img src={event.imageSrc} alt={event.title} />
                <h2>{event.title}</h2>
                <p>{event.description}</p>
                <div className="eventDetails">
                    <span>{event.duration}</span>
                    <span>{event.type}</span>
                    <span>👍 {event.upvotes}</span>
                </div>
            </div>
        </div>
    );
};

export default EventModal;
