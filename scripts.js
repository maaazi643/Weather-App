const fetchWeatherButton = document.querySelector(".fetchWeatherButton");

//Get City name

const apiKey = "d0d7df051cc6e6f5a2a9e229a1f07f43";

const getWeatherData = async () => {
  //Get City name
  const cityName = document.querySelector(".cityInput").value;
  const apiURL = `http://api.openweathermap.org/data/2.5/weather?q=${cityName},uk&APPID=${apiKey}`;
  try {
    const res = await fetch(apiURL);
    console.log("Response status:", res.status);
    if (!res.ok) {
      throw new Error("Network response was not okay " + res.statusText);
    }
    const data = await res.json();
    displayWeatherData(data);
    console.log(data);
  } catch (error) {
    // throw new Error('Failed to fetch Data:' + error)
    console.error(error);
  }
};

const displayWeatherData = (data) => {
  //Extract Weather Information
  const temperature = data.main.temp;
  const description = data.weather[0].description;
  const humidity = data.main.humidity;

  //Update HTML to display weatherInformation
  const weatherInformation = document.querySelector(".weatherDisplay");
  weatherInformation.innerHTML = `
    <p>Temperature: ${temperature} K</p>
    <p>Description: ${description}</p>
    <p>Humidity: ${humidity}%</p>
  `;
};



fetchWeatherButton.addEventListener("click", getWeatherData);
