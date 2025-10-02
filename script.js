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
