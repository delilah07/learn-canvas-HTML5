import utils from './utils';

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = innerWidth - 2;
canvas.height = innerHeight - 6;

const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2,
};

const gravity = 0.005;
const friction = 0.99;

// Objects
class Particle {
  constructor(x, y, radius, color, velocity) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.velocity = { x: velocity.x, y: velocity.y };
    this.alpha = 1;
  }

  draw() {
    ctx.save();
    ctx.globalAlpha = this.alpha;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
    ctx.restore();
  }

  update() {
    this.draw();

    this.velocity.x *= friction;
    this.velocity.y *= friction;
    this.velocity.y += gravity;

    this.x += this.velocity.x;
    this.y += this.velocity.y;

    this.alpha -= 0.005;
  }
}

// Implementation
let particles;
particles = [];

// Animation Loop
function animate() {
  requestAnimationFrame(animate);
  ctx.fillStyle = 'rgba(0,0,0,0.05)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  particles.forEach((particle, i) => {
    particle.alpha > 0 ? particle.update() : particles.splice(i, 1);
  });
}

// Event Listeners
addEventListener('click', (event) => {
  mouse.x = event.clientX;
  mouse.y = event.clientY;

  const particleCount = 400;

  const angleIncrement = (Math.PI * 2) / particleCount;

  for (let i = 0; i < particleCount; i++) {
    particles.push(
      new Particle(mouse.x, mouse.y, 3, `hsl(${Math.random() * 360},50%,50%)`, {
        x: Math.cos(angleIncrement * i) * Math.random() * 4,
        y: Math.sin(angleIncrement * i) * Math.random() * 4,
      })
    );
  }
});

addEventListener('resize', () => {
  canvas.width = innerWidth - 2;
  canvas.height = innerHeight - 6;
});

animate();
