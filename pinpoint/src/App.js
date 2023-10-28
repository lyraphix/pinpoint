import React, { useState } from 'react';
import Tabs from './components/Tabs';
import Map from './components/Map';

export default function App() {
  const [lng, setLng] = useState(-87.57);
  const [lat, setLat] = useState(41.91);
  const [zoom, setZoom] = useState(8.6);
  const [tabsStatus, setTabsStatus] = useState({
    'Events': true,
    'Locations': true,
    'Details': true
  });

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

  return (
    <div className="app-container">
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
    </div>
  );
}
