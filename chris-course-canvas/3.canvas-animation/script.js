const canvas = document.querySelector('#canvas');

canvas.width = window.innerWidth - 2;
canvas.height = window.innerHeight - 6;

console.log(canvas);

const ctx = canvas.getContext('2d');

class Circle {
  constructor(x, y, r, dx, dy) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.dx = dx;
    this.dy = dy;
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
    ctx.strokeStyle = 'blue';
    ctx.fillStyle = 'blue';
    ctx.stroke();
    ctx.fill();
  }
  update(x, y, dx, dy) {
    if (this.x + this.r >= innerWidth || this.x - this.r <= 0) {
      this.dx = -this.dx;
    }
    if (this.y + this.r >= innerHeight || this.y - this.r <= 0) {
      this.dy = -this.dy;
    }

    this.x += this.dx;
    this.y += this.dy;

    this.draw();
  }
}

const circleArr = [];
for (let index = 0; index < 100; index++) {
  const r = Math.random() * 50;
  let x = Math.random() * (innerWidth - r * 2) + r;
  let dx = Math.random() * 2;
  let y = Math.random() * (innerHeight - r * 2) + r;
  let dy = Math.random() * 2;
  const circle = new Circle(x, y, r, dx, dy);
  circleArr.push(circle);
}

function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, innerWidth, innerHeight);

  circleArr.forEach((el) => el.update());
}
animate();
