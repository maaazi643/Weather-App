const fetchWeatherButton = document.querySelector(".fetchWeatherButton");

const apiKey = "d0d7df051cc6e6f5a2a9e229a1f07f43";

const getWeatherData = async () => {
  document.querySelector(".loadingMessage").style.display = "block";

  const cityName = document.querySelector(".cityInput").value;
  const apiURL = `http://api.openweathermap.org/data/2.5/weather?q=${cityName},uk&APPID=${apiKey}`;

  try {
    const res = await fetch(apiURL);
    console.log("Response status:", res.status);
    if (!res.ok) {
      displayError("Network response was not okay " + res.statusText);
    }
    const data = await res.json();
    displayWeatherData(data);
    console.log(data);
  } catch (error) {
    displayError("Failed to fetch Data: Check Internet Connection");
  } finally {
    document.querySelector(".loadingMessage").style.display = "none";
  }
};

const displayWeatherData = (data) => {
  const temperature = data.main.temp;
  const description = data.weather[0].description;
  const humidity = data.main.humidity;
  const feelsLike = data.main.feels_like;
  const pressure = data.main.pressure;
  const windSpeed = data.wind.speed;
  const maxTemp = data.main.temp_max;
  const minTemp = data.main.temp_min;

  const weatherDisplay = document.querySelector(".weatherDisplay");
  weatherDisplay.innerHTML = `
    <p><img src="https://img.icons8.com/color/48/000000/temperature.png" alt="Temperature"> Temperature: ${temperature} K</p>
    <p><img src="https://img.icons8.com/?size=100&id=W8fUZZSmXssu&format=png&color=000000" alt="Description"> Description: ${description}</p>
    <p><img src="https://img.icons8.com/color/48/000000/humidity.png" alt="Humidity"> Humidity: ${humidity}%</p>
    <p><img src="https://img.icons8.com/color/48/000000/temperature.png" alt="Feels Like"> Feels like: ${feelsLike}°C</p>
    <p><img src="https://img.icons8.com/color/48/000000/pressure.png" alt="Pressure"> Pressure: ${pressure}</p>
    <p><img src="https://img.icons8.com/color/48/000000/wind.png" alt="Wind Speed"> Wind Speed: ${windSpeed} m/s</p>
    <p><img src="https://img.icons8.com/color/48/000000/temperature.png" alt="Max Temperature"> Max Temperature: ${maxTemp} K</p>
    <p><img src="https://img.icons8.com/color/48/000000/temperature.png" alt="Min Temperature"> Min Temperature: ${minTemp} K</p>
  `;
};

const displayError = (message) => {
  const weatherDisplay = document.querySelector(".weatherDisplay");
  weatherDisplay.innerHTML = `Error: ${message}`;
};

fetchWeatherButton.addEventListener("click", getWeatherData);
