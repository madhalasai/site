document.addEventListener("DOMContentLoaded", () => {
const openBtn = document.getElementById("open-letter");
const modal = document.getElementById("modal");
const closeBtn = document.getElementById("close-modal");

// open modal
openBtn.addEventListener("click", () => {
modal.classList.remove("hidden");
});

// close modal
closeBtn.addEventListener("click", () => {
modal.classList.add("hidden");
});

// floating hearts + pandas
const layer = document.getElementById("animation-layer");
const emojis = ["❤️", "💕", "🐼", "💖", "💓", "🐼"];

function createFloating() {
const span = document.createElement("span");
span.classList.add("floating");
span.innerText = emojis[Math.floor(Math.random() * emojis.length)];
span.style.left = Math.random() * 100 + "vw";
span.style.fontSize = (Math.random() * 24 + 20) + "px";
span.style.animationDuration = (5 + Math.random() * 5) + "s";
layer.appendChild(span);

```
// remove after animation
setTimeout(() => {
  span.remove();
}, 10000);
```

}

setInterval(createFloating, 800);
});
// plane drag + drop to SF
const plane = document.getElementById("plane");
const mapContainer = document.getElementById("map-container");
const destination = document.getElementById("destination");
const seeYou = document.getElementById("see-you");

let offsetX, offsetY;

plane.addEventListener("dragstart", (e) => {
  offsetX = e.offsetX;
  offsetY = e.offsetY;
});

mapContainer.addEventListener("dragover", (e) => {
  e.preventDefault();
});

mapContainer.addEventListener("drop", (e) => {
  e.preventDefault();
  const rect = mapContainer.getBoundingClientRect();
  const x = e.clientX - rect.left - offsetX;
  const y = e.clientY - rect.top - offsetY;

  // Move plane
  plane.style.left = x + "px";
  plane.style.top = y + "px";

  // Check if close to SF spot
  const sfX = rect.width * 0.1;   // SF ~ left side
  const sfY = rect.height * 0.75; // lower area
  if (Math.abs(x - sfX) < 60 && Math.abs(y - sfY) < 60) {
    destination.style.background = "red";
    confettiEffect();
    seeYou.classList.remove("hidden");
  }
});

// Simple confetti effect
function confettiEffect() {
  for (let i = 0; i < 100; i++) {
    const conf = document.createElement("div");
    conf.innerText = "🎊";
    conf.style.position = "absolute";
    conf.style.left = Math.random() * 100 + "vw";
    conf.style.top = "-10px";
    conf.style.fontSize = "20px";
    conf.style.animation = `fall ${3 + Math.random()*2}s linear forwards`;
    document.body.appendChild(conf);
    setTimeout(() => conf.remove(), 5000);
  }
}

// confetti animation
const style = document.createElement("style");
style.textContent = `
@keyframes fall {
  to { transform: translateY(110vh); opacity: 0; }
}`;
document.head.appendChild(style);
