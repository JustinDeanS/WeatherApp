import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { WiDaySunny, WiDayCloudy, WiRain, WiSnow, WiFog } from 'react-icons/wi';
import './Weather.css';

const WeatherContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
  background: linear-gradient(135deg, #72EDF2 10%, #5151E5 100%);
  color: #fff;
  font-family: 'Arial', sans-serif;
  text-align: center;
  padding: 20px;
  box-sizing: border-box;
  transition: background 0.5s ease;
`;

const Title = styled.h1`
  font-size: 3rem;
  margin-bottom: 20px;
`;

const SearchContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

const SearchInput = styled.input`
  padding: 10px;
  font-size: 1rem;
  border: none;
  border-radius: 5px;
  margin-right: 10px;
`;

const SearchButton = styled.button`
  padding: 10px 20px;
  font-size: 1rem;
  border: none;
  border-radius: 5px;
  background-color: #3333cc;
  color: #fff;
  cursor: pointer;
  transition: background-color 0.3s;
  &:hover {
    background-color: #2a2aa1;
  }
`;

const WeatherCard = styled.div`
  background: rgba(255, 255, 255, 0.2);
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  max-width: 400px;
  width: 100%;
  margin-top: 20px;
`;

const WeatherIcon = styled.div`
  font-size: 4rem;
  margin-bottom: 20px;
`;

const WeatherDetails = styled.div`
  font-size: 1.2rem;
`;

const getWeatherIcon = (main) => {
  switch (main) {
    case 'Clear':
      return <WiDaySunny />;
    case 'Clouds':
      return <WiDayCloudy />;
    case 'Rain':
      return <WiRain />;
    case 'Snow':
      return <WiSnow />;
    case 'Fog':
    case 'Mist':
      return <WiFog />;
    default:
      return <WiDaySunny />;
  }
};

const Weather = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);

  const getWeather = async () => {
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=imperial`);
      setWeather(response.data);
    } catch (error) {
      console.error('Error fetching the weather data:', error);
    }
  };

  const handleSearch = async (event) => {
    event.preventDefault();
    await getWeather();
  };

  return (
    <WeatherContainer>
      <Title>Weather App</Title>
      <SearchContainer>
        <SearchInput
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <SearchButton onClick={handleSearch}>Search</SearchButton>
      </SearchContainer>
      {weather && (
        <WeatherCard>
          <WeatherIcon>{getWeatherIcon(weather.weather[0].main)}</WeatherIcon>
          <h2>{weather.name}</h2>
          <WeatherDetails>
            <p>Temperature: {weather.main.temp} °F</p>
            <p>Condition: {weather.weather[0].description}</p>
            <p>Humidity: {weather.main.humidity} %</p>
            <p>Wind Speed: {weather.wind.speed} m/s</p>
          </WeatherDetails>
        </WeatherCard>
      )}
    </WeatherContainer>
  );
}

export default Weather;
