import utils, { randomIntFromRange } from './utils';
const { noise } = require('@chriscourses/perlin-noise');
console.log(noise());

// for (let i = 0; i < 100; i += 0.01) {
//   const x = noise(i); // returns value 0-1, but different and related to the previous return value on each loop cycle
// }

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = innerWidth - 2;
canvas.height = innerHeight - 6;

// Objects
class Circle {
  constructor(x, y, radius, color, offset) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.offset = offset;
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

const circles = [];
for (let i = 0; i < 100; i++) {
  circles.push(
    new Circle(
      -30,
      -30,
      10,
      `hsl(${randomIntFromRange(0, 255)},100%,50%)`,
      i * 0.01
    )
  );
}

let time = 0;
// Animation Loop
function animate() {
  requestAnimationFrame(animate);
  ctx.fillStyle = 'rgba(0,0,0,0.01)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  circles.forEach((circle) => {
    circle.draw();
    circle.x = noise(time + circle.offset + 20) * canvas.width;
    circle.y = noise(time + circle.offset) * canvas.height;
  });
  time += 0.005;
}

animate();
