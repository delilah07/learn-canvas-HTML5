import utils from './utils';
import gsap from 'gsap';

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = innerWidth - 2;
canvas.height = innerHeight - 6;

const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2,
};
const center = {
  x: canvas.width / 2,
  y: canvas.height / 2,
};
let angle = 0;

// Event Listeners
addEventListener('mousemove', (event) => {
  gsap.to(mouse, {
    x: event.clientX - canvas.width / 2,
    y: event.clientY - canvas.height / 2,
  });

  angle = Math.atan2(mouse.y, mouse.x);
});

addEventListener('resize', () => {
  canvas.width = innerWidth - 2;
  canvas.height = innerHeight - 6;

  init();
});

// Objects
class Particle {
  constructor(x, y, radius, color, distanceFromCenter) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.distanceFromCenter = distanceFromCenter;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }

  update() {
    this.draw();

    this.x = center.x + this.distanceFromCenter * Math.cos(angle);
    this.y = center.y + this.distanceFromCenter * Math.sin(angle);
  }
}

// Implementation
let particles;

function init() {
  particles = [];
  let hueColor = 0;

  for (let i = 0; i < 200; i++) {
    const x = center.x + i * Math.cos(angle);
    const y = center.y + i * Math.sin(angle);

    particles.push(new Particle(x, y, 5, `hsl(${hueColor},50%,50%)`, i));
    hueColor += 360 / 200;
  }
}

// Animation Loop
function animate() {
  requestAnimationFrame(animate);
  ctx.fillStyle = 'rgba(0,0,0,0.05';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  particles.forEach((particle) => {
    particle.update();
  });
}

init();
animate();
