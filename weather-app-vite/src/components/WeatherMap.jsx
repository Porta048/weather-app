import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix per le icone di Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Componente per aggiornare la vista della mappa
const MapUpdater = ({ position }) => {
  const map = useMap();
  
  useEffect(() => {
    if (position) {
      map.setView(position, map.getZoom());
    }
  }, [position, map]);
  
  return null;
};

const WeatherMap = ({ city, weatherData }) => {
  const [position, setPosition] = useState([41.9028, 12.4964]); // Rome default
  const [loading, setLoading] = useState(true);
  const [mapKey, setMapKey] = useState(0); // Per forzare il re-render della mappa

  useEffect(() => {
    if (weatherData && weatherData.coord) {
      const newPosition = [weatherData.coord.lat, weatherData.coord.lon];
      setPosition(newPosition);
      setMapKey(prev => prev + 1); // Forza il re-render
      setLoading(false);
    }
  }, [weatherData]);

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

  if (loading) {
    return <div className="map-loading">Loading map...</div>;
  }

  return (
    <div className="weather-map-container">
      <h3 className="map-title">Weather Map - {city}</h3>
      <MapContainer 
        key={mapKey}
        center={position} 
        zoom={12} 
        style={{ height: '500px', width: '100%' }}
        className="weather-map"
        zoomControl={true}
        scrollWheelZoom={true}
        doubleClickZoom={true}
        dragging={true}
        touchZoom={true}
      >
        <MapUpdater position={position} />
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          maxZoom={18}
          minZoom={3}
        />
        <Marker position={position}>
          <Popup>
            <div className="map-popup">
              <h4>{city}</h4>
              <div className="popup-weather">
                <span className="popup-icon">
                  {getWeatherIcon(weatherData?.weather[0]?.icon)}
                </span>
                <span className="popup-temp">
                  {Math.round(weatherData?.main?.temp)}°
                </span>
              </div>
              <p>{weatherData?.weather[0]?.description}</p>
              <p>Humidity: {weatherData?.main?.humidity}%</p>
              <p>Wind: {Math.round(weatherData?.wind?.speed)} km/h</p>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default WeatherMap; 