// Digits segment map for 7-segment layout
const SEGMENTS = [
  [1,1,1,1,1,1,0], // 0
  [0,1,1,0,0,0,0], // 1
  [1,1,0,1,1,0,1], // 2
  [1,1,1,1,0,0,1], // 3
  [0,1,1,0,0,1,1], // 4
  [1,0,1,1,0,1,1], // 5
  [1,0,1,1,1,1,1], // 6
  [1,1,1,0,0,0,0], // 7
  [1,1,1,1,1,1,1], // 8
  [1,1,1,1,0,1,1]  // 9
];

const clock = document.getElementById("clock");

function createDigit() {
  const svgNS = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(svgNS, "svg");
  svg.classList.add("digit");
  svg.setAttribute("viewBox", "0 0 100 200");

  const defs = document.createElementNS(svgNS, "defs");
  defs.innerHTML = `
    <linearGradient id="gradAnimated" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%">
        <animate attributeName="stop-color" values="#48f;#b26eff;#48f" dur="4s" repeatCount="indefinite"/>
      </stop>
      <stop offset="100%">
        <animate attributeName="stop-color" values="#b26eff;#48f;#b26eff" dur="4s" repeatCount="indefinite"/>
      </stop>
    </linearGradient>`;
  svg.appendChild(defs);

  // Segment coordinates
  const segPaths = [
    "M20 10 L80 10 L70 20 L30 20 Z",   // a
    "M80 10 L90 20 L90 90 L80 100 L70 90 L70 20 Z", // b
    "M80 100 L90 110 L90 180 L80 190 L70 180 L70 110 Z", // c
    "M20 190 L80 190 L70 180 L30 180 Z", // d
    "M10 100 L20 110 L20 180 L10 170 Z", // e
    "M10 10 L20 20 L20 90 L10 80 Z",     // f
    "M20 100 L30 90 L70 90 L80 100 L70 110 L30 110 Z" // g
  ];

  segPaths.forEach(pathData => {
    const path = document.createElementNS(svgNS, "path");
    path.setAttribute("d", pathData);
    path.classList.add("segment");
    svg.appendChild(path);
  });

  return svg;
}

// Create clock digits + colon
const elements = [];
for (let i = 0; i < 6; i++) {
  if (i === 2 || i === 4) {
    const colon = document.createElement("div");
    colon.classList.add("colon");
    colon.innerHTML = `<div class="colon-dot"></div><div class="colon-dot"></div>`;
    clock.appendChild(colon);
  }
  const digit = createDigit();
  clock.appendChild(digit);
  elements.push(digit);
}

function updateClock() {
  const now = new Date();
  const h = String(now.getHours()).padStart(2, "0");
  const m = String(now.getMinutes()).padStart(2, "0");
  const s = String(now.getSeconds()).padStart(2, "0");
  const timeStr = h + m + s;

  elements.forEach((digit, idx) => {
    const num = parseInt(timeStr[idx]);
    const segments = digit.querySelectorAll(".segment");
    segments.forEach((seg, i) => {
      seg.classList.toggle("on", SEGMENTS[num][i]);
    });
  });
}

setInterval(updateClock, 1000);
updateClock();
