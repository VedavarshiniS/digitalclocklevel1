// List of cities and their UTC offsets (hours)
const cities = [
  { name: "New York", offset: -4 },
  { name: "London", offset: 1 },
  { name: "Tokyo", offset: 9 },
  { name: "Sydney", offset: 10 },
  { name: "Dubai", offset: 4 }
];

const grid = document.getElementById("clock-grid");

// Create clock cards dynamically
cities.forEach(city => {
  const card = document.createElement("div");
  card.className = "clock-card";

  const label = document.createElement("div");
  label.className = "city-label";
  label.textContent = city.name;

  const timeElem = document.createElement("div");
  timeElem.className = "time";

  const dayNightElem = document.createElement("div");
  dayNightElem.className = "day-night";

  card.appendChild(label);
  card.appendChild(timeElem);
  card.appendChild(dayNightElem);
  grid.appendChild(card);

  // Store elements in city object
  city.timeElem = timeElem;
  city.dayNightElem = dayNightElem;
});

// Update clocks every second
function updateClocks() {
  const now = new Date();
  cities.forEach(city => {
    // Calculate local time
    const utc = now.getTime() + now.getTimezoneOffset() * 60000;
    const cityTime = new Date(utc + city.offset * 3600000);
    const h = String(cityTime.getHours()).padStart(2, '0');
    const m = String(cityTime.getMinutes()).padStart(2, '0');
    const s = String(cityTime.getSeconds()).padStart(2, '0');
    
    city.timeElem.textContent = `${h}:${m}:${s}`;
    
    // Day/night indicator
    const hour = cityTime.getHours();
    city.dayNightElem.textContent = (hour >= 6 && hour < 18) ? "☀️ Day" : "🌙 Night";
  });
}

// Initial call
updateClocks();
setInterval(updateClocks, 1000);

