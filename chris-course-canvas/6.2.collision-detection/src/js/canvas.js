import utils, {
  distance,
  randomColor,
  randomIntFromRange,
  resolveCollision,
} from './utils';

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = innerWidth - 2;
canvas.height = innerHeight - 6;

const mouse = {
  x: -100,
  y: -100,
};

const colors = ['#2185C5', '#7ECEFD', '#e5ddce', '#FF7F66'];

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
class Circle {
  constructor(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.velocity = {
      x: (Math.random() - 0.5) * 3,
      y: (Math.random() - 0.5) * 3,
    };
    this.radius = radius;
    this.color = color;
    this.mass = 1;
    this.opacity = 0;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.save();
    ctx.globalAlpha = this.opacity;
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.restore();
    ctx.strokeStyle = this.color;
    ctx.stroke();
    ctx.closePath();
  }

  update(particles) {
    this.draw();

    for (let index = 0; index < particles.length; index++) {
      if (this === particles[index]) continue;
      if (
        distance(this.x, this.y, circleArr[index].x, circleArr[index].y) -
          this.radius * 2 <
        0
      ) {
        console.log('has');
        resolveCollision(this, particles[index]);
      }
    }
    if (this.x - this.radius <= 0 || this.x + this.radius >= innerWidth) {
      this.velocity.x = -this.velocity.x;
    }
    if (this.y - this.radius <= 0 || this.y + this.radius >= innerHeight) {
      this.velocity.y = -this.velocity.y;
    }

    // mouse collasion detection
    if (
      distance(mouse.x, mouse.y, this.x, this.y) < 100 &&
      this.opacity < 0.5
    ) {
      this.opacity += 0.02;
    } else if (this.opacity > 0) {
      this.opacity -= 0.02;
      this.opacity = Math.max(0, this.opacity);
    }

    this.x += this.velocity.x;
    this.y += this.velocity.y;
  }
}

// Implementation
let circleArr;
function init() {
  circleArr = [];
  for (let index = 0; index < 400; index++) {
    const radius = 10;
    const x = randomIntFromRange(radius, innerWidth - radius);
    const y = randomIntFromRange(radius, innerHeight - radius);
    const color = randomColor(colors);

    if (index !== 0) {
      for (let j = 0; j < circleArr.length; j++) {
        if (distance(x, y, circleArr[j].x, circleArr[j].y) - radius * 2 < 0) {
          x = randomIntFromRange(radius, innerWidth - radius);
          y = randomIntFromRange(radius, innerHeight - radius);
          j = -1;
        }
      }
    }
    console.log(x, innerWidth, y, innerHeight);
    circleArr.push(new Circle(x, y, radius, color));
  }
}

// Animation Loop
function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // ctx.fillText('HTML CANVAS BOILERPLATE', mouse.x, mouse.y);
  circleArr.forEach((circle) => circle.update(circleArr));
}

init();
animate();
