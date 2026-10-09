const form = document.querySelector("#form");
const cityInput = document.querySelector("#city");
const result = document.querySelector("#result");

async function getWeather(city) {
  result.textContent = "Loading...";

  try {
    const geoResponse = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`
    );
    const geo = await geoResponse.json();

    if (!geo.results?.length) {
      result.textContent = "City not found.";
      return;
    }

    const place = geo.results[0];
    const weatherResponse = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${place.latitude}&longitude=${place.longitude}&current=temperature_2m,wind_speed_10m`
    );
    const weather = await weatherResponse.json();

    result.innerHTML = `
      <h2>${escapeHtml(place.name)}, ${escapeHtml(place.country)}</h2>
      <p>Temperature: ${weather.current.temperature_2m}°C</p>
      <p>Wind: ${weather.current.wind_speed_10m} km/h</p>
    `;
  } catch (error) {
    console.error(error);
    result.textContent = "Something went wrong. Check your internet connection.";
  }
}

function escapeHtml(value) {
  const div = document.createElement("div");
  div.textContent = value;
  return div.innerHTML;
}

form.addEventListener("submit", event => {
  event.preventDefault();
  getWeather(cityInput.value.trim());
});
