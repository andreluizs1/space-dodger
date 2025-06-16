let left = false;
let right = false;
let up = false;
let down = false;
let fire = false;
let start = false;
let pause = false;

function keydown(e) {
  if (e.key === 'ArrowLeft') left = true;
  if (e.key === 'ArrowRight') right = true;
  if (e.key === 'ArrowUp') up = true;
  if (e.key === 'ArrowDown') down = true;
  if (e.key === ' ') fire = true;
  if (e.key === 'p' || e.key === 'P') pause = true;
  start = true;
}
function keyup(e) {
  if (e.key === 'ArrowLeft') left = false;
  if (e.key === 'ArrowRight') right = false;
  if (e.key === 'ArrowUp') up = false;
  if (e.key === 'ArrowDown') down = false;
}

function touchmove(e) {
  const touch = e.touches[0];
  const mid = window.innerWidth / 2;
  left = touch.clientX < mid;
  right = touch.clientX >= mid;
  start = true;
}

window.addEventListener('keydown', keydown);
window.addEventListener('keyup', keyup);
window.addEventListener('touchstart', touchmove);
window.addEventListener('touchmove', touchmove);

export function isLeft() { return left; }
export function isRight() { return right; }
export function isUp() { return up; }
export function isDown() { return down; }
export function isFire() { const f = fire; fire = false; return f; }
export function isPause() { const p = pause; pause = false; return p; }
export function isStart() { const s = start; start = false; return s; }
