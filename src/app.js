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
};

function search(city) {
  let apiKey = `1b4633177fe295b77ce7fe4928580db0`;
  let units = `imperial`;
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