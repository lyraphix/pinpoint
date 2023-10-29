import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import './map.css';

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

    map.current.on('click', (event) => {
      event.preventDefault();
      const layersToQuery = ['chicago-parks', 'chicago-events', 'chicago-lostnfound'];
      const features = map.current.queryRenderedFeatures(event.point, { layers: layersToQuery });

      if (!features.length) return;

      const feature = features[0];
      new mapboxgl.Popup({ offset: [0, -15] })
        .setLngLat(feature.geometry.coordinates)
        .setHTML(`<h3>${feature.properties.title}</h3><p>${feature.properties.description}</p>`)
        .addTo(map.current);
    });

  }, []);

  const toggleLayerVisibility = (tabsStatus) => {
    const layerMapping = {
      'Events': 'chicago-events',
      'Alerts': 'chicago-parks',
      'Requests': 'chicago-lostnfound'
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
    return JSON.stringify(prevProps.tabsStatus) === JSON.stringify(nextProps.tabsStatus);
});

export default Map;
