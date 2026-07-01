// ==================== Configuration ====================
const API_KEY = '54cd5ae824b02a0800a6ca20feb02136'; // Get from https://openweathermap.org/api
const API_BASE_URL = 'https://api.openweathermap.org/data/2.5';
const GEO_API_URL = 'https://api.openweathermap.org/geo/1.0';

// ==================== DOM Elements ====================
const searchInput = document.getElementById('city-input');
const searchBtn = document.getElementById('search-btn');
const locationBtn = document.getElementById('location-btn');
const themeBtn = document.getElementById('theme-btn');
const loading = document.getElementById('loading');
const error = document.getElementById('error');
const currentWeatherSection = document.getElementById('current-weather');
const forecastSection = document.getElementById('forecast-section');
const additionalDetails = document.getElementById('additional-details');
const suggestions = document.getElementById('suggestions');

// ==================== State ====================
let recentSearches = JSON.parse(localStorage.getItem('recentSearches')) || [];
const MAX_RECENT = 5;
let debounceTimer;

// ==================== Initialize ====================
document.addEventListener('DOMContentLoaded', () => {
    loadTheme();
    loadRecentSearches();
    setupEventListeners();
});

// ==================== Event Listeners ====================
function setupEventListeners() {
    searchBtn.addEventListener('click', () => searchWeather());
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') searchWeather();
    });
    searchInput.addEventListener('input', handleInputChange);
    locationBtn.addEventListener('click', getCurrentLocation);
    themeBtn.addEventListener('click', toggleTheme);
    document.addEventListener('click', (e) => {
        if (e.target !== searchInput && e.target !== suggestions) {
            suggestions.classList.remove('active');
        }
    });
}

// ==================== Search Weather ====================
async function searchWeather() {
    const city = searchInput.value.trim();
    if (!city) {
        showError('Please enter a city name');
        return;
    }

    if (!API_KEY || API_KEY === 'YOUR_API_KEY_HERE') {
        showError('⚠️ Please set your OpenWeatherMap API key in script.js');
        return;
    }

    await fetchWeatherData(city);
    suggestions.classList.remove('active');
}

// ==================== Handle Input Change (Autocomplete) ====================
function handleInputChange(e) {
    clearTimeout(debounceTimer);
    const query = e.target.value.trim();

    if (query.length < 2) {
        suggestions.classList.remove('active');
        return;
    }

    debounceTimer = setTimeout(() => {
        fetchSuggestions(query);
    }, 300);
}

// ==================== Fetch Suggestions ====================
async function fetchSuggestions(query) {
    try {
        const response = await fetch(
            `${GEO_API_URL}/direct?q=${query}&limit=5&appid=${API_KEY}`
        );
        const data = await response.json();

        if (data.length === 0) {
            suggestions.innerHTML = '<div class="suggestion-item">No cities found</div>';
        } else {
            suggestions.innerHTML = data
                .map((city) => {
                    const label = `${city.name}${city.state ? ', ' + city.state : ''}, ${city.country}`;
                    return `
                        <div class="suggestion-item" data-city="${city.name}" data-lat="${city.lat}" data-lon="${city.lon}">
                            ${label}
                        </div>
                    `;
                })
                .join('');
            suggestions.classList.add('active');

            // Add click handlers to suggestions
            document.querySelectorAll('.suggestion-item').forEach((item) => {
                item.addEventListener('click', (e) => {
                    const city = e.target.getAttribute('data-city');
                    const lat = e.target.getAttribute('data-lat');
                    const lon = e.target.getAttribute('data-lon');
                    searchInput.value = city;
                    fetchWeatherByCoords(lat, lon);
                    suggestions.classList.remove('active');
                });
            });
        }
    } catch (err) {
        console.error('Error fetching suggestions:', err);
    }
}

