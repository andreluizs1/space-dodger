let left = false;
let right = false;
let start = false;

function keydown(e) {
  if (e.key === 'ArrowLeft') left = true;
  if (e.key === 'ArrowRight') right = true;
  start = true;
}
function keyup(e) {
  if (e.key === 'ArrowLeft') left = false;
  if (e.key === 'ArrowRight') right = false;
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
export function isStart() { const s = start; start = false; return s; }
