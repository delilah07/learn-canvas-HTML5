import Paddle from "./paddle.js";
import { InputHandler } from "./input.js";

const canvas = document.querySelector("#gameScreen");
const ctx = canvas.getContext("2d");

const GAME_WIDTH = 800;
const GAME_HIGHT = 600;

ctx.clearRect(0, 0, 800, 600); //clean screen

// ctx.fillStyle = "#f00"; // add color of object
// ctx.fillRect(20, 20, 100, 100); // add object

// ctx.fillStyle = "#ff0"; //change color for another object
// ctx.fillRect(340, 300, 50, 50); //add second object

let paddle = new Paddle(GAME_WIDTH, GAME_HIGHT);

new InputHandler(paddle);

let lastTime = 0;

// move paddle
function gameLoop(timestamp) {
  let deltaTime = timestamp - lastTime; // how mush time has passed
  lastTime = timestamp;

  ctx.clearRect(0, 0, 800, 600);
  paddle.update(deltaTime);
  paddle.draw(ctx);

  requestAnimationFrame(gameLoop);
}
gameLoop();
