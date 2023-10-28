import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import EventList from './EventList';

mapboxgl.accessToken = 'pk.eyJ1IjoibHlyYXBoaXgiLCJhIjoiY2xvYWZvM2lmMGk4YzJqcWMwODdnN3J5bCJ9.bEdAGzoZaFPApU_TPPMKCQ';

export default function App() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-87.57);
  const [lat, setLat] = useState(41.91);
  const [zoom, setZoom] = useState(8.6);
  
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (map.current) return; // initialize map only once

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/lyraphix/cloago2u400rc01ozd1sh3x03',
      center: [lng, lat],
      zoom: zoom,
    });

    map.current.on('move', () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });

    // Adding the popup functionality here
    map.current.on('click', (event) => {
      const features = map.current.queryRenderedFeatures(event.point, {
        layers: ['chicago-parks'],
      });
      if (!features.length) {
        return;
      }
      const feature = features[0];

      new mapboxgl.Popup({ offset: [0, -15] })
        .setLngLat(feature.geometry.coordinates)
        .setHTML(
          `<h3>${feature.properties.title}</h3><p>${feature.properties.description}</p>`
        )
        .addTo(map.current);
    });
  }, []);
  
  const eventsData = [
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
    <div>
      <div className="sidebar">
        Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
      </div>
      <div ref={mapContainer} className="map-container" />
      <div>
      {eventsData.map((list, index) => (
        <EventList key={index} tagName={list.tagName} events={list.events} />
      ))}
    </div>
    </div>
  );
}
