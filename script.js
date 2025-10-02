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

// Modal
const openBtn = document.getElementById("open-letter");
const modal = document.getElementById("modal");
const closeBtn = document.getElementById("close-modal");
openBtn.addEventListener("click", () => modal.classList.remove("hidden"));
closeBtn.addEventListener("click", () => modal.classList.add("hidden"));

// Plane Drag + Snap
const planeEl = document.getElementById("plane");
const journey = document.getElementById("journey-container");
const sfCircle = document.getElementById("sf-circle");
const seeYouEl = document.getElementById("see-you");

let isDragging = false;

planeEl.addEventListener("mousedown", e => {
  isDragging = true;
  planeEl.style.cursor = "grabbing";
  e.preventDefault();
});

document.addEventListener("mouseup", () => {
  if(isDragging) {
    isDragging = false;
    planeEl.style.cursor = "grab";
    checkPlaneOverSF();
  }
});

document.addEventListener("mousemove", e => {
  if(!isDragging) return;
  const rect = journey.getBoundingClientRect();
  let x = e.clientX - rect.left - planeEl.offsetWidth/2;
  let y = e.clientY - rect.top - planeEl.offsetHeight/2;

  x = Math.max(0, Math.min(rect.width - planeEl.offsetWidth, x));
  y = Math.max(0, Math.min(rect.height - planeEl.offsetHeight, y));

  planeEl.style.left = x + "px";
  planeEl.style.top = y + "px";
});

// Snap into SF circle if near
function checkPlaneOverSF(){
  const planeRect = planeEl.getBoundingClientRect();
  const sfRect = sfCircle.getBoundingClientRect();

  const centerX = planeRect.left + planeRect.width/2;
  const centerY = planeRect.top + planeRect.height/2;

  if(centerX > sfRect.left-20 &&
     centerX < sfRect.right+20 &&
     centerY > sfRect.top-20 &&
     centerY < sfRect.bottom+20){
       // snap plane to SF center
       planeEl.style.left = (sfCircle.offsetLeft + sfCircle.offsetWidth/2 - planeEl.offsetWidth/2) + "px";
       planeEl.style.top = (sfCircle.offsetTop + sfCircle.offsetHeight/2 - planeEl.offsetHeight/2) + "px";
       seeYouEl.classList.remove("hidden");
       confettiEffect();
  }
}

// Confetti drop
function confettiEffect(){
  for(let i=0;i<100;i++){
    const confetti = document.createElement("div");
    confetti.classList.add("confetti");
    confetti.style.left = Math.random()*100 + "vw";
    confetti.style.color = ["#ff69b4","#ff1493","#ffd700","#00ffff"][Math.floor(Math.random()*4)];
    confetti.innerText = "🎉";
    document.body.appendChild(confetti);
    confetti.animate([{transform:'translateY(0)'},{transform:'translateY(110vh)'}],
                     {duration:3000+Math.random()*2000});
    setTimeout(()=>confetti.remove(),5000);
  }
}

// Slider Section
const slider = document.getElementById("love-slider");
const message = document.getElementById("love-slider-message");

slider.addEventListener("input", () => {
  if(parseInt(slider.value)>=100){
    message.textContent = "MORE THAN THE UNIVERSE";
  } else {
    message.textContent = "NOT YET KEEP GOING HIGHER";
  }
});
