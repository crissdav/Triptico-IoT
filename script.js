
/* ============ SCROLL PROGRESS & NAVBAR ============ */
const scrollProgress = document.getElementById('scrollProgress');
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  const scrollTop = document.documentElement.scrollTop;
  const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const progress = (scrollTop / docHeight) * 100;
  scrollProgress.style.width = progress + '%';
  navbar.classList.toggle('scrolled', scrollTop > 20);
});

/* ============ MOBILE NAVIGATION ============ */
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

navToggle.addEventListener('click', () => {
  navMenu.classList.toggle('open');
});

navMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navMenu.classList.remove('open'));
});

/* ============ HERO LIVE TELEMETRY SIMULATION ============ */
const dashTemp = document.getElementById('dashTemp');
const dashHum = document.getElementById('dashHum');
const dashSoil = document.getElementById('dashSoil');
const heroTempPin = document.getElementById('heroTempPin');
const heroSoilPin = document.getElementById('heroSoilPin');
const heroPumpPill = document.getElementById('heroPumpPill');
const heroFanPill = document.getElementById('heroFanPill');

function updateHeroLiveTelemetry() {
  const time = Date.now() / 10000;
  const temp = (28.2 + Math.sin(time) * 1.4 + (Math.random() - 0.5) * 0.2).toFixed(1);
  const hum = Math.round(84 + Math.cos(time * 0.8) * 3 + (Math.random() - 0.5) * 0.5);
  const soil = Math.round(78 + Math.sin(time * 0.6) * 4);

  if (dashTemp) dashTemp.textContent = temp;
  if (dashHum) dashHum.textContent = hum;
  if (dashSoil) dashSoil.textContent = soil;
  if (heroTempPin) heroTempPin.textContent = temp + '°C';
  if (heroSoilPin) heroSoilPin.textContent = soil + '%';

  // Trigger fan if temp > 30°C
  if (temp > 29.5) {
    heroFanPill.classList.add('active');
  } else {
    heroFanPill.classList.remove('active');
  }

  // Trigger pump if soil < 65%
  if (soil < 65) {
    heroPumpPill.classList.add('active');
  } else {
    heroPumpPill.classList.remove('active');
  }
}

setInterval(updateHeroLiveTelemetry, 2500);
updateHeroLiveTelemetry();

/* ============ AMBIENT FLOATING PARTICLES ============ */
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
let W, H, particles = [];

function resizeCanvas() {
  W = canvas.width = window.innerWidth;
  H = canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const PARTICLE_COLORS = [
  'rgba(104, 195, 67,',
  'rgba(38, 150, 147,',
  'rgba(240, 183, 56,'
];

function initParticles() {
  particles = [];
  const count = Math.min(50, Math.floor(W / 35));
  for (let i = 0; i < count; i++) {
    particles.push({
      x: Math.random() * W,
      y: Math.random() * H,
      radius: Math.random() * 2 + 1,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      color: PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)],
      alpha: Math.random() * 0.4 + 0.1
    });
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, W, H);
  particles.forEach(p => {
    p.x += p.vx;
    p.y += p.vy;

    if (p.x < 0) p.x = W;
    if (p.x > W) p.x = 0;
    if (p.y < 0) p.y = H;
    if (p.y > H) p.y = 0;

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
    ctx.fillStyle = p.color + p.alpha + ')';
    ctx.fill();
  });
  requestAnimationFrame(animateParticles);
}

initParticles();
animateParticles();
window.addEventListener('resize', initParticles);
