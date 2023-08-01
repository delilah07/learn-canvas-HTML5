import utils from './utils';

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

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
  canvas.width = innerWidth;
  canvas.height = innerHeight;

  init();
});

// Objects
class Rectangle {
  constructor(x, y, w, h, color) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.color = color;
  }

  draw() {
    ctx.beginPath();
    ctx.fillRect(this.x, this.y, this.w, this.h);
    ctx.fillStyle = this.color;
    ctx.closePath();
  }

  update() {
    this.draw();
  }
}

// Implementation
let rect1;
let rect2;
function init() {
  rect1 = new Rectangle(300, 300, 150, 150, 'blue');
  rect2 = new Rectangle(undefined, undefined, 100, 100, 'red');
}

// Animation Loop
function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // ctx.fillText('HTML CANVAS BOILERPLATE', mouse.x, mouse.y);
  rect1.update();
  rect2.x = mouse.x;
  rect2.y = mouse.y;
  rect2.update();

  rect2.x + rect2.w > rect1.x &&
  rect1.x + rect1.w > rect2.x &&
  rect2.y + rect2.h > rect1.y &&
  rect1.y + rect1.h > rect2.y
    ? (rect1.color = 'red')
    : (rect1.color = 'blue');
}

init();
animate();
