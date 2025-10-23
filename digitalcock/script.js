function updateClock() {
  const clock = document.getElementById('clock');
  const now = new Date();

  let hours = now.getHours().toString().padStart(2, '0');
  let minutes = now.getMinutes().toString().padStart(2, '0');
  let seconds = now.getSeconds().toString().padStart(2, '0');

  clock.innerHTML = `${hours}<span class="blink">:</span>${minutes}<span class="blink">:</span>${seconds}`;
}

// Initial update and repeat every second
updateClock();
setInterval(updateClock, 1000);
