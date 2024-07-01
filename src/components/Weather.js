// src/components/Weather.js
import React, { useState, useEffect } from 'react';
import { getWeather } from '../services/weatherService';
import { TextField, Button, Card, CardContent, Typography } from '@mui/material';
import { WiDaySunny, WiRain } from 'react-icons/wi';
import './Weather.css';

const Weather = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [background, setBackground] = useState('');

  useEffect(() => {
    if (weather) {
      switch (weather.weather[0].main.toLowerCase()) {
        case 'clear':
          setBackground('clear.jpg');
          break;
        case 'rain':
          setBackground('rain.jpg');
          break;
        // Add more cases for different weather conditions
        default:
          setBackground('default.jpg');
      }
    }
  }, [weather]);

  const handleSearch = async () => {
    const data = await getWeather(city);
    setWeather(data);
  };

  return (
    <div className="weather-container" style={{ backgroundImage: `url(${background})` }}>
      <TextField
        label="Enter city"
        variant="outlined"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        style={{ marginBottom: '20px', width: '300px' }}
      />
      <Button variant="contained" color="primary" onClick={handleSearch}>
        Get Weather
      </Button>
      {weather && (
        <Card style={{ marginTop: '20px', width: '300px' }}>
          <CardContent>
            <Typography variant="h5">{weather.name}</Typography>
            <Typography variant="body2">{weather.weather[0].description}</Typography>
            <div>{getWeatherIcon(weather.weather[0].description)}</div>
            <Typography variant="body2">Temperature: {weather.main.temp} °C</Typography>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

const getWeatherIcon = (description) => {
  switch (description) {
    case 'clear sky':
      return <WiDaySunny size={50} />;
    case 'rain':
      return <WiRain size={50} />;
    // Add more cases for different weather conditions
    default:
      return null;
  }
};

export default Weather;
