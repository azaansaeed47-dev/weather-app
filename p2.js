document.addEventListener("DOMContentLoaded", () => {
  const cityInput = document.getElementById("city-input");
  const button = document.getElementById("btn1");
  const weat = document.getElementById("weatherinfo");
  const cityN = document.getElementById("city-name");
  const temp = document.getElementById("temp1");
  const desc = document.getElementById("descrip");
  const err = document.getElementById("error");

  const API_KEY = "265693c0d98988db08e53cde0b7d47df";

  button.addEventListener("click", async () => {
    const city = cityInput.value.trim();
    if (!city) return;

    // it may throw an error
    // server database is always in an continent

    try {
      const weat = await fetchWeatherData(city);
      displayWeatherData(weat);
    } catch (error) {
      showError();
    }
  });

  async function fetchWeatherData(city) {
    // get the data

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
    const response = await fetch(url);
    console.log("RESPONSE", response);
    if (!response.ok) {
      throw new Error("city not found");
    }

    const data = await response.json();
    return data;
  }

  function displayWeatherData(data) {
    // display
    console.log(data);
    const { name, main, weather } = data;
    cityN.textContent = name;
    temp.textContent = `Tempertaure: ${main.temp}`;
    desc.textContent = `weather: ${weather[0].description}`;

    const icon = weather[0].icon;
    console.log(weather[0]);
    const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;
    document.getElementById("weather-icon").src = iconUrl;

    // hidden unlock

    weat.classList.remove("hidden");
    err.classList.add("hidden");
  }

  function showError() {
    weat.classList.add("hidden");
    err.classList.remove("hidden");
  }
});
