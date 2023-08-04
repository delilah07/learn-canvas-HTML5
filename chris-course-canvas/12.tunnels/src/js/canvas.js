import utils from './utils';

const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = innerWidth - 2;
canvas.height = innerHeight - 6;

const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2,
};

// Event Listeners
addEventListener('mousemove', (event) => {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
});

addEventListener('resize', () => {
  canvas.width = innerWidth - 2;
  canvas.height = innerHeight - 6;

  init();
});

// Objects
class Particle {
  constructor(x, y, radius, color, velocity) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.velocity = velocity;
    this.ttl = 1000;
  }

  draw() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
    c.closePath();
    this.ttl--;
  }

  update() {
    this.draw();

    this.x += this.velocity.x;
    this.y += this.velocity.y;
  }
}

// Implementation
let particles;

function init() {
  particles = [];
}

let hueColor = 0;
let hueRadians = 0;

function generateRing() {
  setTimeout(generateRing, 500);
  hueColor = Math.sin(hueRadians);

  const particlesNum = 30;
  for (let i = 0; i < particlesNum; i++) {
    // const x = canvas.width / 2 + Math.cos(i * particlesAngular) * radius;
    // const y = canvas.height / 2 + Math.sin(i * particlesAngular) * radius;
    const particlesAngular = (Math.PI * 2) / particlesNum;

    const x = mouse.x;
    const y = mouse.y;

    particles.push(
      new Particle(x, y, 5, `hsl(${Math.abs(hueColor * 360)}, 50%,50%)`, {
        x: Math.cos(i * particlesAngular),
        y: Math.sin(i * particlesAngular),
      })
    );
  }
  hueRadians += 0.02;
}

// Animation Loop
function animate() {
  requestAnimationFrame(animate);
  c.fillStyle = 'rgba(0,0,0,0.05)';
  c.fillRect(0, 0, canvas.width, canvas.height);

  particles.forEach((particle, i) => {
    particle.ttl > 0 ? particle.update() : particles.splice(i, 1);
  });
}

init();
animate();
generateRing();
console.log(particles);
