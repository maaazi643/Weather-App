const fetchWeatherButton = document.querySelector('.fetchWeatherButton');

fetchWeatherButton.addEventListener('click', getWeatherData)

function getWeatherData() {
  //Get City name
  const cityName = document.querySelector('.cityInput').value

  //Make API Call
  const apiKey = 'd0d7df051cc6e6f5a2a9e229a1f07f43'
  const apiURL = `api.openweathermap.org/data/2.5/weather?q=${cityName},uk&APPID=${apiKey}`

}
