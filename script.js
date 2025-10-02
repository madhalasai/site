const recipientName = "aaru bebe";
const mainHeading = "happy boyfriend day and happy one year";
const letterText = `i love u jaanu. i'm not good at this at all but i'm learning so i can give my love the proper appreciation and love you deserve. you make me so happy my dudu. ur right, we will work it out we will figure it out but i want u to know that to me u are everythign and more. i'm so excited to see you. hope u enjoyed this!!`;

/* script.js - interactive anniversary site */
(() => {
// --- Customize these values ---
const recipientName = "aaru bebe";
const mainHeading = "happy boyfriend day and happy one year";
const letterText = `i love u jaanu. i'm not good at this at all but i'm learning so i can give my love the proper appreciation and love you deserve. you make me so happy my dudu. ur right, we will work it out we will figure it out but i want u to know that to me u are everythign and more. i'm so excited to see you. hope u enjoyed this!!`;
// -------------------------------

// small helpers
const rand = (min, max) => Math.random() * (max - min) + min;
const $ = (sel) => document.querySelector(sel);

const layer = document.getElementById('animation-layer');
const openBtn = $('#open-letter');
const modal = $('#modal');
const closeBtn = $('#close-modal');
const letterEl = $('#letter');

// set heading text (so you can edit just script.js to customize)
document.getElementById('main-heading').textContent = mainHeading;
document.getElementById('sub-heading').textContent = `${recipientName} ❤️`;

// --- SVG templates ---
const heartSVG = `<svg viewBox="0 0 32 29" class="heart-svg" aria-hidden="true"><path d="M23.6 0c-2.9 0-5.1 1.9-6.6 3.7C15.5 1.9 13.3 0 10.4 0 4.6 0 0 4.7 0 10.6 0 18.1 9.1 23.4 16 29c6.9-5.6 16-10.9 16-18.4C32 4.7 27.4 0 21.6 0z" fill="currentColor"/></svg>`;

const pandaSVG = `<svg viewBox="0 0 120 120" class="panda-svg" aria-hidden="true">     <circle cx="60" cy="60" r="44" fill="#fff" stroke="#000" stroke-width="1" />     <circle cx="36" cy="40" r="12" fill="#000"/>     <circle cx="84" cy="40" r="12" fill="#000"/>     <ellipse cx="36" cy="42" rx="5" ry="7" fill="#fff"/>     <ellipse cx="84" cy="42" rx="5" ry="7" fill="#fff"/>     <circle cx="60" cy="64" r="6" fill="#000"/>     <path d="M50 74c6 6 14 6 20 0" stroke="#000" stroke-width="3" fill="none" stroke-linecap="round"/>     <circle cx="42" cy="24" r="8" fill="#000"/>     <circle cx="78" cy="24" r="8" fill="#000"/>   </svg>`;

// create and spawn a heart at (x,y) — positions in page coordinates
function spawnHeart(x, y, opts = {}) {
const el = document.createElement('div');
el.className = 'floating';
el.innerHTML = heartSVG;
// random size and color
const size = opts.size || rand(26, 56);
el.style.width = `${size}px`;
el.style.height = `${(size * 0.85).toFixed(0)}px`;
el.style.left = `${x - size/2}px`;
el.style.top = `${y - size/2}px`;
// set color randomly in pink/red palette
const colors = ['#ff3860','#ff6b88','#ff8aa2','#ff4d6d'];
el.style.color = opts.color || colors[Math.floor(rand(0, colors.length))];
// random rotation
el.style.transform = `translateY(0) rotate(${rand(-30,30)}deg)`;
// animation duration
const dur = opts.dur || rand(2200, 3800);
el.style.animation = `floatUp ${dur}ms linear forwards`;
// slight drift with CSS animation (using different durations)
el.style.willChange = 'transform, opacity';
layer.appendChild(el);
// remove after animation
setTimeout(() => { try { el.remove() } catch(e){} }, dur + 80);
}

// spawn pandas at random sides and make them drift
function spawnPanda() {
const el = document.createElement('div');
el.className = 'floating';
el.innerHTML = pandaSVG;
const width = rand(56, 88);
el.style.width = `${width}px`;
el.style.height = `${width}px`;
// start offscreen bottom-left or bottom-right
const fromLeft = Math.random() > 0.5;
const startX = fromLeft ? -80 : window.innerWidth + 80;
const startY = rand(window.innerHeight * 0.5, window.innerHeight * 0.95);
el.style.left = `${startX}px`;
el.style.top = `${startY}px`;
// animate across the screen using JS for randomness
layer.appendChild(el);

```
// calculate destination X
const destX = fromLeft ? window.innerWidth + 120 : -140;
const travel = rand(7000, 14000);
const start = performance.now();
const startLeft = startX;
const deltaX = destX - startLeft;
const amplitude = rand(12, 34);

function frame(now) {
  const t = Math.min(1, (now - start) / travel);
  // ease in-out
  const ease = t < 0.5 ? 2*t*t : -1 + (4 - 2*t)*t;
  const curX = startLeft + (deltaX * ease);
  // gentle vertical bob using sine
  const bob = Math.sin(ease * Math.PI * 2) * amplitude;
  el.style.left = `${curX}px`;
  el.style.top = `${startY - bob}px`;
  el.style.transform = `rotate(${Math.sin(ease * Math.PI * 2) * 6}deg)`;
  if (t < 1) {
    requestAnimationFrame(frame);
  } else {
    el.remove();
  }
}
requestAnimationFrame(frame);
```

}

// spawn a few hearts and pandas on load
function initialBurst() {
for (let i=0;i<8;i++){
spawnHeart(rand(80, window.innerWidth-80), rand(120, window.innerHeight-120), { size: rand(28,54), dur: rand(2600,4200) });
}
for (let i=0;i<3;i++){
setTimeout(spawnPanda, i * 900 + 200);
}
}

// click anywhere to spawn heart (but ignore clicks on buttons/modal)
document.addEventListener('click', (e) => {
if (e.target.closest('.cta') || e.target.closest('.modal-content')) return;
spawnHeart(e.clientX, e.clientY);
});

// spawn pandas periodically (every ~3-6s)
let pandaTimer = setInterval(spawnPanda, 3800 + Math.random()*3200);

// Open and close modal with typed letter
function showLetter() {
modal.classList.remove('hidden');
// small confetti of hearts
for (let i=0;i<18;i++){
setTimeout(() => spawnHeart(rand(60, window.innerWidth-60), rand(60, window.innerHeight-60), { size: rand(12,34), dur: rand(1600,3200) }), i*60);
}
typeWriter(letterText, letterEl);
}
function hideLetter() {
modal.classList.add('hidden');
letterEl.textContent = '';
}
openBtn.addEventListener('click', (e) => {
e.stopPropagation();
showLetter();
});
closeBtn.addEventListener('click', hideLetter);
modal.addEventListener('click', (e) => {
if (e.target === modal) hideLetter(); // click backdrop closes
});

// typewriter effect
function typeWriter(text, container) {
container.textContent = '';
const chars = Array.from(text);
let i = 0;
const baseDelay = 28;
function step() {
if (i >= chars.length) return;
const ch = chars[i++];
container.textContent += ch;
// slightly longer pauses at punctuation & spaces
const extra = /[,.!?\n]/.test(ch) ? rand(40,120) : (ch === ' ' ? rand(8,18) : 0);
setTimeout(step, baseDelay + extra);
}
step();
}

// small accessibility: close with Escape
document.addEventListener('keydown', (e) => {
if (e.key === 'Escape') {
if (!modal.classList.contains('hidden')) hideLetter();
}
});

// start
initialBurst();

// keep spawning soft hearts in the background for ambiance
setInterval(() => {
spawnHeart(rand(40, window.innerWidth-40), window.innerHeight - rand(40,160), { size: rand(18,34), dur: rand(3000,4800) });
}, 900);

// cleanup on unload
window.addEventListener('beforeunload', () => {
clearInterval(pandaTimer);
});
})();
