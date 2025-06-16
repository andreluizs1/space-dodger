import Player from './player.js';
import Asteroid from './asteroid.js';
import Bullet from './bullet.js';
import * as input from './input.js';

/** Game configuration constants */
const CONFIG = {
  playerSize: 30,
  initialAsteroids: 3,
  asteroidSpawnInterval: 2000, // ms
  levelIncreaseInterval: 10000, // ms
  asteroidSpeed: 100, // pixels per second
};

export default class Game {
  /**
   * @param {HTMLCanvasElement} canvas
   * @param {CanvasRenderingContext2D} ctx
   */
  constructor(canvas, ctx) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.state = 'menu'; // menu | playing | gameover
    this.player = new Player(canvas.width / 2, canvas.height - 60, CONFIG.playerSize);
    this.asteroids = [];
    this.bullets = [];
    this.spawnTimer = 0;
    this.levelTimer = 0;
    this.spawnInterval = CONFIG.asteroidSpawnInterval;
    this.score = 0;
    this.elapsed = 0;
    this.time = 0;
    this.paused = false;
  }

  start() {
    this.state = 'playing';
    this.asteroids = [];
    this.bullets = [];
    this.spawnTimer = 0;
    this.levelTimer = 0;
    this.spawnInterval = CONFIG.asteroidSpawnInterval;
    this.score = 0;
    this.elapsed = 0;
    this.time = 0;
    this.paused = false;
  }

  gameOver() {
    this.state = 'gameover';
  }

  togglePause() {
    if (this.state !== 'playing') return;
    this.paused = !this.paused;
  }

  update(delta) {
    if (this.state === 'menu' || this.state === 'gameover') {
      if (input.isStart()) {
        this.start();
      }
      return;
    }

    if (input.isPause()) {
      this.togglePause();
    }

    if (this.paused) return;

    const dt = delta / 1000;
    this.spawnTimer += delta;
    this.levelTimer += delta;
    this.elapsed += delta;
    this.time += delta;

    if (this.spawnTimer > this.spawnInterval) {
      this.asteroids.push(new Asteroid(this.canvas.width, this.canvas.height, CONFIG.asteroidSpeed));
      this.spawnTimer = 0;
    }

    if (this.levelTimer > CONFIG.levelIncreaseInterval) {
      this.spawnInterval = Math.max(300, this.spawnInterval - 200);
      CONFIG.asteroidSpeed += 20;
      this.levelTimer = 0;
    }

    this.player.update(dt, this.canvas.width, this.canvas.height);

    if (input.isFire()) {
      this.bullets.push(new Bullet(
        this.player.x + Math.cos(this.player.angle) * this.player.size,
        this.player.y + Math.sin(this.player.angle) * this.player.size,
        this.player.angle
      ));
    }

    this.bullets.forEach(b => b.update(dt));
    this.bullets = this.bullets.filter(b => !b.offscreen(this.canvas.width, this.canvas.height));

    this.asteroids.forEach(a => a.update(dt));
    this.asteroids = this.asteroids.filter(a => !a.offscreen(this.canvas.width, this.canvas.height));

    // collision player
    for (const asteroid of this.asteroids) {
      if (asteroid.collidesWith(this.player)) {
        this.gameOver();
        break;
      }
    }

    // collision bullets
    for (let i = this.bullets.length - 1; i >= 0; i--) {
      const bullet = this.bullets[i];
      for (let j = this.asteroids.length - 1; j >= 0; j--) {
        const ast = this.asteroids[j];
        const dx = bullet.x - ast.x;
        const dy = bullet.y - ast.y;
        if (Math.hypot(dx, dy) < ast.size + bullet.size) {
          this.bullets.splice(i, 1);
          this.asteroids.splice(j, 1);
          this.asteroids.push(...ast.split());
          this.score += 5;
          break;
        }
      }
    }

    // scoring
    if (this.elapsed >= 1000) {
      this.score += 1;
      this.elapsed = 0;
    }
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    if (this.state === 'menu') {
      this.drawText('Press any key to start', this.canvas.height / 2);
      return;
    }
    if (this.state === 'gameover') {
      this.drawText('Game Over - press any key', this.canvas.height / 2);
    }

    this.player.draw(this.ctx);
    this.bullets.forEach(b => b.draw(this.ctx));
    this.asteroids.forEach(a => a.draw(this.ctx));

    // HUD (canvas for menu/game over)
    this.ctx.fillStyle = '#fff';
    if (this.paused) {
      this.drawText('Paused', this.canvas.height / 2);
    }
  }

  drawText(text, y) {
    this.ctx.fillStyle = '#fff';
    this.ctx.textAlign = 'center';
    this.ctx.font = '24px monospace';
    this.ctx.fillText(text, this.canvas.width / 2, y);
  }
}
