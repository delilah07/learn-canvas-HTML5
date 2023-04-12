import Game from './game.js';

const canvas = document.querySelector('#gameScreen');
const ctx = canvas.getContext('2d');

const GAME_WIDTH = 800;
const GAME_HIGHT = 600;

ctx.clearRect(0, 0, GAME_WIDTH, GAME_HIGHT); //clean screen

// ctx.fillStyle = "#f00"; // add color of object
// ctx.fillRect(20, 20, 100, 100); // add object

// ctx.fillStyle = "#ff0"; //change color for another object
// ctx.fillRect(340, 300, 50, 50); //add second object

const game = new Game(GAME_WIDTH, GAME_HIGHT);
game.start();

let lastTime = 0;

// move paddle
function gameLoop(timestamp) {
  let deltaTime = timestamp - lastTime; // how mush time has passed
  lastTime = timestamp;

  ctx.clearRect(0, 0, 800, 600);
  game.update(deltaTime);
  game.draw(ctx);

  requestAnimationFrame(gameLoop);
}
requestAnimationFrame(gameLoop);
