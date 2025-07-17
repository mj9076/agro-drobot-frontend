import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';  // Make sure this path matches your App.jsx filename and location
import './index.css';     // optional but usually present

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
