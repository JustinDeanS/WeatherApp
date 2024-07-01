// src/services/weatherService.js
import axios from 'axios';

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;  // Replace 'YOUR_API_KEY' with your actual API key
const BASE_URL = 'http://api.openweathermap.org/data/2.5/';

export const getWeather = async (city) => {
  const response = await axios.get(`${BASE_URL}weather?q=${city}&appid=${API_KEY}&units=metric`);
  return response.data;
};
