// Floating Hearts
function createHeart() {
  const heart = document.createElement("div");
  heart.classList.add("heart");
  heart.innerText = "❤️";
  heart.style.left = Math.random() * 100 + "vw";
  heart.style.animationDuration = (2 + Math.random() * 3) + "s";
  document.body.appendChild(heart);
  setTimeout(() => heart.remove(), 5000);
}
setInterval(createHeart, 800);

// Floating Pandas
function createPanda() {
  const panda = document.createElement("div");
  panda.classList.add("panda");
  panda.innerText = "🐼";
  panda.style.left = Math.random() * 100 + "vw";
  panda.style.animationDuration = (4 + Math.random() * 4) + "s";
  document.body.appendChild(panda);
  setTimeout(() => panda.remove(), 8000);
}
setInterval(createPanda, 2000);

// Modal Letter
const openBtn = document.getElementById("open-letter");
const modal = document.getElementById("modal");
const closeBtn = document.getElementById("close-modal");

openBtn.addEventListener("click", () => modal.classList.remove("hidden"));
closeBtn.addEventListener("click", () => modal.classList.add("hidden"));

// Plane Drag Game
const planeEl = document.getElementById("plane");
const mapEl = document.getElementById("map-section");
const seeYouEl = document.getElementById("see-you");

// NJ and SF coordinates in pixels for plane drag detection
const njCoords = { x: 650, y: 150 };
const sfCoords = { x: 150, y: 250 }; // approximate on map container

let isDragging = false;
planeEl.addEventListener("mousedown", () => {
  isDragging = true;
  planeEl.style.cursor = "grabbing";
});
document.addEventListener("mouseup", () => {
  if (isDragging) {
    isDragging = false;
    planeEl.style.cursor = "grab";
    const rect = planeEl.getBoundingClientRect();
    if (Math.abs(rect.left - sfCoords.x) < 50 && Math.abs(rect.top - sfCoords.y) < 50) {
      confettiEffect();
      seeYouEl.classList.remove("hidden");
    }
  }
});
document.addEventListener("mousemove", (e) => {
  if (isDragging) {
    const rect = mapEl.getBoundingClientRect();
    planeEl.style.left = (e.clientX - rect.left - 20) + "px";
    planeEl.style.top = (e.clientY - rect.top - 20) + "px";
  }
});

// Confetti Effect
function confettiEffect() {
  for (let i = 0; i < 100; i++) {
    const confetti = document.createElement("div");
    confetti.classList.add("confetti");
    confetti.style.left = Math.random() * 100 + "vw";
    confetti.style.color = ["#ff69b4","#ff1493","#ffd700","#00ffff"][Math.floor(Math.random()*4)];
    document.body.appendChild(confetti);
    confetti.animate([{ transform: 'translateY(0)' }, { transform: 'translateY(110vh)' }], { duration: 3000 + Math.random()*2000 });
    setTimeout(() => confetti.remove(), 5000);
  }
}

// =======================
// Leaflet Map
// =======================
const map = L.map('map').setView([39.8283, -98.5795], 4); // center US
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// NJ Marker
L.marker([40.0583, -74.4057]).addTo(map).bindPopup('New Jersey').openPopup();
// SF Marker
L.marker([37.7749, -122.4194]).addTo(map).bindPopup('San Francisco').openPopup();
