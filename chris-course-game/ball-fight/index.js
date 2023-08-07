const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = innerWidth - 2;
canvas.height = innerHeight - 6;

const colors = ['#EA047E', '#FF6D28', '#FCE700', '#00F5FF'];

const scoreDiv = document.querySelector('.score');

const levelDiv = document.querySelector('.level');

const contentDiv = document.querySelector('.content');
const startDiv = document.querySelector('.start');
const startTitle = document.querySelector('.start h1');
const startSubTitle = document.querySelector('.start h2');
const startBtn = document.querySelector('.start button');

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
let player;
let projectileArr;
let enemies;
let particleArr;
let level;
let score;
init();

canvas.addEventListener('click', (e) => {
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

const friction = 0.99;
class Particle extends Ball {
  constructor(x, y, radius, color, velocity) {
    super(x, y, radius, color);
    this.velocity = velocity;
    this.alpha = 1;
  }
  draw() {
    ctx.save();
    ctx.globalAlpha = 0.5;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
    ctx.restore();
  }
  update() {
    this.velocity.x *= 0.99;
    this.velocity.y *= 0.99;
    this.x += this.velocity.x;
    this.y += this.velocity.y;
    this.alpha -= 0.01;
    this.draw();
  }
}
let timer;
function spawnEnemies() {
  timer = setInterval(() => {
    const random = Math.floor(Math.random() * 25);
    const radius = Math.floor(random / 10) * 10 + 10;
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
    level = Math.floor(score / 1000) + 1;
    levelDiv.innerHTML = level;
    const velocity = {
      x: Math.cos(radians) * 0.5 * level,
      y: Math.sin(radians) * 0.5 * level,
    };
    enemies.push(new Enemy(x, y, radius, color, velocity));
  }, 1500 / (level + 0.05));
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
        for (let i = 0; i < enemy.radius * 2; i++) {
          //create explosions
          particleArr.push(
            new Particle(
              projectile.x,
              projectile.y,
              Math.random() * 2,
              enemy.color,
              {
                x: (Math.random() - 0.5) * (Math.random() * 4),
                y: (Math.random() - 0.5) * (Math.random() * 4),
              }
            )
          );
        }
        if (enemy.radius - 10 > 5) {
          //increase score
          score += 10;
          scoreDiv.innerHTML = score;

          gsap.to(enemy, { radius: (enemy.radius -= 10) });

          setTimeout(() => {
            projectileArr.splice(j, 1);
          }, 0);
        } else {
          score += 25;
          scoreDiv.innerHTML = score;
          setTimeout(() => {
            projectileArr.splice(j, 1);
            enemies.splice(i, 1);
          }, 0);
        }
      }
    });

    //collition between enemy and player
    const distance = Math.hypot(player.x - enemy.x, player.y - enemy.y);
    if (distance - enemy.radius - player.radius < 1) {
      //end game
      startDiv.style.display = 'flex';
      startTitle.innerHTML = `Your have ${score} points`;
      if (localStorage.getItem('score') < score) {
        localStorage.setItem('score', score);
      }
      startSubTitle.innerHTML =
        localStorage.getItem('score') <= score
          ? "It's your best score"
          : `You can play better. Your max score is ${localStorage.getItem(
              'score'
            )} points`;

      startBtn.innerHTML = 'Start New Game';

      cancelAnimationFrame(animationId);
    }
  });

  particleArr.forEach((particle, i) => {
    if (particle.alpha <= 0) {
      particleArr.splice(i, 1);
    }
    particle.update();
  });
}
function init() {
  player = new Player(canvas.width / 2, canvas.height / 2, 10, 'white');
  projectileArr = [];
  enemies = [];
  particleArr = [];
  level = 1;
  score = 0;
  levelDiv.innerHTML = level;
  scoreDiv.innerHTML = score;
}

startBtn.addEventListener('click', () => {
  init();
  clearInterval(timer);
  timer = false;
  startDiv.style.display = 'none';
  contentDiv.style.display = 'block';
  animate();
  spawnEnemies();
});
