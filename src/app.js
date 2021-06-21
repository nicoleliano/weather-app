function date(timestamp) {
    let date = new Date(timestamp);
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day = days[date.getDay()];
    let hours = date.getHours();
    let minutes = date.getMinutes();

    if (hours > 12) {
      hours - 12;
    };

    return `${day} ${hours}:${minutes}`;
};

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tues", "Weds", "Thu", "Fri", "Sat"];

  return days[day];
};

function displayForecast(response) {
let forecast = response.data.daily;

  let forecastElement = document.querySelector("#weather-forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function(forecastDay, index) {
    if (index < 5) {
    forecastHTML = forecastHTML + 
    `
    <div class="col-2">
    <div class="forecast-date">
    ${formatDay(forecastDay.dt)}
    </div>
    <img src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" alt="" width="72">
        <div class="forecast-temp">
        <span class="forecast-temp-max">
        ${Math.round(forecastDay.temp.max)}°  
        </span>
        <span class="forecast-temp-min">
        ${Math.round(forecastDay.temp.min)}°
        </span>
        </div>
      </div>
      `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
  };


function getForecast(coord) {
  let apiKey = `1b4633177fe295b77ce7fe4928580db0`;
  let units = `metric`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coord.lat}&lon=${coord.lon}&appid=${apiKey}&units=${units}`;
  
  axios.get(apiUrl).then(displayForecast);
}

function displayWeather(response) {
  let cityName = document.querySelector("#city");
  let currentConditions = document.querySelector("#currentConditions");
  let dayElement = document.querySelector("#day");
  let humidityOut = document.querySelector('#humidity');
  let iconElement = document.querySelector('#icon');
  let temperature = document.querySelector("#currentTemperature");
  let windSpeed = document.querySelector("#wind");
  
  cityName.innerHTML = response.data.name;
  currentConditions.innerHTML = response.data.weather[0].description;
  dayElement.innerHTML = date(response.data.dt * 1000);
  humidityOut.innerHTML = Math.round(response.data.main.humidity);
  iconElement.setAttribute("alt", response.data.weather[0].description);
  iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  temperature.innerHTML = Math.round(response.data.main.temp);
  windSpeed.innerHTML = Math.round(response.data.wind.speed);

  getForecast(response.data.coord);
};

function search(city) {
  let apiKey = `1b4633177fe295b77ce7fe4928580db0`;
  let units = `metric`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(displayWeather);
};

function searchCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#searchForm");
  search(cityInput.value);
};

search("New York");

let form = document.querySelector("#search");
form.addEventListener("submit", searchCity);