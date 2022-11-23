const canvas = document.querySelector("#canvas1");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const particleArr = [];
let hue = 0;

window.addEventListener("resize", function () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  // ---- create rectange ----
  //   ctx.fillStyle = "white";
  //   ctx.fillRect(10, 10, 150, 50);
});

// ---- create circle ----
// ctx.fillStyle = "red";
// ctx.beginPath();
// ctx.arc(100, 100, 50, 0, Math.PI * 2);
// ctx.fill();

// ---- create circle with border ----
// ctx.fillStyle = "red";
// ctx.strokeStyle = "white";
// ctx.lineWidth = 5;
// ctx.beginPath();
// ctx.arc(100, 100, 50, 0, Math.PI * 2);
// ctx.fill();
// ctx.stroke();

// ---- mouse  click ----
const mouse = {
  x: undefined,
  y: undefined,
};

canvas.addEventListener("click", function (event) {
  mouse.x = event.x;
  mouse.y = event.y;
  for (let i = 0; i < 10; i++) {
    particleArr.push(new Particle());
  }
});

// ---- mouse move ----
canvas.addEventListener("mousemove", function (event) {
  mouse.x = event.x;
  mouse.y = event.y;
  for (let i = 0; i < 5; i++) {
    particleArr.push(new Particle());
  }
});

function drawCircle() {
  ctx.fillStyle = "red";
  ctx.beginPath();
  ctx.arc(mouse.x, mouse.y, 10, 0, Math.PI * 2);
  ctx.fill();
}
// drawCircle();

// ---- Animation loop ----
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // ctx.fillStyle = "rgba(0,0,0,0.02";
  // ctx.fillRect(0, 0, canvas.width, canvas.height);
  handleParticles();
  hue += 2;
  requestAnimationFrame(animate);
}
animate();

class Particle {
  constructor() {
    this.x = mouse.x;
    this.y = mouse.y;
    this.size = Math.random() * 15 + 1;
    this.speedX = Math.random() * 3 - 1.5;
    this.speedY = Math.random() * 3 - 1.5;
    this.color = `hsl(${hue}, 100%, 50%`;
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.size > 0.2) this.size -= 0.1;
  }
  draw() {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

// function init() {
//   for (let i = 0; i < 100; i++) {
//     particleArr.push(new Particle());
//   }
// }
// init();

function handleParticles() {
  for (let i = 0; i < particleArr.length; i++) {
    particleArr[i].update();
    particleArr[i].draw();

    for (let j = i; j < particleArr.length; j++) {
      const dx = particleArr[i].x - particleArr[j].x;
      const dy = particleArr[i].y - particleArr[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < 100) {
        ctx.beginPath();
        ctx.strokeStyle = particleArr[i].color;
        ctx.lineWidth = 0.5;
        ctx.moveTo(particleArr[i].x, particleArr[i].y);
        ctx.lineTo(particleArr[j].x, particleArr[j].y);
        ctx.stroke();
        ctx.closePath();
      }
    }
    if (particleArr[i].size <= 0.3) {
      particleArr.splice(i, 1);
      i--;
    }
  }
}
