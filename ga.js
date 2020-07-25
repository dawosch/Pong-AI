class GeneticAlgorithm {
  constructor() {}

  calculateFitness = () => {
    let totalScoreLeft = 0;
    let totalScoreRight = 0;

    for (let i = 0; i < POPULATION; i++) {
      leftPaddles[i].score = pow(2, leftPaddles[i].score);
      totalScoreLeft += leftPaddles[i].score;
      rightPaddles[i].score = pow(2, rightPaddles[i].score);
      totalScoreRight += rightPaddles[i].score;
    }

    for (let i = 0; i < POPULATION; i++) {
      leftPaddles[i].fitness = leftPaddles[i].score / totalScoreLeft;
      rightPaddles[i].fitness = rightPaddles[i].score / totalScoreRight;
    }
  };

  selectOne = (isLeft) => {
    const parents = isLeft ? leftPaddles : rightPaddles;
    let i = 0;
    let r = random();

    while (r > 0) {
      r -= parents[i].fitness;
      i++;
    }
    i--;

    const parent = parents[i];
    const child = new Paddle(isLeft);
    child.brain = parent.brain.clone();
    child.brain.mutate(0.1);

    return child;
  };

  crossover = (a, b) => {};
}
