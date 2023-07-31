const canvas = document.querySelector('#canvas');

canvas.width = window.innerWidth - 2;
canvas.height = window.innerHeight - 6;

console.log(canvas);

const ctx = canvas.getContext('2d');

const mouse = {
  x: undefined,
  y: undefined,
};

const maxRadius = 40;

const colorArr = ['#6A3F36', '#C8A796', '#F4F3EE', '#F8E4BE', '#EEA988'];

window.addEventListener('mousemove', function (event) {
  mouse.x = event.x;
  mouse.y = event.y;
});

window.addEventListener('resize', function () {
  canvas.width = window.innerWidth - 2;
  canvas.height = window.innerHeight - 6;

  init();
});

class Circle {
  constructor(x, y, r, dx, dy) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.dx = dx;
    this.dy = dy;
    this.minRadius = r;
    this.color = colorArr[Math.floor(Math.random() * colorArr.length)];
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);

    ctx.fillStyle = this.color;
    ctx.fill();
  }
  update() {
    if (this.x + this.r >= innerWidth || this.x - this.r <= 0) {
      this.dx = -this.dx;
    }
    if (this.y + this.r >= innerHeight || this.y - this.r <= 0) {
      this.dy = -this.dy;
    }

    this.x += this.dx;
    this.y += this.dy;

    //interactivity
    if (
      mouse.x - this.x < 50 &&
      mouse.x - this.x > -50 &&
      mouse.y - this.y < 50 &&
      mouse.y - this.y > -50
    ) {
      if (this.r < maxRadius) {
        this.r += 1;
      }
    } else if (this.r > this.minRadius) {
      this.r -= 1;
    }

    this.draw();
  }
}

let circleArr = [];

function init() {
  circleArr = [];
  for (let index = 0; index < 500; index++) {
    const r = Math.random() * 3 + 1;
    let x = Math.random() * (innerWidth - r * 2) + r;
    let dx = Math.random() * 1;
    let y = Math.random() * (innerHeight - r * 2) + r;
    let dy = Math.random() * 1;
    const circle = new Circle(x, y, r, dx, dy);
    circleArr.push(circle);
  }
}

function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, innerWidth, innerHeight);

  circleArr.forEach((el) => el.update());
}

init();
animate();
