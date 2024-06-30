const api = {
  key: "fcc8de7015bbb202209bbf0261babf4c",
  base: "https://api.openweathermap.org/data/2.5/"
}

document.addEventListener('DOMContentLoaded', () => {
  const searchBox = document.querySelector('.search-box');
  const searchBtn = document.querySelector('.search-btn');
  const toggleModeBtn = document.querySelector('.toggle-mode-btn');
  const container = document.querySelector('.container');
  const errorMessage = document.querySelector('.error-message');
  const appWrap = document.querySelector('.app-wrap');

  // Search on 'Enter' key press
  searchBox.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      const query = searchBox.value.trim();
      if (query) {
        fetchWeatherData(query);
      }
    }
  });

  // Search on button click
  searchBtn.addEventListener('click', () => {
    const query = searchBox.value.trim();
    if (query) {
      fetchWeatherData(query);
    }
  });

  // Toggle dark and bright mode
  toggleModeBtn.addEventListener('click', () => {
    appWrap.classList.toggle('dark-mode');
  });

  // Fetch weather data function with error handling
  function fetchWeatherData(query) {
    fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('The city name is invalid !');
        }
        return response.json();
      })
      .then(displayResults)
      .catch(error => displayError(error.message));
  }

  // Display weather data
  function displayResults(weather) {
    errorMessage.innerText = ''; // Clear any previous error messages
    let city = document.querySelector('.location .city');
    city.innerText = `${weather.name}, ${weather.sys.country}`;

    let now = new Date();
    let date = document.querySelector('.location .date');
    date.innerText = dateBuilder(now);

    let temp = document.querySelector('.current .temp');
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;

    let feelsLike = document.querySelector('.current .feels-like');
    feelsLike.innerHTML = `Feels like: ${Math.round(weather.main.feels_like)}<span>°c</span>`; 

    let weather_el = document.querySelector('.current .weather');
    weather_el.innerText = weather.weather[0].main;

    let humidity = document.querySelector('.current .humidity');
    humidity.innerText = `Humidity: ${weather.main.humidity}%`; 

    container.style.display = 'block';
  }

  // Display error message
  function displayError(message) {
    errorMessage.innerText = message;
    container.style.display = 'none';
  }
//date formate
  function dateBuilder(d) {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  }
});
