const citySelect = document.getElementById("city-select");
const temperatureDiv = document.getElementById("temperature");

citySelect.addEventListener("change", () => {
  const city = citySelect.value;
  if (city) {
    fetchTemperature(city);
  } else {
    temperatureDiv.textContent = "";
  }
});

function fetchTemperature(city) {
  const apiKey = 1;
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

  fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Error fetching data: ${response.statusText}`);
      }
      return response.json();
    })
    .then((data) => {
      const temp = data.main.temp.toFixed(1);
      const weatherState = data.weather[0].description;
      temperatureDiv.innerHTML = `
                <p>Current temperature in ${city}: <strong>${temp}°C</strong></p>
                <p>Weather: <strong>${weatherState}</strong></p>
            `;
    })
    .catch((error) => {
      console.error("Error:", error);
      temperatureDiv.textContent =
        "Failed to retrieve temperature data. Please try again later.";
    });
}
