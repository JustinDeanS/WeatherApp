// src/App.js
import React from 'react';
import Weather from './components/Weather';
import './App.css';

const App = () => {
  return (
    <div className="App">
      <h1>Weather App</h1>
      <Weather />
    </div>
  );
};

export default App;
