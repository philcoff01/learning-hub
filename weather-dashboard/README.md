# 🌤️ Weather Dashboard

A modern, responsive weather dashboard that fetches real-time weather data from the OpenWeatherMap API.

## ✨ Features

### 🎯 Core Features
- **Real-time Weather Data** - Get current weather conditions for any city
- **Autocomplete Search** - City suggestions as you type
- **Geolocation Support** - Get weather for your current location
- **5-Day Forecast** - Extended weather forecast
- **Detailed Information** - Humidity, wind speed, pressure, visibility, UV index, and more
- **Additional Details** - Sunrise/sunset times, precipitation, coordinates, timezone
- **Recent Searches** - Quick access to previously searched cities
- **Dark Mode** - Toggle between light and dark themes
- **Responsive Design** - Works on desktop, tablet, and mobile devices
- **Local Storage** - Remembers your theme preference and recent searches

### 📊 Weather Information
- Current temperature and "feels like" temperature
- Weather condition with emoji representation
- Humidity, wind speed, and pressure
- Visibility and UV index
- Sunrise and sunset times
- Precipitation and cloud coverage
- Geographic coordinates
- Timezone information

## 🚀 Getting Started

### Prerequisites
1. **OpenWeatherMap API Key** - Get a free API key at [openweathermap.org](https://openweathermap.org/api)

### Installation

1. **Get Your API Key**
   - Visit https://openweathermap.org/api
   - Sign up for a free account
   - Copy your API key from the dashboard

2. **Set the API Key**
   - Open `script.js`
   - Find line with `const API_KEY = 'YOUR_API_KEY_HERE'`
   - Replace `'YOUR_API_KEY_HERE'` with your actual API key

3. **Open in Browser**
   - Simply open `index.html` in your web browser
   - Or serve the files using a local server:
     ```bash
     python -m http.server 8000
     # Then visit http://localhost:8000
     ```

## 📁 File Structure

```
weather-dashboard/
├── index.html          # Main HTML structure
├── styles.css          # Complete styling with dark mode
├── script.js           # All JavaScript functionality
└── README.md           # This file
```

## 🔧 Usage

### Search for a City
1. Type a city name in the search box
2. Click "Search" or press Enter
3. See suggestions appear and click to select

### Use Current Location
1. Click the 📍 button
2. Allow browser permission for geolocation
3. Weather for your location will load

### View Recent Searches
- Click any city in the "Recent Searches" section
- Previously searched cities are stored in browser

### Toggle Dark Mode
- Click the 🌙/☀️ button in the header
- Your preference is saved

## 🎨 Customization

### Change Colors
Edit CSS variables in `styles.css`:
```css
:root {
    --primary-color: #667eea;
    --secondary-color: #764ba2;
    --accent-color: #f093fb;
    /* ... other colors ... */
}
```

### Change Temperature Units
In `script.js`, change the `units` parameter:
```javascript
// For Fahrenheit:
`${API_BASE_URL}/weather?q=${city}&units=imperial&appid=${API_KEY}`

// For Kelvin:
`${API_BASE_URL}/weather?q=${city}&units=standard&appid=${API_KEY}`
```

### Modify Forecast Duration
In `displayForecast()` function, change the slice number:
```javascript
const forecastList = data.list.filter((item, index) => index % 8 === 0).slice(0, 5);
// 5 = 5-day forecast, change to 8 for 8-day, etc.
```

## 📡 API Integration

### OpenWeatherMap Endpoints Used
1. **Current Weather** - `weather` endpoint
2. **Weather Forecast** - `forecast` endpoint
3. **Geolocation** - `geo` endpoint
4. **UV Index** - `uvi` endpoint

### API Key Requirements
- Free tier includes all necessary endpoints
- No payment required for basic usage
- Some advanced features may require a paid plan

## 🌐 Browser Support
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📱 Responsive Breakpoints
- Desktop: 1200px and above
- Tablet: 768px to 1199px
- Mobile: Below 768px

## ⚠️ Troubleshooting

### "Please set your OpenWeatherMap API key"
- Make sure you've set the API_KEY in script.js
- Verify the key is correct
- Check that the key is not wrapped in extra quotes

### "City not found"
- Check spelling of city name
- Try using city name without special characters
- Use the autocomplete suggestion feature

### "Unable to get your location"
- Check browser geolocation permission
- Some browsers require HTTPS for geolocation
- Try allowing location access in browser settings

### Weather data not updating
- Check your API rate limit (free tier: 60 calls/minute)
- Verify internet connection
- Check browser console for errors (F12)

## 🎓 Learning Resources

### Concepts Used
- **Fetch API** - Making HTTP requests
- **Async/Await** - Handling asynchronous operations
- **LocalStorage** - Storing data in browser
- **Geolocation API** - Getting user location
- **DOM Manipulation** - Updating HTML dynamically
- **CSS Grid & Flexbox** - Responsive layouts
- **Event Listeners** - Handling user interactions

### Enhancement Ideas
1. Add weather alerts and warnings
2. Create a city comparison feature
3. Add weather history tracking
4. Integrate weather maps (e.g., Leaflet)
5. Add air quality information
6. Create weather notifications
7. Add precipitation radar
8. Export weather data to CSV
9. Create custom dashboard layouts
10. Add weather-based recommendations

## 📝 License
Open source and available for personal and commercial use.

## 🔗 Useful Links
- [OpenWeatherMap API](https://openweathermap.org/api)
- [API Documentation](https://openweathermap.org/api)
- [Sign Up for Free](https://openweathermap.org/users/register)
- [API Explorer](https://openweathermap.org/find)

---

Made with ❤️ | Weather Dashboard v1.0
