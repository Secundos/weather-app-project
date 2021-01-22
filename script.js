//obecny czas
let now = new Date();
let currentDate = document.querySelector("#date");
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
let hours = now.getHours();
let minutes = now.getMinutes();
if (hours < 10) {
  hours = `0${hours}`;
}
if (minutes < 10) {
  minutes = `0${minutes}`;
}
if (hours < 12) {
  currentDate.innerHTML = `${day} ${hours}:${minutes}AM`;
} else {
  currentDate.innerHTML = `${day} ${hours}:${minutes}PM`;
}

//parametry brane z API w czasie rzeczywistym
function displayWeatherSpecyfic(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#current-temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
  document.querySelector(
    "#humidity"
  ).innerHTML = `Humidity: ${response.data.main.humidity}%`;
  document.querySelector("#feels-like").innerHTML = `Feels like: ${Math.round(
    response.data.main.feels_like
  )}°`;
  document.querySelector("#wind").innerHTML = `Wind speed is ${Math.round(
    response.data.wind.speed
  )} km/h`;
}

//dopiero tą funkcję łączę z api żeby móc wybrać deafultowe miasto na którym otworzy się strona
function searchCity(city) {
  let apiKey = "11b09ae39e1971203074e458432047c9";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherSpecyfic);
}
//wyświetlanie wpisanego miasta oraz wołanie do funkcji search połączonej a API
function submitedCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  let city = cityInput.value;
  //if (city.value === undefined) {
    //alert("Sorry we don't know this place. Please type another city");}

  searchCity(city);
}

//conwerter na F
function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#current-temperature");
  let temperature = temperatureElement.innerHTML;
  temperatureElement.innerHTML = Math.round(temperature * 1.8 + 32);
}
//conwerter na C
function convertToCelcius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#current-temperature");
  let temperature = temperatureElement.innerHTML;
  temperatureElement.innerHTML = Math.round((temperature - 32) / 1.8);
}
//funkcja połączona z API po to by po kliknięciu guzika wyświetlała się lokalizacja bieżąca
function searchPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "11b09ae39e1971203074e458432047c9";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeatherSpecyfic);
}
// w funkcji zamykamy dostęp do bieżącej lokalizacji żeby nie była wołana od razu po załadowaniu
//strony a po klknieciu guzika current
function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchPosition);
}

//event dla przeliczania jednostek
let celcius = document.querySelector("#celcius-link");
celcius.addEventListener("click", convertToCelcius);
let fahrenheit = document.querySelector("#fahrenheit-link");
fahrenheit.addEventListener("click", convertToFahrenheit);

//wyjęcie wpisywania miasta z logiki
let searchForm = document.querySelector("#search-engine");
searchForm.addEventListener("submit", submitedCity);

//wyjęcie z logiki guzika do bieącej lokalizacji
let currentLocation = document.querySelector("#current");
currentLocation.addEventListener("click", getCurrentLocation); //po kliknięciu chcę żeby było widoczne miasto zgodne z lat lon

//wołam do funkcji search żeby Warszawa była defaultowym miastem. JEst na zewnątrz
//jakiejkolwiek funkcji więc jest wołana za każdym przeładowaniem strony
searchCity("Warsaw");
