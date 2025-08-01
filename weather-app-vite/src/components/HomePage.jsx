import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import weatherApi from '../services/weatherApi';

const HomePage = () => {
  const [city, setCity] = useState('');
  const [popularCities, setPopularCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [locationLoading, setLocationLoading] = useState(false);
  const navigate = useNavigate();

  const defaultCities = ['Rome', 'Milan', 'Naples'];

  useEffect(() => {
    const fetchPopularCitiesWeather = async () => {
      try {
        setLoading(true);
        const weatherPromises = defaultCities.map(city => 
          weatherApi.getCurrentWeather(city).catch(() => null)
        );
        
        const results = await Promise.all(weatherPromises);
        const validResults = results.filter(result => result !== null);
        setPopularCities(validResults);
      } catch (error) {
        console.error('Error loading popular cities:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPopularCitiesWeather();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) {
      navigate(`/weather/${encodeURIComponent(city.trim())}`);
    }
  };

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser');
      return;
    }

    setLocationLoading(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const weatherData = await weatherApi.getWeatherByCoords(latitude, longitude);
          navigate(`/weather/${encodeURIComponent(weatherData.name)}`);
        } catch (error) {
          alert('Error retrieving weather for your location');
        } finally {
          setLocationLoading(false);
        }
      },
      (error) => {
        alert('Unable to get your location. Please check your geolocation permissions.');
        setLocationLoading(false);
      }
    );
  };

  const getWeatherIcon = (weatherCode) => {
    const icons = {
      '01d': '☀️', '01n': '🌙', '02d': '⛅', '02n': '☁️',
      '03d': '☁️', '03n': '☁️', '04d': '☁️', '04n': '☁️',
      '09d': '🌧️', '09n': '🌧️', '10d': '🌦️', '10n': '🌧️',
      '11d': '⛈️', '11n': '⛈️', '13d': '🌨️', '13n': '🌨️',
      '50d': '🌫️', '50n': '🌫️'
    };
    return icons[weatherCode] || '🌤️';
  };

  return (
    <div className="homepage-container">
      <div className="card">
        <h1 className="homepage-title">
          🌤️ Weather
        </h1>
        <p className="homepage-subtitle">
          Enter a city name to see weather forecasts
        </p>
        
        <form onSubmit={handleSubmit} className="homepage-form">
          <input
            type="text"
            className="input"
            placeholder="Ex: Rome, Milan, New York..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
          <div className="search-buttons">
            <button type="submit" className="btn search-btn">
              Search Weather
            </button>
            <button 
              type="button" 
              className="btn location-btn"
              onClick={getCurrentLocation}
              disabled={locationLoading}
            >
              {locationLoading ? '📍 Loading...' : '📍 Current Location'}
            </button>
          </div>
        </form>

        {!loading && popularCities.length > 0 && (
          <div className="popular-cities">
            <h3 className="popular-cities-title">Popular Cities</h3>
            <div className="popular-cities-grid">
              {popularCities.map((cityWeather, index) => (
                <div 
                  key={cityWeather.name} 
                  className="popular-city-card"
                  onClick={() => navigate(`/weather/${encodeURIComponent(cityWeather.name)}`)}
                >
                  <div className="city-name">{cityWeather.name}</div>
                  <div className="city-weather-icon">
                    {getWeatherIcon(cityWeather.weather[0]?.icon)}
                  </div>
                  <div className="city-temperature">
                    {Math.round(cityWeather.main.temp)}°
                  </div>
                  <div className="city-description">
                    {cityWeather.weather[0]?.description}
                  </div>
                  <div className="city-wind">
                    Wind: {Math.round(cityWeather.wind.speed)} km/h
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage; 