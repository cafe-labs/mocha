import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from "react-router-dom"

if ('serviceWorker' in navigator) {
  // Register a service worker hosted at the root of the
  // site using the default scope.
  navigator.serviceWorker.register(`/uv-sw.js`, { scope: '/uv/'}).then(
    () => {
      console.log ('UV Service worker registration succeeded');
    },
    error => {
      console.error(`UV Service worker registration failed: ${error}`);
    }
  );

  navigator.serviceWorker.register(`/dynamic-sw.js`, { scope: '/dynamic/'}).then(
    () => {
      console.log ('Dynamic Service worker registration succeeded');
    },
    error => {
      console.error(`Dynamic Service worker registration failed: ${error}`);
    }
  );
} else {
  console.error('Service workers are not supported.');
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
)
