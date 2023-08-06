const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = innerWidth - 2;
canvas.height = innerHeight - 6;

const colors = ['#EA047E', '#FF6D28', '#FCE700', '#00F5FF'];

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

let projectileArr = [];

window.addEventListener('click', (e) => {
  const x = e.clientX - canvas.width / 2;
  const y = e.clientY - canvas.height / 2;
  const radians = Math.atan2(y, x);
  const velocity = {
    x: Math.cos(radians) * 5,
    y: Math.sin(radians) * 5,
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

class Enemy extends Ball {
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
const enemies = [];

function spawnEnemies() {
  setInterval(() => {
    const radius = Math.random() * 25 + 5;
    const color = colors[Math.floor(Math.random() * colors.length)];
    let x;
    let y;
    if (Math.random() < 0.5) {
      x = Math.random() < 0.5 ? 0 - radius : canvas.width + radius;
      y = Math.random() * canvas.height;
    } else {
      x = Math.random() * canvas.width;
      y = Math.random() < 0.5 ? 0 - radius : canvas.height + radius;
    }
    const radians = Math.atan2(canvas.height / 2 - y, canvas.width / 2 - x);
    const velocity = {
      x: Math.cos(radians),
      y: Math.sin(radians),
    };
    enemies.push(new Enemy(x, y, radius, color, velocity));
  }, 1000);
}
let animationId;
function animate() {
  animationId = requestAnimationFrame(animate);
  ctx.fillStyle = 'rgba(0,0,0,0.1)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  player.update();
  projectileArr.forEach((projectile, i) => {
    projectile.update();
    if (
      projectile.x - projectile.radius < 0 ||
      projectile.x + projectile.radius > canvas.width ||
      projectile.y - projectile.radius < 0 ||
      projectile.y + projectile.radius > canvas.height
    ) {
      setTimeout(() => {
        projectileArr.splice(i, 1);
      }, 0);
    }
  });

  enemies.forEach((enemy, i) => {
    enemy.update();

    //collition between enemy and projectile
    projectileArr.forEach((projectile, j) => {
      const distance = Math.hypot(
        projectile.x - enemy.x,
        projectile.y - enemy.y
      );
      if (distance - enemy.radius - projectile.radius < 1) {
        setTimeout(() => {
          projectileArr.splice(j, 1);
          enemies.splice(i, 1);
        }, 0);
      }
    });

    //collition between enemy and player
    const distance = Math.hypot(player.x - enemy.x, player.y - enemy.y);
    if (distance - enemy.radius - player.radius < 1) {
      //end game
      cancelAnimationFrame(animationId);
    }
  });
}

animate();
spawnEnemies();
