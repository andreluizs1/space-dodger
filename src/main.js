import Game from './game.js';

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

const game = new Game(canvas, ctx);
let lastTime = 0;

function loop(timestamp) {
  const delta = timestamp - lastTime;
  lastTime = timestamp;
  game.update(delta);
  game.draw();
  requestAnimationFrame(loop);
}
requestAnimationFrame(loop);
