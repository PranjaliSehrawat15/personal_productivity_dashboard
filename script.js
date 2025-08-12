
// Analog + Digital Clock
function displayTime() {
  const now = new Date();
  const hh = now.getHours();
  const mm = now.getMinutes();
  const ss = now.getSeconds();

  const hRotation = 30 * hh + mm / 2;
  const mRotation = 6 * mm;
  const sRotation = 6 * ss;

  document.getElementById('hour').style.transform = `rotate(${hRotation}deg)`;
  document.getElementById('min').style.transform = `rotate(${mRotation}deg)`;
  document.getElementById('sec').style.transform = `rotate(${sRotation}deg)`;

  document.getElementById('digital-time').textContent =
    `${String(hh).padStart(2, '0')}:${String(mm).padStart(2, '0')}:${String(ss).padStart(2, '0')}`;
}
setInterval(displayTime, 1000);
displayTime();

// To-Do List
function addTask() {
  const input = document.getElementById("task-desc");
  const taskText = input.value.trim();
  if (!taskText) return;

  const li = document.createElement("li");
  li.innerHTML = `
    <input type="checkbox" onchange="toggleTask(this)">
    <span>${taskText}</span>
    <button class="delete-btn" onclick="this.parentElement.remove()">X</button>
  `;
  document.getElementById("task-list").appendChild(li);
  input.value = "";
}
function toggleTask(checkbox) {
  const span = checkbox.nextElementSibling;
  span.style.textDecoration = checkbox.checked ? "line-through" : "none";
}


  function fetchWeatherByLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(position => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
  
        // Get city name using Nominatim reverse geocoding
        fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`)
          .then(res => res.json())
          .then(locationData => {
            const city = locationData.address.city || locationData.address.town || locationData.address.village || "Your location";
  
            // Get weather from Open-Meteo
            fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`)
              .then(res => res.json())
              .then(data => {
                const weather = data.current_weather;
                const description = getWeatherDescription(weather.weathercode);
                document.getElementById('weather').textContent =
                  `📍 ${city} — 🌡️ ${weather.temperature}°C | ${description}`;
                  
              });
          });
      }, error => {
        document.getElementById('weather').textContent = "⚠️ Location access denied.";
      });
    } else {
      document.getElementById('weather').textContent = "⚠️ Geolocation not supported.";
    }
  }
  
  function getWeatherDescription(code) {
    const map = {
      0: "Clear",
      1: "Mainly clear",
      2: "Partly cloudy",
      3: "Overcast",
      45: "Fog",
      48: "Freezing fog",
      51: "Light drizzle",
      61: "Light rain",
      80: "Light showers",
      95: "Thunderstorm",
      99: "Severe storm"
    };
    return map[code] || "Unknown";
  }
  
  fetchWeatherByLocation();
  
// Quotes
const localQuotes = [
  { content: "Be yourself; everyone else is already taken.", author: "Oscar Wilde" },
  { content: "Simplicity is the ultimate sophistication.", author: "Leonardo da Vinci" }
  ];
  
  function fetchQuote() {
  const quoteEl = document.getElementById("quote");
  const random = localQuotes[Math.floor(Math.random() * localQuotes.length)];
  quoteEl.textContent = `“${random.content}” — ${random.author}`;
  }


// Pomodoro
let interval, timeLeft = 1500;
function updateTimerDisplay() {
  const min = Math.floor(timeLeft / 60);
  const sec = timeLeft % 60;
  document.getElementById('timer').textContent =
    `${String(min).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
}
function startTimer() {
  if (interval) return;
  interval = setInterval(() => {
    if (timeLeft > 0) {
      timeLeft--;
      updateTimerDisplay();
    } else {
      clearInterval(interval);
      interval = null;
      alert("Time's up!");
    }
  }, 1000);
}
function resetTimer() {
  clearInterval(interval);
  interval = null;
  timeLeft = 1500;
  updateTimerDisplay();
}
updateTimerDisplay();
