import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import './map.css';
import 'mapbox-gl/dist/mapbox-gl.css';

const MAPBOX_TOKEN = 'pk.eyJ1IjoibHlyYXBoaXgiLCJhIjoiY2xvYWZvM2lmMGk4YzJqcWMwODdnN3J5bCJ9.bEdAGzoZaFPApU_TPPMKCQ';
const MAPBOX_STYLE = 'mapbox://styles/lyraphix/cloago2u400rc01ozd1sh3x03';

mapboxgl.accessToken = MAPBOX_TOKEN;

const Map = ({ initialLng, initialLat, initialZoom, onMapMove, tabsStatus, setMapFunctions }) => {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [geolocateControl, setGeolocateControl] = useState(null);
  
    useEffect(() => {
        if (!map.current && mapContainer.current) {
          map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: MAPBOX_STYLE,
            center: [initialLng, initialLat],
            zoom: initialZoom,
          });
    
          // Attach event listeners to the map
          map.current.on('move', handleMapMove);
    
          // The following line ensures that the geolocate control is triggered once the map is loaded
          map.current.on('load', handleMapLoad);
        }
    }, []);

    const handleMapMove = () => {
      if (map.current) {
        const { lng, lat } = map.current.getCenter();
        const zoom = map.current.getZoom().toFixed(2);
        onMapMove && onMapMove(lng, lat, zoom);
      }
    };
  
    const handleMapLoad = () => {
        const geolocate = new mapboxgl.GeolocateControl({
            positionOptions: { enableHighAccuracy: true },
            trackUserLocation: true,
            showUserLocation: true,
        });
    
        if (map.current) {
            map.current.addControl(geolocate);
            setGeolocateControl(geolocate);
    
            // This line triggers the geolocation, centering the map on the user's location
            geolocate.trigger();
        }
    };
    
  
    const toggleLayerVisibility = (status) => {
        const layerMapping = {
            'Campus Alerts': 'chicago-lostnfound',
            'Campus Events': 'chicago-events',
            'Campus Issues': 'chicago-parks',
            // ... add other mappings as needed
          };
          
  
      for (const [key, layerName] of Object.entries(layerMapping)) {
        const visibility = status[key] ? 'visible' : 'none';
        if (map.current && map.current.getLayer(layerName)) {
          map.current.setLayoutProperty(layerName, 'visibility', visibility);
        }
      }
    };
  
    useEffect(() => {
      toggleLayerVisibility(tabsStatus);
    }, [tabsStatus]);
  
    useEffect(() => {
      if (setMapFunctions) {
        setMapFunctions({
          setCenter: (lng, lat) => {
            map.current && map.current.flyTo({ center: [lng, lat] });
          },
          locateUser: () => {
            geolocateControl && geolocateControl.trigger();
          },
        });
      }
    }, [setMapFunctions, geolocateControl]);
  
    return <div ref={mapContainer} className="map-container" />;
  };
  
  export default React.memo(Map, (prevProps, nextProps) => {
    return JSON.stringify(prevProps.tabsStatus) === JSON.stringify(nextProps.tabsStatus);
  });