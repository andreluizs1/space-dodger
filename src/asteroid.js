export default class Asteroid {
  /**
   * Creates an asteroid at a random x at top
   * @param {number} maxWidth Canvas width
   * @param {number} speed Base speed
   */
  constructor(maxWidth, speed) {
    this.size = Math.random() * 20 + 20;
    this.x = Math.random() * (maxWidth - this.size*2) + this.size;
    this.y = -this.size;
    this.speed = speed + Math.random() * 50;
  }

  update(dt) {
    this.y += this.speed * dt;
  }

  draw(ctx) {
    ctx.fillStyle = '#888';
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }

  offscreen(height) {
    return this.y - this.size > height;
  }

  collidesWith(player) {
    const dx = this.x - player.x;
    const dy = this.y - player.y;
    const distance = Math.hypot(dx, dy);
    return distance < this.size + player.size;
  }
}
