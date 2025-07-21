import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx'; // ✅ Correct import path and casing

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App /> {/* ✅ App is defined and exported */}
  </React.StrictMode>
);
