import React from 'react';
import ReactDOM from 'react-dom';
import 'mapbox-gl/dist/mapbox-gl.css';
import './index.css';
import App from './App';
import { Auth0Provider } from '@auth0/auth0-react';
import 'mapbox-gl/dist/mapbox-gl.css';
import './index.css';
import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage';
//import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDnvujRiXxhZxEraljFTXrEwKKY5uialPY",
  authDomain: "pinpoint-477c9.firebaseapp.com",
  projectId: "pinpoint-477c9",
  storageBucket: "pinpoint-477c9.appspot.com",
  messagingSenderId: "744530718614",
  appId: "1:744530718614:web:b838de0f3aae8e17ca37b7",
  measurementId: "G-6MRJ1JTB2D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
//const analytics = getAnalytics(app);

ReactDOM.render(
  <Auth0Provider
    domain="dev-4v4r0m7omhqfj5lh.us.auth0.com"
    clientId="8DXw42pkHjqExAUFzlkeSJ9Fri0Fqjsk"
    redirectUri={window.location.origin}
  >
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Auth0Provider>,
  document.getElementById('root')
);

export { storage };