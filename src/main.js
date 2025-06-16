import Game from './game.js';

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreEl = document.getElementById('scoreLabel');
const timeEl = document.getElementById('timeLabel');
const pauseBtn = document.getElementById('pauseBtn');

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

const game = new Game(canvas, ctx);
let lastTime = 0;

pauseBtn.addEventListener('click', () => {
  game.togglePause();
  pauseBtn.textContent = game.paused ? 'Resume' : 'Pause';
});

function loop(timestamp) {
  const delta = timestamp - lastTime;
  lastTime = timestamp;
  game.update(delta);
  game.draw();
  scoreEl.textContent = `Score: ${game.score}`;
  timeEl.textContent = `Time: ${Math.floor(game.time / 1000)}s`;
  requestAnimationFrame(loop);
}
requestAnimationFrame(loop);
