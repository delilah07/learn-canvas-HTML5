import utils from './utils';

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = innerWidth - 2;
canvas.height = innerHeight - 6;

const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2,
};

const colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66'];

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

function getDistance(x1, y1, x2, y2) {
  const xDist = x2 - x1;
  const yDist = y2 - y1;
  const distance = Math.sqrt(xDist ** 2 + yDist ** 2);
  return distance;
}

// Objects
class Circle {
  constructor(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
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
  }
}

// Implementation
let circle1;
let circle2;
function init() {
  circle1 = new Circle(300, 300, 100, 'black');
  circle2 = new Circle(undefined, undefined, 30, 'red');
}

// Animation Loop
function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // ctx.fillText('HTML CANVAS BOILERPLATE', mouse.x, mouse.y);
  circle1.update();
  circle2.x = mouse.x;
  circle2.y = mouse.y;
  circle2.update();
  const distance = getDistance(circle1.x, circle1.y, circle2.x, circle2.y);
  distance < circle1.radius + circle2.radius
    ? (circle1.color = 'red')
    : (circle1.color = 'black');
}

init();
animate();
