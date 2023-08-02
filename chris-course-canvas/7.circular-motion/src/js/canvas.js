import utils, { randomColor, randomIntFromRange } from './utils';

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = innerWidth - 2;
canvas.height = innerHeight - 6;

const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2,
};

const colors = ['#990000', '#FF5B00', '#D4D925', '#FFEE63'];

// Event Listeners
addEventListener('mousemove', (event) => {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
});

addEventListener('resize', () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;

  init();
});

// Objects
class Particle {
  constructor(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.radians = Math.random() * Math.PI * 2;
    this.velocity = 0.05;
    this.randomNum = randomIntFromRange(50, 120);
    this.lastMouse = { x: x, y: y };
  }

  draw(dot) {
    ctx.beginPath();
    ctx.strokeStyle = this.color;
    ctx.lineWidth = this.radius;
    ctx.moveTo(dot.x, dot.y);
    ctx.lineTo(this.x, this.y);
    ctx.stroke();
    ctx.closePath();
  }

  update() {
    const lastPoint = { x: this.x, y: this.y };

    //move points over time
    this.radians += this.velocity;
    this.lastMouse.x += (mouse.x - this.lastMouse.x) * 0.05;
    this.lastMouse.y += (mouse.y - this.lastMouse.y) * 0.05;

    //Drag effect

    //Circular Motion
    this.x = this.lastMouse.x + Math.cos(this.radians) * this.randomNum;
    this.y = this.lastMouse.y + Math.sin(this.radians) * this.randomNum;
    this.draw(lastPoint);
  }
}

// Implementation
let particles;
function init() {
  particles = [];

  for (let i = 0; i < 50; i++) {
    const color = randomColor(colors);
    const radius = Math.random() * 2 + 1;
    particles.push(
      new Particle(canvas.width / 2, canvas.height / 2, radius, color)
    );
  }
}

// Animation Loop
function animate() {
  requestAnimationFrame(animate);
  // ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = 'rgba(255,255,255,0.05)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // ctx.fillText('HTML CANVAS BOILERPLATE', mouse.x, mouse.y);
  particles.forEach((particle) => {
    particle.update();
  });
}

init();
animate();
