import React, { useState } from 'react';
import mapboxgl from 'mapbox-gl'; 
import Tabs from './components/Tabs';
import Map from './components/Map';
import Modal from './components/Modal';
import PinDetails from './components/PinDetails';
import EventList from './EventList';
import ActionButton from './components/ActionButton.js';
import NewPostModal from './components/NewPostModal/NewPostModel';
import TabsButton from './components/TabsButton';

mapboxgl.accessToken = 'pk.eyJ1IjoibHlyYXBoaXgiLCJhIjoiY2xvYWZvM2lmMGk4YzJqcWMwODdnN3J5bCJ9.bEdAGzoZaFPApU_TPPMKCQ';

export default function App() {
  const [lng, setLng] = useState(-87.57);
  const [lat, setLat] = useState(41.91);
  const [zoom, setZoom] = useState(8.6);
  const [showTabs, setShowTabs] = useState(false);
  const [activeTab, setActiveTab] = useState('Random');

  const [tabsStatus, setTabsStatus] = useState({
    'Events': true,
    'Locations': true,
    'Details': true
  });
  const [isModalOpen, setModalOpen] = useState(false);
  const dummyPinsData = [
    {
      image: 'url_of_first_image',
      title: 'Title of First Pin',
      likes: 123
    },
    // ... other pins
  ];

  const [isNewPostModalOpen, setNewPostModalOpen] = useState(false);

  const handleMapMove = (newLng, newLat, newZoom) => {
    setLng(newLng);
    setLat(newLat);
    setZoom(newZoom);
  };

  const handleTabChange = (tab) => {
    setTabsStatus(prevStatus => ({
      ...prevStatus,
      [tab]: !prevStatus[tab]
    }));
  };

  
  const handleNewPost = (postDetails) => {
    const userId = "currentUserId"; // Fetch from app's session or state
    const location = navigator.geolocation.getCurrentPosition(position => ({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
    }));
    const currentTime = new Date();

    const postObject = {
        userId,
        ...postDetails,
        location,
        time: currentTime,
        type: "Point",
        likes: 0,
        popularity: 50
    };

    // Add logic to save postObject to your backend or state
    // For now, we'll console.log it
    console.log(postObject);

    setNewPostModalOpen(false); // Close the modal after submission
};


  const toggleTab = (tab) => {
    setTabsStatus(prev => ({
      ...prev,
      [tab]: !prev[tab]
    }));
  };


  const eventsData = [
    {
      tagName: 'Tag Name',
      events: [
        { title: 'Event Titleeeeeeeeee', upvotes: 1 },
        { title: 'Event Title', upvotes: 1  },
        { title: 'Event Tierrrrrrrtle', upvotes: 1000  }, 
        { title: 'Event Title', upvotes: 100  },
        { title: 'Event Title', upvotes: 1  },
        { title: 'Event Title', upvotes: 1  },
        { title: 'Event Title', upvotes: 1  },
        { title: 'Event Title', upvotes: 1  },
        { title: 'Event Title', upvotes: 1  }
      ]
    },
    {
      tagName: 'Tag Name',
      events: [
        { title: 'Event Title', upvotes: 1 },
        { title: 'Event Title', upvotes: 1  },
        { title: 'Event Title', upvotes: 1  }, 
        { title: 'Event Title', upvotes: 1  },
        { title: 'Event Title', upvotes: 1  },
        { title: 'Event Title', upvotes: 1  },
        { title: 'Event Title', upvotes: 1  },
        { title: 'Event Title', upvotes: 1  },
        { title: 'Event Title', upvotes: 1  }
      ]
    },
    
  ];
  return (
    <div className="app-container">
      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
        <div className="pins-container">
          {dummyPinsData.map((pin, index) => (
            <PinDetails key={index} {...pin} />
          ))}
        </div>
      </Modal>
      {/* <div className="sidebar">
        Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
      </div> */}
      <div className="mapContainer">
        <Map 
          initialLng={lng} 
          initialLat={lat} 
          initialZoom={zoom} 
          onMapMove={handleMapMove} 
          tabsStatus={tabsStatus}  // Passing the updated state to the Map component
        />
        <TabsButton onTabChange={handleTabChange} />

        <ActionButton onClick={() => setNewPostModalOpen(true)} />
      </div>
      {/* <Tabs tabsStatus={tabsStatus} onTabChange={toggleTab} /> */}
      {/* <div>
        {eventsData.map((list, index) => (
          <EventList onEventClick={() => setModalOpen(true)} key={index} tagName={list.tagName} events={list.events} />
        ))}
      </div> */}
      {isNewPostModalOpen && <NewPostModal onClose={() => setNewPostModalOpen(false)} onSubmit={handleNewPost} />}
    </div>
  );
}