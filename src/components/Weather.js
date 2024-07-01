// src/components/Weather.js
import React, { useState } from 'react';
import { getWeather } from '../services/weatherService';
import { TextField, Button, Card, CardContent, Typography, CircularProgress } from '@mui/material';
import { WiDaySunny, WiRain, WiCloudy, WiSnow, WiFog, WiHumidity, WiStrongWind } from 'react-icons/wi';
import './Weather.css';

const Weather = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await getWeather(city);
      setWeather(data);
    } catch (err) {
      setError('City not found or API error.');
    }
    setLoading(false);
  };

  return (
    <div className="weather-container">
      <div className="input-container">
        <TextField
          label="Enter city"
          variant="outlined"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <Button variant="contained" color="primary" onClick={handleSearch} disabled={loading}>
          {loading ? <CircularProgress size={24} /> : 'Get Weather'}
        </Button>
      </div>
      {error && <Typography className="error-message">{error}</Typography>}
      {weather && !loading && (
        <Card className="MuiCard-root">
          <CardContent className="MuiCardContent-root">
            <Typography variant="h5">{weather.name}</Typography>
            <Typography variant="body2">{weather.weather[0].description}</Typography>
            <div className="weather-icon">{getWeatherIcon(weather.weather[0].description)}</div>
            <Typography variant="body2">Temperature: {weather.main.temp} °C</Typography>
            <Typography variant="body2"><WiHumidity size={24} /> Humidity: {weather.main.humidity}%</Typography>
            <Typography variant="body2"><WiStrongWind size={24} /> Wind Speed: {weather.wind.speed} m/s</Typography>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

const getWeatherIcon = (description) => {
  switch (description.toLowerCase()) {
    case 'clear sky':
      return <WiDaySunny size={50} />;
    case 'rain':
      return <WiRain size={50} />;
    case 'clouds':
      return <WiCloudy size={50} />;
    case 'snow':
      return <WiSnow size={50} />;
    case 'fog':
      return <WiFog size={50} />;
    default:
      return null;
  }
};

export default Weather;
