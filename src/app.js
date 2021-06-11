function displayWeather(response) {
  let temperature = document.querySelector("#currentTemperature");
  temperature.innerHTML = Math.round(response.data.main.temp);
  
  let cityName = document.querySelector("#city");
  cityName.innerHTML = response.data.name;

  let currentConditions = document.querySelector("#currentConditions");
  currentConditions.innerHTML = response.data.weather[0].description;

  let windSpeed = document.querySelector("#wind");
  windSpeed.innerHTML = Math.round(response.data.wind.speed);
  
  let humidityOut = document.querySelector('#humidity');
  humidityOut.innerHTML = Math.round(response.data.main.humidity);
  
  console.log(response);
}

let apiKey = `1b4633177fe295b77ce7fe4928580db0`;
let city = `New York`;
let units = `imperial`;
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

console.log(apiUrl);
axios.get(apiUrl).then(displayWeather);