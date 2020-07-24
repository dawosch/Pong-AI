let ball;
let leftPaddles;
let rightPaddles;

const POPULATION = 1;

function init() {
  ball = new Ball();
  leftPaddles = [];
  rightPaddles = [];

  for (let i = 0; i < POPULATION; i++) {
    leftPaddles.push(new Paddle(true));
    rightPaddles.push(new Paddle());
  }
}

function gameover() {
  calculateFitness();
  // crossover();
  init();
  loop();
}

function setup() {
  createCanvas(600, 400);

  init();
}

function draw() {
  background(0);

  // const ballDir = {x: random()
  let activePlayersLeft = POPULATION;
  let activePlayersRight = POPULATION;

  for (let i = 0; i < POPULATION; i++) {
    const leftPaddle = leftPaddles[i];
    const rightPaddle = rightPaddles[i];

    if (!leftPaddle.isGameOver) {
      if (leftPaddle.pos.x === ball.pos.x) {
        const isHit = leftPaddle.hit(ball);
        if (isHit) {
          leftPaddle.fitness += 1;
          if (ball.dir.x === -1) ball.changeDir();
        } else {
          leftPaddle.isGameOver = true;
        }
      }

      leftPaddle.update(ball);
      leftPaddle.show();
    } else {
      activePlayersLeft--;
    }

    if (!rightPaddle.isGameOver) {
      if (rightPaddle.pos.x === ball.pos.x) {
        const isHit = rightPaddle.hit(ball);
        if (isHit) {
          rightPaddle.fitness += 1;
          if (ball.dir.x === 1) ball.changeDir();
        } else {
          rightPaddle.isGameOver = true;
        }
      }

      rightPaddle.update(ball);
      rightPaddle.show();
    } else {
      activePlayersRight--;
    }

    if (activePlayersLeft === 0 || activePlayersRight === 0) {
      noLoop();
      gameover();
    }
  }

  ball.update();
  ball.show();
}