// ==================== Fetch Weather Data ====================
async function fetchWeatherData(city) {
    try {
        showLoading(true);
        hideError();

        const response = await fetch(
            `${API_BASE_URL}/weather?q=${city}&units=metric&appid=${API_KEY}`
        );

        if (!response.ok) {
            throw new Error('City not found');
        }

        const data = await response.json();
        const { lat, lon } = data.coord;

        // Fetch additional data (forecast and UV index)
        const [forecastData, uvData] = await Promise.all([
            fetch(`${API_BASE_URL}/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`).then(r => r.json()),
            fetch(`https://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&appid=${API_KEY}`).then(r => r.json())
        ]);

        // Add API key to data
        data.apiKey = API_KEY;
        data.uvIndex = uvData.value;
        data.forecastData = forecastData;

        displayCurrentWeather(data);
        displayForecast(forecastData);
        displayAdditionalDetails(data);
        addToRecentSearches(city);

        showLoading(false);
    } catch (err) {
        showError(err.message);
        showLoading(false);
    }
}

// ==================== Fetch Weather by Coordinates ====================
async function fetchWeatherByCoords(lat, lon) {
    try {
        showLoading(true);
        hideError();

        const [weatherData, forecastData, uvData] = await Promise.all([
            fetch(`${API_BASE_URL}/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`).then(r => r.json()),
            fetch(`${API_BASE_URL}/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`).then(r => r.json()),
            fetch(`https://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&appid=${API_KEY}`).then(r => r.json())
        ]);

        weatherData.uvIndex = uvData.value;
        weatherData.forecastData = forecastData;

        displayCurrentWeather(weatherData);
        displayForecast(forecastData);
        displayAdditionalDetails(weatherData);
        addToRecentSearches(weatherData.name);
        searchInput.value = weatherData.name;

        showLoading(false);
    } catch (err) {
        showError('Error fetching weather data');
        showLoading(false);
    }
}

// ==================== Get Current Location ====================
function getCurrentLocation() {
    if (!navigator.geolocation) {
        showError('Geolocation is not supported by your browser');
        return;
    }

    showLoading(true);
    navigator.geolocation.getCurrentPosition(
        (position) => {
            const { latitude, longitude } = position.coords;
            fetchWeatherByCoords(latitude, longitude);
        },
        (err) => {
            showError('Unable to get your location: ' + err.message);
            showLoading(false);
        }
    );
}

// ==================== Display Current Weather ====================
function displayCurrentWeather(data) {
    const { main, weather, wind, clouds, sys, name, dt, timezone } = data;
    const tempRounded = Math.round(main.temp);
    const feelsLike = Math.round(main.feels_like);
    const windSpeed = (wind.speed * 3.6).toFixed(1); // Convert m/s to km/h
    const visibility = (data.visibility / 1000).toFixed(1);
    const weatherIcon = getWeatherIcon(weather[0].main);
    const updatedTime = new Date(dt * 1000).toLocaleString();

    document.getElementById('city-name').textContent = `${name}, ${sys.country}`;
    document.getElementById('weather-description').textContent = weather[0].main + ' - ' + weather[0].description.charAt(0).toUpperCase() + weather[0].description.slice(1);
    document.getElementById('updated-time').textContent = `Last updated: ${updatedTime}`;
    document.getElementById('temp').textContent = `${tempRounded}°C`;
    document.getElementById('weather-icon').textContent = weatherIcon;
    document.getElementById('humidity').textContent = `${main.humidity}%`;
    document.getElementById('wind-speed').textContent = `${windSpeed} km/h`;
    document.getElementById('feels-like').textContent = `${feelsLike}°C`;
    document.getElementById('pressure').textContent = `${main.pressure} hPa`;
    document.getElementById('visibility').textContent = `${visibility} km`;
    document.getElementById('uv-index').textContent = data.uvIndex ? `${Math.round(data.uvIndex * 10) / 10}` : 'N/A';

    currentWeatherSection.classList.remove('hidden');
}

