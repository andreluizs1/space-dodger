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
    this.angle = -Math.PI / 2; // facing up
  }

  update(dt, maxWidth, maxHeight) {
    let moved = false;
    if (input.isLeft()) {
      this.x -= this.speed * dt;
      this.angle = Math.PI;
      moved = true;
    }
    if (input.isRight()) {
      this.x += this.speed * dt;
      this.angle = 0;
      moved = true;
    }
    if (input.isUp()) {
      this.y -= this.speed * dt;
      this.angle = -Math.PI / 2;
      moved = true;
    }
    if (input.isDown()) {
      this.y += this.speed * dt;
      this.angle = Math.PI / 2;
      moved = true;
    }
    this.x = Math.max(this.size, Math.min(maxWidth - this.size, this.x));
    this.y = Math.max(this.size, Math.min(maxHeight - this.size, this.y));
  }

  draw(ctx) {
    ctx.fillStyle = '#0f0';
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);
    ctx.beginPath();
    ctx.moveTo(0, -this.size);
    ctx.lineTo(-this.size, this.size);
    ctx.lineTo(this.size, this.size);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }
}
