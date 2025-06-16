export default class StarField {
  constructor() {
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.canvas.style.position = 'absolute';
    this.canvas.style.top = 0;
    this.canvas.style.left = 0;
    this.canvas.style.zIndex = 0;
    document.body.appendChild(this.canvas);
    this.onResize();
    window.addEventListener('resize', () => this.onResize());

    this.starCount = 150;
    this.stars = [];
    for (let i = 0; i < this.starCount; i++) {
      this.stars.push(this.randomStar());
    }
  }

  onResize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  randomStar() {
    return {
      x: Math.random() * this.canvas.width,
      y: Math.random() * this.canvas.height,
      size: Math.random() * 2 + 1,
      speed: Math.random() * 40 + 20
    };
  }

  update(delta) {
    const dt = delta / 1000;
    for (const star of this.stars) {
      star.y += star.speed * dt;
      if (star.y > this.canvas.height) {
        star.x = Math.random() * this.canvas.width;
        star.y = 0;
      }
    }
  }

  render() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fillStyle = '#fff';
    for (const star of this.stars) {
      this.ctx.fillRect(star.x, star.y, star.size, star.size);
    }
  }
}
