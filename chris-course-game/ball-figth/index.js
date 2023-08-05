const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = innerWidth - 2;
canvas.height = innerHeight - 6;

addEventListener('resize', () => {
  canvas.width = innerWidth - 2;
  canvas.height = innerHeight - 6;
});

class Ball {
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
}

class Player extends Ball {
  update() {
    this.draw();
  }
}
class Projectile extends Ball {
  constructor(x, y, radius, color, velocity) {
    super(x, y, radius, color);
    this.velocity = velocity;
  }
  update() {
    this.x += this.velocity.x;
    this.y += this.velocity.y;
    this.draw();
  }
}

const player = new Player(canvas.width / 2, canvas.height / 2, 30, 'white');

const projectileArr = [];

window.addEventListener('click', (e) => {
  const x = e.clientX;
  const y = e.clientY;
  const radians = Math.atan2(x, y);
  const velocity = {
    x: 1,
    y: 1,
  };
  const projectile = new Projectile(
    canvas.width / 2,
    canvas.height / 2,
    5,
    'white',
    velocity
  );
  projectileArr.push(projectile);
});

function animate() {
  requestAnimationFrame(animate);
  ctx.fillStyle = 'rgba(0,0,0,0.1)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  player.update();
  projectileArr.forEach((projectile) => projectile.update());
}

animate();
