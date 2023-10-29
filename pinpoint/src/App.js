import React, { useState, useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import Map from './components/Map';
import Modal from './components/Modal';
import PinDetails from './components/PinDetails';
import ActionButton from './components/ActionButton.js';
import NewPostModal from './components/NewPostModal/NewPostModal';

import TabsButton from './components/TabsButton';
/* No longer used import
import ImageUploader from './ImageUploader';
*/
import { useAuth0 } from '@auth0/auth0-react';
import LoginPage from './components/Login/Login';
import LocateUserButton from './components/LocateUserButton';
import LogoutButton from './components/LogoutButton';
import Tabs from "./components/Tabs"
import EventList from "./EventList.js"
import ScrollButton from './components/ScrollButton';


mapboxgl.accessToken = 'pk.eyJ1IjoibHlyYXBoaXgiLCJhIjoiY2xvYWZvM2lmMGk4YzJqcWMwODdnN3J5bCJ9.bEdAGzoZaFPApU_TPPMKCQ';

export default function App() {
  const [lng, setLng] = useState(-86.8038);
  const [lat, setLat] = useState(36.1430);
  const [zoom, setZoom] = useState(15.11);
  const [showButton, setShowButton] = useState(true);

  const [tabsStatus, setTabsStatus] = useState({
    'Campus Alerts': true,
    'Campus Issues': true,
    'Campus Events': true,
    'Help Needed': true,
    'Lost & Found': true
  });
  const [isModalOpen, setModalOpen] = useState(false);
  const [isNewPostModalOpen, setNewPostModalOpen] = useState(false);
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
  const geolocateControlRef = useRef(null); // Add this ref
  const [mapFunctions, setMapFunctions] = useState({});

  const handleScroll = () => {
    // This will check if the user has scrolled more than 50 pixels
    if (window.scrollY > 50) {
      setShowButton(false);
    }
  };
  
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
  
    // Cleanup: remove the event listener when the component unmounts
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  if (!isAuthenticated) {
    return <LoginPage/>
  }


  const locateUser = () => {
      console.log('Locate user button clicked.');
      if (mapFunctions.locateUser) {
          mapFunctions.locateUser();
      } else {
          console.log('geolocate function is not available.');
      }
  };

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
    {
      tagName: 'Lost & Found',
      events: [
        { title: 'Found AirPods in FGH atrium', upvotes: 6243 },
        { title: 'Found a "Protein Zone" sign (Rand)', upvotes: 5 },


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
          setLat={setLat}
          setLng={setLng}
          setMapFunctions={setMapFunctions} 
      />
        {showButton && <ScrollButton />}
        <div className="button-container">
          <div className="tabs-container">
            <TabsButton onTabChange={handleTabChange} />
            <ActionButton onClick={() => setNewPostModalOpen(true)} />
          </div>
        </div>
      </div>

      {isNewPostModalOpen && <NewPostModal onClose={() => setNewPostModalOpen(false)} onSubmit={handleNewPost} />}
      <LocateUserButton onClick={locateUser} />

      <div>
        {eventsData.map((list, index) => (
          <EventList onEventClick={() => setModalOpen(true)} key={index} tagName={list.tagName} events={list.events} />
        ))}
      </div>
      <LogoutButton className="logout-button"/>
    </div>
  );
}