import axios from 'axios';

const API_KEY = 'a5c1895d10eb581dabc3ec14f840ee17';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

const weatherApi = {
  getCurrentWeather: async (city) => {
    try {
      const response = await axios.get(`${BASE_URL}/weather`, {
        params: {
          q: city,
          appid: API_KEY,
          units: 'metric',
          lang: 'en'
        }
      });
      return response.data;
    } catch (error) {
      throw new Error('Error retrieving current weather');
    }
  },

  getWeatherByCoords: async (lat, lon) => {
    try {
      const response = await axios.get(`${BASE_URL}/weather`, {
        params: {
          lat: lat,
          lon: lon,
          appid: API_KEY,
          units: 'metric',
          lang: 'en'
        }
      });
      return response.data;
    } catch (error) {
      throw new Error('Error retrieving weather for coordinates');
    }
  },

  getForecast: async (city) => {
    try {
      const response = await axios.get(`${BASE_URL}/forecast`, {
        params: {
          q: city,
          appid: API_KEY,
          units: 'metric',
          lang: 'en'
        }
      });
      return response.data;
    } catch (error) {
      throw new Error('Error retrieving forecast');
    }
  },

  getForecastByCoords: async (lat, lon) => {
    try {
      const response = await axios.get(`${BASE_URL}/forecast`, {
        params: {
          lat: lat,
          lon: lon,
          appid: API_KEY,
          units: 'metric',
          lang: 'en'
        }
      });
      return response.data;
    } catch (error) {
      throw new Error('Error retrieving forecast for coordinates');
    }
  }
};

export default weatherApi; 