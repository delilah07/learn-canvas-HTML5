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

    this.gameObject = [this.ball, this.paddle];
  }
  update(deltaTime) {
    // this.paddle.update(deltaTime);
    // this.ball.update(deltaTime);
    this.gameObject.forEach((el) => el.update(deltaTime));
  }
  draw(ctx) {
    // this.paddle.draw(ctx);
    // this.ball.draw(ctx);
    this.gameObject.forEach((el) => el.draw(ctx));
  }
}
