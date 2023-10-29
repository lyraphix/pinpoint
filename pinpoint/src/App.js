import React, { useState } from 'react';
import mapboxgl from 'mapbox-gl';
import Map from './components/Map';
import Modal from './components/Modal';
import PinDetails from './components/PinDetails';
import ActionButton from './components/ActionButton.js';
import NewPostModal from './components/NewPostModal/NewPostModel';
import TabsButton from './components/TabsButton';
import ImageUploader from './ImageUploader';
import { useAuth0 } from '@auth0/auth0-react';
import LoginPage from './components/Login/Login';

mapboxgl.accessToken = 'pk.eyJ1IjoibHlyYXBoaXgiLCJhIjoiY2xvYWZvM2lmMGk4YzJqcWMwODdnN3J5bCJ9.bEdAGzoZaFPApU_TPPMKCQ';

export default function App() {
  const [lng, setLng] = useState(-86.8038);
  const [lat, setLat] = useState(36.1430);
  const [zoom, setZoom] = useState(15.11);
  const [tabsStatus, setTabsStatus] = useState({
    'Events': true,
    'Locations': true,
    'Details': true
  });
  const [isModalOpen, setModalOpen] = useState(false);
  const [isNewPostModalOpen, setNewPostModalOpen] = useState(false);
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

  if (!isAuthenticated) {
    return <LoginPage/>
  }
  const dummyPinsData = [
    {
      image: 'https://www.sonomacounty.com/sites/default/files/styles/listing_event_slideshow/public/2020-06/IMG_5545.jpg?itok=5GJ_q5_y',
      title: 'Fireworks',
      likes: 12,
      class: 'EventImage',
      id: 'eventimage1'
    }
    // ... other pins
  ];

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
    const userId = "currentUserId"; 
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
    console.log(postObject);
    setNewPostModalOpen(false);
  };

  const eventsData = [
    {
      tagName: 'Campus Alerts',
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
      tagName: 'Campus Issues',
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
    {
      tagName: 'Campus Events',
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
      tagName: 'Help Needed',
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
      <div className="sidebar">
        Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
      </div>
      <div className="mapContainer">
        <Map 
          initialLng={lng}
          initialLat={lat}
          initialZoom={zoom}
          onMapMove={handleMapMove}
          tabsStatus={tabsStatus}
        />
        <TabsButton onTabChange={handleTabChange} />
        <ActionButton onClick={() => setNewPostModalOpen(true)} />
      </div>

      {isNewPostModalOpen && <NewPostModal onClose={() => setNewPostModalOpen(false)} onSubmit={handleNewPost} />}

      <ImageUploader />
    </div>
  );
}