// ==================== Display Forecast ====================
function displayForecast(data) {
    const forecastList = data.list.filter((item, index) => index % 8 === 0).slice(0, 5);
    const forecastHtml = forecastList
        .map((item) => {
            const date = new Date(item.dt * 1000);
            const day = date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
            const icon = getWeatherIcon(item.weather[0].main);
            const tempMax = Math.round(item.main.temp_max);
            const tempMin = Math.round(item.main.temp_min);

            return `
                <div class="forecast-card">
                    <div class="date">${day}</div>
                    <div class="icon">${icon}</div>
                    <div class="temp-range"><strong>${tempMax}°C</strong> / ${tempMin}°C</div>
                    <div class="condition">${item.weather[0].main}</div>
                    <div class="condition">💧 ${item.main.humidity}%</div>
                </div>
            `;
        })
        .join('');

    document.getElementById('forecast').innerHTML = forecastHtml;
    forecastSection.classList.remove('hidden');
}

// ==================== Display Additional Details ====================
function displayAdditionalDetails(data) {
    const { sys, coord, timezone } = data;
    const sunrise = new Date(sys.sunrise * 1000).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    const sunset = new Date(sys.sunset * 1000).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    const rainChance = data.forecastData?.list[0]?.clouds?.all || 0;
    const rainVolume = data.forecastData?.list[0]?.rain?.['3h'] || 0;

    document.getElementById('sunrise-time').textContent = `Sunrise: ${sunrise}`;
    document.getElementById('sunset-time').textContent = `Sunset: ${sunset}`;
    document.getElementById('rain-chance').textContent = `Cloud coverage: ${rainChance}%`;
    document.getElementById('rain-volume').textContent = `Expected rain: ${rainVolume} mm (next 3h)`;
    document.getElementById('coordinates').textContent = `${coord.lat.toFixed(2)}°, ${coord.lon.toFixed(2)}°`;
    document.getElementById('country').textContent = `Timezone: ${timezone / 3600} hours from UTC`;

    additionalDetails.classList.remove('hidden');
}

// ==================== Weather Icon Mapping ====================
function getWeatherIcon(condition) {
    const iconMap = {
        'Clear': '☀️',
        'Sunny': '☀️',
        'Clouds': '☁️',
        'Overcast': '☁️',
        'Mist': '🌫️',
        'Smoke': '💨',
        'Haze': '🌫️',
        'Dust': '💨',
        'Fog': '🌫️',
        'Sand': '💨',
        'Ash': '💨',
        'Squall': '💨',
        'Tornado': '🌪️',
        'Drizzle': '🌧️',
        'Rain': '🌧️',
        'Thunderstorm': '⛈️',
        'Snow': '❄️',
    };
    return iconMap[condition] || '🌤️';
}

// ==================== Recent Searches ====================
function addToRecentSearches(city) {
    recentSearches = recentSearches.filter((item) => item.toLowerCase() !== city.toLowerCase());
    recentSearches.unshift(city);
    if (recentSearches.length > MAX_RECENT) {
        recentSearches.pop();
    }
    localStorage.setItem('recentSearches', JSON.stringify(recentSearches));
    loadRecentSearches();
}

function loadRecentSearches() {
    const recentList = document.getElementById('recent-list');
    if (recentSearches.length === 0) {
        recentList.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: #6b7280;">No recent searches</p>';
        return;
    }

    recentList.innerHTML = recentSearches
        .map(
            (city) => `
                <div class="recent-item" onclick="searchRecentCity('${city}')">
                    ${city}
                </div>
            `
        )
        .join('');
}

function searchRecentCity(city) {
    searchInput.value = city;
    searchWeather();
}

// ==================== Theme Toggle ====================
function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    themeBtn.textContent = isDark ? '☀️' : '🌙';
}

function loadTheme() {
    const theme = localStorage.getItem('theme');
    if (theme === 'dark') {
        document.body.classList.add('dark-mode');
        themeBtn.textContent = '☀️';
    }
}

// ==================== UI Helpers ====================
function showLoading(show) {
    if (show) {
        loading.classList.remove('hidden');
    } else {
        loading.classList.add('hidden');
    }
}

function showError(message) {
    error.textContent = message;
    error.classList.remove('hidden');
    setTimeout(() => hideError(), 5000);
}

function hideError() {
    error.classList.add('hidden');
}

console.log('🌤️ Weather Dashboard loaded!');
console.log('⚠️ Remember to set your OpenWeatherMap API key in script.js');
