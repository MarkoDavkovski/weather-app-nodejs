const weatherForm = document.getElementById("weatherForm");
const forecastInfo = document.getElementById("forecastInfo");
const errorMessage = document.getElementById("errorMessage");
const loadingMessage = document.getElementById("loadingMessage");

const displayForecast = (data) => {
  if (data.error) {
    errorMessage.textContent = data.error;
    errorMessage.style.display = "block";
    forecastInfo.style.display = "none";
    loadingMessage.style.display = "none";
  } else {
    loadingMessage.style.display = "none";
    errorMessage.style.display = "none";
    forecastInfo.style.display = "block";
    forecastInfo.textContent = `Weather: ${data.weather_descriptions} | Temperature: ${data.temperature} | Feels Like : ${data.feelsLike}`;
  }
};

const getForecast = async (city) => {
  try {
    loadingMessage.style.display = "block";
    errorMessage.style.display = "none";
    forecastInfo.style.display = "none";

    const response = await fetch(
      `https://weather-app-nodejs-three.vercel.app/weather?city=${city}`
    );
    debugger;
    if (!response.ok) {
      throw new Error(`Error, city not found: ${city}`);
    }
    const forecast = await response.json();
    displayForecast(forecast);
  } catch (error) {
    loadingMessage.style.display = "none";
    errorMessage.textContent = "Error fetching forecast: " + error.message;
    errorMessage.style.display = "block";
    forecastInfo.style.display = "none";
  }
};

weatherForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const cityInput = document.getElementById("cityInput");
  getForecast(cityInput.value);
});
