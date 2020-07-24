class Ball {
  constructor() {
    this.speed = 5;
    this.pos = createVector(width / 2, height / 2);
    // this.x = width / 2;
    // this.y = height / 2;
    this.d = 10;
    this.dir = { x: random([-1, 1]), y: 0 };
  }

  changeDir = () => {
    this.dir.x = this.dir.x * -1;
    this.dir.y = random(-1, 1);
  };

  update = () => {
    if (this.pos.x < 0 || this.pos.x > width) {
      noLoop();
    }

    if (this.pos.y <= 0 || this.pos.y >= height) {
      this.dir.y *= -1;
    }

    this.pos.set(this.pos.x + this.speed * this.dir.x, this.pos.y + this.dir.y);
    // this.pos.y += this.dir.y;
  };

  show = () => {
    fill(255);
    circle(this.pos.x, this.pos.y, this.d);
  };
}
