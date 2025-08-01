import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import weatherApi from '../services/weatherApi';
import WeatherMap from './WeatherMap';

const WeatherDetail = () => {
  const { city } = useParams();
  const navigate = useNavigate();
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showMap, setShowMap] = useState(false);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const [currentData, forecastData] = await Promise.all([
          weatherApi.getCurrentWeather(city),
          weatherApi.getForecast(city)
        ]);
        
        setCurrentWeather(currentData);
        setForecast(forecastData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, [city]);

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

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      day: 'numeric',
      month: 'long'
    });
  };

  const groupForecastByDay = (forecastList) => {
    const grouped = {};
    forecastList.forEach(item => {
      const date = new Date(item.dt * 1000).toDateString();
      if (!grouped[date]) {
        grouped[date] = [];
      }
      grouped[date].push(item);
    });
    return grouped;
  };

  if (loading) {
    return (
      <div className="container">
        <div className="loading">
          <h2>Loading weather for {city}...</h2>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <div className="card">
          <div className="error">
            <h3>Error</h3>
            <p>{error}</p>
            <button className="btn" onClick={() => navigate('/')}>
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  const dailyForecast = forecast ? groupForecastByDay(forecast.list) : {};

  return (
    <div className="weather-detail-container">
      <div className="card">
        <div className="weather-header">
          <h1>
            {getWeatherIcon(currentWeather?.weather[0]?.icon)} {city}
          </h1>
          <div className="header-buttons">
            <button 
              className="btn map-btn"
              onClick={() => setShowMap(!showMap)}
            >
              {showMap ? '🗺️ Hide Map' : '🗺️ Show Map'}
            </button>
            <button className="btn" onClick={() => navigate('/')}>
              ← Back
            </button>
          </div>
        </div>

        {showMap && currentWeather && (
          <div className="map-section">
            <WeatherMap city={city} weatherData={currentWeather} />
          </div>
        )}

        {currentWeather && (
          <div className="current-weather">
            <h2>Current Weather</h2>
            <div className="current-temperature">
              {Math.round(currentWeather.main.temp)}°
            </div>
            <div className="description">
              {currentWeather.weather[0].description}
            </div>
            <div className="details">
              <div>Humidity: {currentWeather.main.humidity}%</div>
              <div>Wind Speed: {Math.round(currentWeather.wind.speed)} km/h</div>
              <div>Pressure: {currentWeather.main.pressure} hPa</div>
            </div>
          </div>
        )}

        <h2 className="forecast-title">5-Day Forecast</h2>
        <div className="weather-grid">
          {Object.entries(dailyForecast).slice(0, 5).map(([date, forecasts]) => {
            const avgTemp = Math.round(
              forecasts.reduce((sum, f) => sum + f.main.temp, 0) / forecasts.length
            );
            const avgWindSpeed = Math.round(
              forecasts.reduce((sum, f) => sum + f.wind.speed, 0) / forecasts.length
            );
            const mostCommonWeather = forecasts[0]?.weather[0];
            
            return (
              <div key={date} className="weather-card">
                <h3>{formatDate(new Date(date))}</h3>
                <div className="temperature">{avgTemp}°</div>
                <div className="description">
                  {getWeatherIcon(mostCommonWeather?.icon)} {mostCommonWeather?.description}
                </div>
                <div className="details">
                  <div>Min: {Math.round(Math.min(...forecasts.map(f => f.main.temp_min)))}°</div>
                  <div>Max: {Math.round(Math.max(...forecasts.map(f => f.main.temp_max)))}°</div>
                  <div>Wind: {avgWindSpeed} km/h</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default WeatherDetail; 