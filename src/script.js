function formatDate(timestamp){
 let now = new Date(timestamp);
 let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let day = days[now.getDay()];
//let currentDate = document.querySelector("#date");
//currentDate.innerHTML = formatDate();
return `${day} ${formatHours(timestamp)}`
}





function formatHours(timestamp){
 let now = new Date(timestamp);
  let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
  return `${hours}:${minutes}`;

}


function displayWeatherSpecyfic(response) {
  document.querySelector("#date").innerHTML = formatDate(response.data.dt *1000);
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#current-temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
  document.querySelector(
    "#humidity"
  ).innerHTML = `Humidity: ${response.data.main.humidity}%`;
  document.querySelector("#feels-like").innerHTML = `Feels like: ${Math.round(
    response.data.main.feels_like
  )}°`;
  document.querySelector("#wind").innerHTML = `Wind speed: ${Math.round(
    response.data.wind.speed
  )} km/h`;
  let iconElement= document.querySelector("#weather-emoji");
  iconElement.setAttribute("src" ,`http://openweathermap.org/img/wn/${response.data.weather[0].icon}.png`);
iconElement.setAttribute("alt", response.data.weather[0].description);
}


function displayForecast(response){
  console.log(response.data);
  let forecastElement= document.querySelector("#forecast");
  let  forecast = null;
  forecastElement.innerHTML = null;

  for ( let index = 0; index < 6; index++){
 forecast = response.data.list[index];
 forecastElement.innerHTML += `
                <div class="col- 2">
                <h3>${formatHours(forecast.dt*1000)}</h3>
                <img src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}.png" id="forecast-icon" />
                <div class= "weather-forecast-temperature">
                    <strong>${Math.round(forecast.main.temp_max)}°</strong>| ${Math.round(forecast.main.temp_min)}°
                </div>
                </div>
                `
}
}



function searchCity(city) {
  let apiKey = "11b09ae39e1971203074e458432047c9";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherSpecyfic);

  apiUrl= `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function submitedCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  let city = cityInput.value;
  //if (city.value === undefined) {
    //alert("Sorry we don't know this place. Please type another city");}

  searchCity(city);
}


function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#current-temperature");
  let temperature = temperatureElement.innerHTML;
  temperatureElement.innerHTML = Math.round(temperature * 1.8 + 32);
}

function convertToCelcius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#current-temperature");
  let temperature = temperatureElement.innerHTML;
  temperatureElement.innerHTML = Math.round((temperature - 32) / 1.8);
}

function searchPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "11b09ae39e1971203074e458432047c9";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeatherSpecyfic);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchPosition);
}


let celcius = document.querySelector("#celcius-link");
celcius.addEventListener("click", convertToCelcius);
let fahrenheit = document.querySelector("#fahrenheit-link");
fahrenheit.addEventListener("click", convertToFahrenheit);


let searchForm = document.querySelector("#search-engine");
searchForm.addEventListener("submit", submitedCity);


let currentLocation = document.querySelector("#current");
currentLocation.addEventListener("click", getCurrentLocation); 

searchCity("Warsaw");
