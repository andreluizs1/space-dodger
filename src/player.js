import * as input from "./input.js";
/**
 * Player spaceship
 */
export default class Player {
  /**
   * @param {number} x Initial x position
   * @param {number} y Initial y position
   * @param {number} size Size of the triangle ship
   */
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.speed = 300; // pixels per second
  }

  update(dt, maxWidth) {
    if (input.isLeft()) {
      this.x -= this.speed * dt;
    }
    if (input.isRight()) {
      this.x += this.speed * dt;
    }
    this.x = Math.max(this.size, Math.min(maxWidth - this.size, this.x));
  }

  draw(ctx) {
    ctx.fillStyle = '#0f0';
    ctx.beginPath();
    ctx.moveTo(this.x, this.y - this.size);
    ctx.lineTo(this.x - this.size, this.y + this.size);
    ctx.lineTo(this.x + this.size, this.y + this.size);
    ctx.closePath();
    ctx.fill();
  }
}
