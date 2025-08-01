# Weather App - Modern Weather Application

A modern React application to check weather around the world using OpenWeather APIs, built with Vite for optimal performance and Apple Weather app-inspired design.

## Screenshots

### Homepage
<div align="center">
  <img src="homepage.png" alt="Weather app homepage" width="800" style="border-radius: 20px; box-shadow: 0 8px 32px rgba(0,0,0,0.2);">
</div>

### Interactive Map Page
<div align="center">
  <img src="map.png" alt="Interactive weather map" width="800" style="border-radius: 20px; box-shadow: 0 8px 32px rgba(0,0,0,0.2);">
</div>

## Main Features

### Apple-Style Design
- **Glassmorphism**: Glass blur effects on all cards
- **Dynamic Gradients**: Sky blue gradient background
- **SF Pro Typography**: Apple system font for authentic look
- **Smooth Animations**: Elegant transitions and hover effects

### Weather Features
- **City Search**: Input to search any city worldwide
- **Geolocation**: Automatic current location detection
- **Current Weather**: Temperature, conditions, humidity, wind, pressure
- **5-Day Forecast**: Detailed forecast with min/max temperatures
- **Popular Cities**: Section with weather for Rome, Milan, Naples

### Interactive Maps
- **Leaflet Map**: OpenStreetMap integration
- **Dynamic Markers**: Indicators for each city
- **Informative Popups**: Weather details on click
- **Zoom Controls**: Smooth map navigation
- **Responsive**: Optimized for desktop and mobile

### Responsive Design
- **Mobile-First**: Optimized for smartphones
- **Tablet**: Adaptive layout for iPad
- **Desktop**: Complete experience on large screens
- **Touch-Friendly**: Touch-optimized controls

## Technologies Used

### Frontend
- **Vite** - Modern and fast build tool
- **React 18** - UI library with hooks
- **React Router DOM** - Application routing
- **Axios** - HTTP requests for APIs
- **Leaflet** - Interactive maps
- **React-Leaflet** - React wrapper for Leaflet

### Styling
- **CSS3** - Modern styles with glassmorphism
- **Media Queries** - Complete responsive design
- **CSS Grid & Flexbox** - Advanced layouts
- **Custom Properties** - CSS variables for consistency

### APIs & Services
- **OpenWeather API** - Real-time weather data
- **Geolocation API** - User location
- **OpenStreetMap** - Map tiles

## Installation and Setup

### Prerequisites
- Node.js version 16 or higher
- npm or yarn as package manager

### Installation
```bash
# Clone the repository
git clone <repository-url>
cd weather-app-vite

# Install dependencies
npm install
```

### API Configuration
1. Get an API key from [OpenWeather](https://openweathermap.org/api)
2. Modify the file `src/services/weatherApi.js`:
```javascript
const API_KEY = 'your_api_key_here';
```

## Starting the Application

### Development Mode
```bash
npm run dev
```
The application will be available at: `http://localhost:5173`

### Production Build
```bash
npm run build
npm run preview
```

## How to Use the App

### Homepage
1. **Manual Search**: Enter a city name in the input field
2. **Quick Search**: Click "Search Weather" to view forecasts
3. **Current Location**: Click "Current Location" for your area's weather
4. **Popular Cities**: Click on one of the cards (Rome, Milan, Naples) for quick access

### Details Page
1. **Current Weather**: View temperature, conditions, humidity, wind
2. **5-Day Forecast**: Scroll through cards to see the forecast
3. **Interactive Map**: Click "Show Map" for map view
4. **Navigation**: Use "Back" to return to homepage

### Interactive Map
1. **Zoom**: Use +/- controls to zoom
2. **Markers**: Click on markers for weather information
3. **Navigation**: Move the map by dragging
4. **Hide**: Click "Hide Map" to return to details

## Project Structure

```
weather-app-vite/
├── public/
│   ├── index.html              # Main HTML
│   ├── homepage.png            # Homepage screenshot
│   └── map.png                 # Map screenshot
├── src/
│   ├── components/
│   │   ├── HomePage.jsx        # Main page with search
│   │   ├── WeatherDetail.jsx   # Weather details page
│   │   └── WeatherMap.jsx      # Interactive map component
│   ├── services/
│   │   └── weatherApi.js       # Weather API service
│   ├── App.jsx                 # Main component with routing
│   ├── main.jsx                # Application entry point
│   └── index.css              # Global and responsive styles
├── package.json               # Dependencies and scripts
└── README.md                  # Documentation
```

## Design Features

### Glassmorphism
- **Backdrop Filter**: Blur effect for transparency
- **Transparent Borders**: Thin borders with opacity
- **Soft Shadows**: Delicate shadows for depth

### Responsive Design
- **Breakpoints**: 1400px, 1024px, 768px, 480px, 360px
- **Mobile-First**: Mobile-first approach for optimization
- **Touch Optimization**: Touch-optimized controls

### Animations
- **Hover Effects**: Transformations on mouse hover
- **Smooth Transitions**: Smooth transitions for all elements
- **Loading States**: Elegant loading states

## API Integration

### OpenWeather API
- **Current Weather**: Current weather with complete details
- **5-Day Forecast**: 5-day forecasts
- **Geocoding**: City name to coordinates conversion
- **Error Handling**: Robust error handling

### Geolocation API
- **Automatic Detection**: Automatic location detection
- **Permission Handling**: Browser permission management
- **Fallback**: Fallback for devices without GPS

## Customization

### Modify Colors
```css
/* In src/index.css */
body {
  background: linear-gradient(180deg, #your_color1 0%, #your_color2 50%, #your_color3 100%);
}
```

### Add Popular Cities
```javascript
// In src/components/HomePage.jsx
const defaultCities = [
  { name: 'Rome', country: 'IT' },
  { name: 'Milan', country: 'IT' },
  { name: 'Naples', country: 'IT' },
  // Add new cities here
];
```

### Modify Card Styles
```css
/* Customize card appearance */
.weather-card {
  background: rgba(255, 255, 255, 0.15); /* Change opacity */
  border-radius: 30px; /* Change rounded corners */
}
```

## Vite Advantages

### Performance
- **Fast HMR**: Instant Hot Module Replacement
- **Optimized Build**: Fast compilation for production
- **ES Modules**: Native ES6 module support
- **Tree Shaking**: Automatic unused code elimination

### Developer Experience
- **Zero Config**: Immediate setup
- **Plugin Ecosystem**: Wide range of available plugins
- **TypeScript Support**: Native TypeScript support
- **CSS Modules**: CSS module support

## Troubleshooting

### Invalid API Key
```javascript
// Check in src/services/weatherApi.js
const API_KEY = 'your_correct_api_key';
```

### Map Not Loading
- Check internet connection
- Verify Leaflet is installed: `npm install leaflet react-leaflet`

### Geolocation Not Working
- Check browser permissions
- Ensure the site is served via HTTPS

## License

This project is open source and available under MIT license.

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Create a Pull Request

## Support

For support or questions:
- Open an issue on GitHub
- Contact the development team

---

