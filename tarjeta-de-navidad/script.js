const clickMessages = [
  " Oe pajaron qlo que tengas feliz navidad",
  "Te vai en pura falazias oe",
  " Wena po hijo la perra",
  " Que el viejito pascuero te traiga la wea que queri zi",
  " Su empanada del tio aceite",
  " Pico en el ojo pa vo"
];


    
let clickCount = 0;
let isFinished = false;
let currentMessage = null;

function showFloatingMessage(x, y) {
  // 🧹 Si hay un mensaje anterior, lo borramos
  if (currentMessage) {
    currentMessage.remove();
    currentMessage = null;
  }

  const msg = document.createElement("div");
  msg.className = "floating-message";
  msg.textContent =
    clickMessages[Math.floor(Math.random() * clickMessages.length)];

  // 🎯 Pequeño desplazamiento aleatorio
  const offsetX = (Math.random() - 0.5) * 60;
  const offsetY = (Math.random() - 0.5) * 30;

  msg.style.left = x + offsetX + "px";
  msg.style.top = y + offsetY + "px";

  msg.style.fontSize = (Math.random() * 0.3 + 1) + "rem";

  document.body.appendChild(msg);
  currentMessage = msg;

  setTimeout(() => {
    if (currentMessage === msg) {
      msg.remove();
      currentMessage = null;
    }
  }, 2500);
}


function changeMessage() {
  const random = Math.floor(Math.random() * messages.length);
  document.getElementById("message").textContent = messages[random];
}

// ❄️ Nieve animada
const canvas = document.getElementById("snow");
const ctx = canvas.getContext("2d");


function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener("resize", resizeCanvas);

// ❄️ Capas de nieve (profundidad)
const layers = [
  { count: 50, speed: 0.3, size: 1.5 }, // fondo
  { count: 70, speed: 0.7, size: 2.5 }, // medio
  { count: 90, speed: 1.2, size: 3.5 }  // frente
];

let snowflakes = [];
let wind = 0;

// Crear copos
function createSnowflakes() {
  snowflakes = [];

  layers.forEach(layer => {
    for (let i = 0; i < layer.count; i++) {
      snowflakes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * layer.size + 0.5,
        speed: layer.speed,
        drift: Math.random() * 0.5 + 0.2
      });
    }
  });
}

function drawSnowflakes() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "rgba(255,255,255,0.9)";
  ctx.beginPath();

  snowflakes.forEach(flake => {
    ctx.moveTo(flake.x, flake.y);
    ctx.arc(flake.x, flake.y, flake.r, 0, Math.PI * 2);
  });

  ctx.fill();
  moveSnowflakes();
  drawFireworks();
}

function moveSnowflakes() {
  // Viento suave que cambia solo
  wind += (Math.random() - 0.5) * 0.01;
  wind = Math.max(Math.min(wind, 0.5), -0.5);

  snowflakes.forEach(flake => {
    flake.y += flake.speed;
    flake.x += wind * flake.drift;

    if (flake.y > canvas.height) {
      flake.y = -flake.r;
      flake.x = Math.random() * canvas.width;
    }

    if (flake.x > canvas.width) flake.x = 0;
    if (flake.x < 0) flake.x = canvas.width;
  });
}

createSnowflakes();
setInterval(drawSnowflakes, 30);
const music = document.getElementById("music");
let started = false;

function startMusicOnce() {
  if (!started) {
    music.play();
    started = true;
    document.removeEventListener("click", startMusicOnce);
  }
}

document.addEventListener("click", startMusicOnce);

const muteBtn = document.getElementById("muteBtn");

muteBtn.addEventListener("click", () => {
  music.muted = !music.muted;
  muteBtn.textContent = music.muted ? "🔇" : "🔊";
});

// 🎆 FUEGOS ARTIFICIALES
let fireworks = [];

function createFirework(x, y) {
  const colors = ["#ff4d4d", "#ffd93d", "#4dff4d", "#4dd2ff", "#c77dff"];

  for (let i = 0; i < 40; i++) {
    fireworks.push({
      x,
      y,
      radius: Math.random() * 2 + 1,
      color: colors[Math.floor(Math.random() * colors.length)],
      vx: (Math.random() - 0.5) * 6,
      vy: (Math.random() - 0.5) * 6,
      alpha: 1,
      decay: Math.random() * 0.02 + 0.01
    });
  }
}

function drawFireworks() {
  fireworks.forEach((p, index) => {
    p.x += p.vx;
    p.y += p.vy;
    p.alpha -= p.decay;

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${hexToRgb(p.color)}, ${p.alpha})`;
    ctx.fill();

    if (p.alpha <= 0) {
      fireworks.splice(index, 1);
    }
  });
}

// Convierte HEX a RGB
function hexToRgb(hex) {
  const bigint = parseInt(hex.replace("#", ""), 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `${r},${g},${b}`;
}

canvas.addEventListener("click", (e) => {
  if (isFinished) return;

  const rect = canvas.getBoundingClientRect();
  const scaleX = canvas.width / rect.width;
  const scaleY = canvas.height / rect.height;

  const x = (e.clientX - rect.left) * scaleX;
  const y = (e.clientY - rect.top) * scaleY;

  clickCount++;

  if (clickCount < 5) {
    createFirework(x, y);
    showFloatingMessage(e.clientX, e.clientY);
  }

  if (clickCount === 5) {
    showOverlay("imagenes/nani.jpg", "😂😂😂");
  }
});




const overlay = document.getElementById("imageOverlay");
const overlayImage = document.getElementById("overlayImage");
const overlayText = document.getElementById("overlayText");

function showOverlay(imageSrc, text) {
  overlayImage.src = imageSrc;
  overlayText.textContent = text || "";
  overlay.classList.remove("hidden");
}

function hideOverlay() {
  overlay.classList.add("hidden");
}

// 👉 CLICK SOBRE EL OVERLAY
overlay.addEventListener("click", () => {

  // Final → reset limpio
  if (isFinished) {
    hideOverlay();
    clickCount = 0;
    isFinished = false;
    return;
  }

  hideOverlay();

  if (clickCount === 5) {
    clickCount++;
    isFinished = true;

    setTimeout(() => {
      showOverlay(
        "imagenes/amigos.png",
        " 🎄 Feliz Navidad chicos, los quiero mucho ❤️"
      );
    }, 100);
  }
});
// ❄️ Nieve
createSnowflakes();
setInterval(drawSnowflakes, 30);


