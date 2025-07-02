const weatherform = document.querySelector(".weatherform");
const cityinput = document.querySelector(".cityinput");
const card = document.querySelector(".card");
const apikey = "c1f233174ebecb8e2f6a61a278d33326"; // Your OpenWeatherMap API Key

weatherform.addEventListener("submit", async (event) => {
  event.preventDefault();

  const city = cityinput.value.trim();
  if (city === "") {
    displayError("Please enter a city name.");
    return;
  }

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`
    );

    if (!response.ok) {
      throw new Error("City not found");
    }

    const data = await response.json();
    displayWeatherInfo(data);
  } catch (error) {
    displayError(error.message);
  }
});

function displayWeatherInfo(data) {
  const { name, main, weather } = data;
  const temp = Math.round(main.temp);
  const description = weather[0].description;
  const icon = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;

  card.innerHTML = `
    <h2>${name}</h2>
    <img src="${icon}" alt="${description}" />
    <h3>${temp}°C</h3>
    <p>${description}</p>
  `;
  card.style.display = "block";
}

function displayError(message) {
  card.innerHTML = `<p style="color:red;">${message}</p>`;
  card.style.display = "block";
}
