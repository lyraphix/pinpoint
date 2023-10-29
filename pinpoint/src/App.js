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
        { title: 'Fire on FGH 3rd floor', upvotes: 12 },
        { title: 'Flood at Moore', upvotes: 18  },
        { title: 'Suspected bank robber is...', upvotes: 1000  }, 

      ]
    },
    {
      tagName: 'Campus Issues',
      events: [
        { title: 'Kirkland construction', upvotes: 1562 },
        { title: 'Construction near Highland', upvotes: 21  },
        { title: 'First floor FGH flood', upvotes: 25  }, 
        { title: 'Wet floor near 2301', upvotes: 89  },
        { title: 'All 2nd floor Furman classro...', upvotes: 5  },
        { title: 'EBI floor 2 blasting Zwomp Z...', upvotes: 9  },
        { title: 'Rand is out of all protein', upvotes: 6316  },
        { title: 'Rand is closed 2 hrs early', upvotes: 75  },

      ]
    },
    {
      tagName: 'Campus Events',
      events: [
        { title: 'Math Club meets 7 pm Thurs', upvotes: 23 },
        { title: 'Farmer\'s Market outside R...', upvotes: 8  },
        { title: 'Soccer on Alumni', upvotes: 752  }, 
        { title: 'Cornhole tournament 3pm', upvotes: 100  },
        { title: 'Food trucks on Alumni Lawn', upvotes: 828  },
        { title: 'Flulapalooza 8am-6pm today!', upvotes: 14  },
        { title: 'Free Chik-Fil-A', upvotes: 582  },
        { title: 'Soccer game vs TN today', upvotes: 711  },
        { title: 'Climbing team tryouts today 5pm', upvotes: 4  }
      ]
    },
    {
      tagName: 'Help Needed',
      events: [
        { title: '(on crutches) Sax carrying', upvotes: 2 },
        { title: 'Left laptop in Central 6 room', upvotes: 5 },

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
      <Tabs tabsStatus={tabsStatus} onTabChange={toggleTab} />
      <div>
        {eventsData.map((list, index) => (
          <EventList onEventClick={() => setModalOpen(true)} key={index} tagName={list.tagName} events={list.events} />
        ))}
      </div>
      <ImageUploader />
    </div>
  );
}