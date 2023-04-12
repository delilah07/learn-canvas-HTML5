import Paddle from './paddle.js';
import Ball from './ball.js';
import { InputHandler } from './input.js';

export default class Game {
  constructor(gameWidth, gameHeight) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
  }
  start() {
    this.paddle = new Paddle(this);

    new InputHandler(this.paddle);

    this.ball = new Ball(this);
  }
  update(deltaTime) {
    this.paddle.update(deltaTime);

    // ctx.drawImage(ball, 10, 10, 20, 20);
    this.ball.update(deltaTime);
  }
  draw(ctx) {
    this.paddle.draw(ctx);

    this.ball.draw(ctx);
  }
}
