import Player from './player.js';
import Asteroid from './asteroid.js';
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
    this.spawnTimer = 0;
    this.levelTimer = 0;
    this.spawnInterval = CONFIG.asteroidSpawnInterval;
    this.score = 0;
    this.elapsed = 0;
  }

  start() {
    this.state = 'playing';
    this.asteroids = [];
    this.spawnTimer = 0;
    this.levelTimer = 0;
    this.spawnInterval = CONFIG.asteroidSpawnInterval;
    this.score = 0;
    this.elapsed = 0;
  }

  gameOver() {
    this.state = 'gameover';
  }

  update(delta) {
    if (this.state === 'menu' || this.state === 'gameover') {
      if (input.isStart()) {
        this.start();
      }
      return;
    }

    const dt = delta / 1000;
    this.spawnTimer += delta;
    this.levelTimer += delta;
    this.elapsed += delta;

    if (this.spawnTimer > this.spawnInterval) {
      this.asteroids.push(new Asteroid(this.canvas.width, CONFIG.asteroidSpeed));
      this.spawnTimer = 0;
    }

    if (this.levelTimer > CONFIG.levelIncreaseInterval) {
      this.spawnInterval = Math.max(300, this.spawnInterval - 200);
      CONFIG.asteroidSpeed += 20;
      this.levelTimer = 0;
    }

    this.player.update(dt, this.canvas.width);

    this.asteroids.forEach(a => a.update(dt));
    this.asteroids = this.asteroids.filter(a => !a.offscreen(this.canvas.height));

    // collision
    for (const asteroid of this.asteroids) {
      if (asteroid.collidesWith(this.player)) {
        this.gameOver();
        break;
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
    this.asteroids.forEach(a => a.draw(this.ctx));

    // HUD
    this.ctx.fillStyle = '#fff';
    this.ctx.fillText(`Score: ${this.score}`, 20, 20);
  }

  drawText(text, y) {
    this.ctx.fillStyle = '#fff';
    this.ctx.textAlign = 'center';
    this.ctx.font = '24px monospace';
    this.ctx.fillText(text, this.canvas.width / 2, y);
  }
}
