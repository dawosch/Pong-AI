class Paddle {
  constructor(isLeft) {
    this.isLeft = isLeft;
    this.w = 10;
    this.h = 50;
    this.pos = createVector(this.isLeft ? 20 : width - 20, height / 2);
    // this.x = this.isLeft ? 20 : width - 20;
    // this.y = height / 2;
    this.brain = new Brain(3, 8, 3);
    this.speed = 4;
    this.isGameOver = false;
    this.fitness = 0;
  }

  hit = (ball) => {
    // if (this.isLeft) {
    if (this.pos.y - this.h / 2 < ball.pos.y + ball.d / 2 && this.pos.y + this.h / 2 > ball.pos.y - ball.d / 2) {
      return true;
    }
    return false;
    // } else {
    //   if (this.y - this.h / 2 < ball.y + ball.d / 2 || this.y + this.h / 2 > ball.y - ball.d / 2) {
    //     return true;
    //   }
    //   return false;
    // }
  };

  moveUp = () => {
    if (this.pos.y - this.h / 2 > 0) {
      this.pos.set(this.pos.x, this.pos.y - this.speed);
    }
  };

  moveDown = () => {
    if (this.pos.y + this.h / 2 < height) {
      this.pos.set(this.pos.x, this.pos.y + this.speed);
    }
  };

  update = (ball) => {
    // if (keyIsDown(UP_ARROW)) {
    //   this.y -= this.speed;
    // } else if (keyIsDown(DOWN_ARROW)) {
    //   this.y += this.speed;
    // }

    const input = [this.pos.y, ball.pos.y, this.pos.dist(ball.pos)];

    // console.log(input);

    const prediction = this.brain.think(input);

    switch (1) {
      case prediction[0]:
        this.moveUp();
        break;
      case prediction[1]:
        break;
      case prediction[2]:
        this.moveDown();
        break;
    }
  };

  show = () => {
    fill(255);
    rectMode(CENTER);
    rect(this.pos.x, this.pos.y, this.w, this.h);
  };
}
