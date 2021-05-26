let now = new Date();

let h2 = document.querySelector("h2");

let date = now.getDate();
let hours = now.getHours();
let minutes = now.getMinutes();

let days = ["Sunday", "Monday","Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let day = days[now.getDay()];

let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "Novemeber", "December"];
let month = months[now.getMonth()];

h2.innerHTML = `${day}, <br> ${month} ${date}, ${hours}:${minutes}`;

function displayWeatherCondition(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temp").innerHTML = Math.round(response.data.main.temp);
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);
  document.querySelector("#description").innerHTML = response.data.weather[0].main;
};

function searchCity(city) {
  let apiKey = "1b4633177fe295b77ce7fe4928580db0";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayWeatherCondition);
};

function handleSubmit() {
  let city = document.querySelector("#search-input").value;
  searchCity(city);
};

function searchLocation(position) {
  let apiKey = "1b4633177fe295b77ce7fe4928580db0";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=imperial`;
  
  axios.get(apiUrl).then(displayWeatherCondition);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

let currentButton = document.querySelector("#current-button");
currentButton.addEventListener("click", getCurrentLocation);

searchCity("Rome");