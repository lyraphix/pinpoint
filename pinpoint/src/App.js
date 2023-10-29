import React, { useState } from 'react';
import mapboxgl from 'mapbox-gl'; 
import Tabs from './components/Tabs';
import Map from './components/Map';
import Modal from './components/Modal';
import PinDetails from './components/PinDetails';
import EventList from './EventList';
import { useAuth0 } from '@auth0/auth0-react';
import LoginPage from './components/Login/Login';
import ImageUploader from './ImageUploader';
import LogoutButton from './components/LogoutButton';

mapboxgl.accessToken = 'pk.eyJ1IjoibHlyYXBoaXgiLCJhIjoiY2xvYWZvM2lmMGk4YzJqcWMwODdnN3J5bCJ9.bEdAGzoZaFPApU_TPPMKCQ';

export default function App() {
  const [lng, setLng] = useState(-87.57);
  const [lat, setLat] = useState(41.91);
  const [zoom, setZoom] = useState(8.6);
  const [tabsStatus, setTabsStatus] = useState({
    'Events': true,
    'Locations': true,
    'Details': true
  });
  const [isModalOpen, setModalOpen] = useState(false);
  const dummyPinsData = [
    {
      image: 'https://www.sonomacounty.com/sites/default/files/styles/listing_event_slideshow/public/2020-06/IMG_5545.jpg?itok=5GJ_q5_y',
      title: 'Fireworks',
      likes: 12,
      class: 'EventImage',
      id: 'eventimage1'
    },
    // ... other pins
  ];

  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

  if (!isAuthenticated) {
    return <LoginPage/>
  }

  const handleMapMove = (newLng, newLat, newZoom) => {
    setLng(newLng);
    setLat(newLat);
    setZoom(newZoom);
  };

  const toggleTab = (tab) => {
    setTabsStatus(prev => ({
      ...prev,
      [tab]: !prev[tab]
    }));
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
      <Map 
        initialLng={lng} 
        initialLat={lat} 
        initialZoom={zoom} 
        onMapMove={handleMapMove} 
        tabsStatus={tabsStatus}
      />
      <div className="button-container">
        <div className="tabs-container">
          <Tabs tabsStatus={tabsStatus} onTabChange={toggleTab} /> 
        </div>
        <LogoutButton className="logout-button"/>    
      </div>
      
      <div>
        {eventsData.map((list, index) => (
          <EventList onEventClick={() => setModalOpen(true)} key={index} tagName={list.tagName} events={list.events} />
        ))}
      </div>
      <ImageUploader />
    </div>
  );
}