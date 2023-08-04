import utils, { randomColor, randomIntFromRange } from './utils';

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = innerWidth - 2;
canvas.height = innerHeight - 6;

const colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66'];

// Event Listeners
addEventListener('resize', () => {
  canvas.width = innerWidth - 2;
  canvas.height = innerHeight - 6;

  init();
});

let mouseDown = false;
addEventListener('mousedown', () => {
  mouseDown = true;
});
addEventListener('mouseup', () => {
  mouseDown = false;
});

// Objects
class Star {
  constructor(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.shadowColor = this.color;
    ctx.shadowBlur = 15;
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }

  update() {
    this.draw();
  }
}

// Implementation
let stars;
function init() {
  stars = [];

  for (let i = 0; i < 400; i++) {
    const canvasWidth = canvas.width + 300;
    const canvasHeight = canvas.height + 300;
    let x = 0;
    let y = 0;
    if (innerWidth > innerHeight) {
      x = randomIntFromRange(-canvasWidth / 2, canvasWidth / 2);
      y = randomIntFromRange(-canvasWidth / 2, canvasWidth / 2);
    } else {
      x = randomIntFromRange(-canvasHeight / 2, canvasHeight / 2);
      y = randomIntFromRange(-canvasHeight / 2, canvasHeight / 2);
    }
    const radius = Math.random() * 3;
    const color = randomColor(colors);
    stars.push(new Star(x, y, radius, color));
  }
}

// Animation Loop
let radians = 0;
let alpha = 1;
let velocity = 0.001;
function animate() {
  requestAnimationFrame(animate);
  ctx.fillStyle = `rgba(10,10,10,${alpha})`;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.save();
  ctx.translate(canvas.width / 2, canvas.height / 2);
  ctx.rotate(radians);
  stars.forEach((star) => {
    star.update();
  });
  ctx.restore();

  radians += velocity;

  if (mouseDown && alpha >= 0.1) {
    alpha -= 0.01;
    velocity = 0.005;
  } else if (!mouseDown && alpha < 1) {
    alpha += 0.01;
    velocity = 0.001;
  }
}

init();
animate();
