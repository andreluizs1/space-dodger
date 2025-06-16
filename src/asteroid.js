export default class Asteroid {
  /**
   * Creates an asteroid from any edge
   * @param {number} width Canvas width
   * @param {number} height Canvas height
   * @param {number} speed Base speed
   * @param {number} [size]
   */
  constructor(width, height, speed, size) {
    this.size = size || Math.random() * 30 + 20;
    const edge = Math.floor(Math.random() * 4);
    this.speed = speed + Math.random() * 50;
    switch (edge) {
      case 0: // top
        this.x = Math.random() * width;
        this.y = -this.size;
        this.vx = (Math.random() - 0.5) * this.speed;
        this.vy = this.speed;
        break;
      case 1: // right
        this.x = width + this.size;
        this.y = Math.random() * height;
        this.vx = -this.speed;
        this.vy = (Math.random() - 0.5) * this.speed;
        break;
      case 2: // bottom
        this.x = Math.random() * width;
        this.y = height + this.size;
        this.vx = (Math.random() - 0.5) * this.speed;
        this.vy = -this.speed;
        break;
      default: // left
        this.x = -this.size;
        this.y = Math.random() * height;
        this.vx = this.speed;
        this.vy = (Math.random() - 0.5) * this.speed;
        break;
    }
  }

  update(dt) {
    this.x += this.vx * dt;
    this.y += this.vy * dt;
  }

  draw(ctx) {
    ctx.fillStyle = '#888';
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }

  offscreen(width, height) {
    return (
      this.x < -this.size ||
      this.x > width + this.size ||
      this.y < -this.size ||
      this.y > height + this.size
    );
  }

  collidesWith(player) {
    const dx = this.x - player.x;
    const dy = this.y - player.y;
    const distance = Math.hypot(dx, dy);
    return distance < this.size + player.size;
  }

  split() {
    if (this.size < 25) return [];
    const newSize = this.size / 2;
    const a1 = new Asteroid(0, 0, 0, newSize);
    a1.x = this.x + newSize;
    a1.y = this.y + newSize;
    a1.vx = this.vx + 50;
    a1.vy = this.vy - 50;
    const a2 = new Asteroid(0, 0, 0, newSize);
    a2.x = this.x - newSize;
    a2.y = this.y - newSize;
    a2.vx = this.vx - 50;
    a2.vy = this.vy + 50;
    return [a1, a2];
  }
}
