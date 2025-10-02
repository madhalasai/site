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
const mapContainer = document.getElementById("map-container");
const seeYouEl = document.getElementById("see-you");

let isDragging = false;
planeEl.addEventListener("mousedown", () => {
  isDragging = true;
  planeEl.style.cursor = "grabbing";
});
document.addEventListener("mouseup", () => { 
  if(isDragging) {
    isDragging = false; 
    planeEl.style.cursor = "grab";
    // When plane is near center of map, show confetti
    const planeRect = planeEl.getBoundingClientRect();
    const mapRect = mapContainer.getBoundingClientRect();
    const mapCenterX = mapRect.left + mapRect.width/2;
    const mapCenterY = mapRect.top + mapRect.height/2;
    if(Math.abs(planeRect.left - mapCenterX) < 50 && Math.abs(planeRect.top - mapCenterY) < 50){
      confettiEffect();
      seeYouEl.classList.remove("hidden");
    }
  }
});
document.addEventListener("mousemove", (e) => {
  if(!isDragging) return;
  const rect = mapContainer.getBoundingClientRect();
  planeEl.style.left = (e.clientX - rect.left - 20) + "px";
  planeEl.style.top = (e.clientY - rect.top - 20) + "px";
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

// Slider Game
const slider = document.getElementById("love-slider");
const message = document.getElementById("love-slider-message");
const universe = document.getElementById("universe-image");

slider.addEventListener("input", () => {
  if (parseInt(slider.value) >= 100) {
    message.textContent = "MORE THAN THE UNIVERSE";
    universe.classList.remove("hidden");
  } else {
    message.textContent = "NOT YET KEEP GOING HIGHER";
    universe.classList.add("hidden");
  }
});
