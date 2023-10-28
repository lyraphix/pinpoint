import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = 'pk.eyJ1IjoibHlyYXBoaXgiLCJhIjoiY2xvYWZvM2lmMGk4YzJqcWMwODdnN3J5bCJ9.bEdAGzoZaFPApU_TPPMKCQ';

const Map = React.memo(({ initialLng, initialLat, initialZoom, onMapMove, tabsStatus }) => {
  const mapContainer = useRef(null);
  const map = useRef(null);

  const [position, setPosition] = useState({
    lng: initialLng,
    lat: initialLat,
    zoom: initialZoom,
  });

  useEffect(() => {
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/lyraphix/cloago2u400rc01ozd1sh3x03',
      center: [position.lng, position.lat],
      zoom: position.zoom,
    });

    map.current.on('move', () => {
      const newLng = map.current.getCenter().lng.toFixed(4);
      const newLat = map.current.getCenter().lat.toFixed(4);
      const newZoom = map.current.getZoom().toFixed(2);

      setPosition({
        lng: newLng,
        lat: newLat,
        zoom: newZoom,
      });

      onMapMove(newLng, newLat, newZoom);
    });

    map.current.on('load', () => {
      toggleLayerVisibility(tabsStatus);
    });
// eslint-disable-next-line 
  }, []);

  const toggleLayerVisibility = (tabsStatus) => {
    const layerMapping = {
      'Events': 'chicago-events',
      'Locations': 'chicago-parks',
      'Details': 'chicago-lostnfound'
    };

    Object.keys(layerMapping).forEach(tabName => {
      const layerId = layerMapping[tabName];
      const visibility = tabsStatus[tabName] ? 'visible' : 'none';
      if (map.current.getLayer(layerId)) {
        map.current.setLayoutProperty(layerId, 'visibility', visibility);
      }
    });
  };

  useEffect(() => {
    if (map.current && map.current.isStyleLoaded()) {
      toggleLayerVisibility(tabsStatus);
    }
  }, [tabsStatus]);

  return <div ref={mapContainer} className="map-container" />;
}, (prevProps, nextProps) => {
    // Only re-render if tabsStatus values change
    return JSON.stringify(prevProps.tabsStatus) === JSON.stringify(nextProps.tabsStatus);
  }
  );

export default Map;
