const fetchWeatherButton = document.querySelector(".fetchWeatherButton");

const apiKey = "bda58366b651febf048518ac5ca7540b";

const getWeatherData = async () => {
  const loadingMessage = document.querySelector(".loadingMessage");
  loadingMessage.style.display = "block";

  const cityName = document.querySelector(".cityInput").value.trim();
  if (!cityName) {
    displayError("Please enter a city name.");
    loadingMessage.style.display = "none";
    return;
  }

  const apiURL = `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&APPID=${apiKey}`;

  try {
    const res = await fetch(apiURL);
    console.log("Response status:", res.status);
    if (!res.ok) {
      displayError("City not found. Input a valid city");
      loadingMessage.style.display = "none";
      return;
    }
    const data = await res.json();
    displayWeatherData(data);
    console.log(data)
  } catch (error) {
    displayError("Failed to fetch data. Check internet connection");
  } finally {
    loadingMessage.style.display = "none";
  }
};

const displayWeatherData = (data) => {
  const name = data.name
  const temperature = data.main.temp;
  const description = data.weather[0].description;
  const humidity = data.main.humidity;
  const feelsLike = data.main.feels_like;
  const pressure = data.main.pressure;
  const windSpeed = data.wind.speed;
  const maxTemp = data.main.temp_max;
  const minTemp = data.main.temp_min;

  const weatherInformation = document.querySelector(".weatherDisplay");
  weatherInformation.innerHTML = `
    <div class="weatherInfo">
      <h2>${name}</h2>
      <h3><img src="https://img.icons8.com/color/48/000000/temperature.png" alt="Temperature"> Temperature: ${temperature} K</h3>
      <h3><img src="https://img.icons8.com/?size=100&id=W8fUZZSmXssu&format=png&color=000000" alt="Description"> Description: ${description}</h3>
      <h3><img src="https://img.icons8.com/color/48/000000/humidity.png" alt="Humidity"> Humidity: ${humidity}%</h3>
      <h3><img src="https://img.icons8.com/color/48/000000/temperature.png" alt="Feels Like"> Feels like: ${feelsLike}°C</h3>
      <h3><img src="https://img.icons8.com/color/48/000000/pressure.png" alt="Pressure"> Pressure: ${pressure}</h3>
      <h3><img src="https://img.icons8.com/color/48/000000/wind.png" alt="Wind Speed"> Wind Speed: ${windSpeed} m/s</h3>
      <h3><img src="https://img.icons8.com/color/48/000000/temperature.png" alt="Max Temperature"> Max Temperature: ${maxTemp} K</h3>
      <h3><img src="https://img.icons8.com/color/48/000000/temperature.png" alt="Min Temperature"> Min Temperature: ${minTemp} K</h3>
    </div>
  `;
};

const displayError = (message) => {
  const weatherDisplay = document.querySelector(".weatherDisplay");
  weatherDisplay.innerHTML = `<div class="error">${message}</div>`;
};

fetchWeatherButton.addEventListener("click", getWeatherData);
