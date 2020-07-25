class Brain {
  constructor(inputLayers, hiddenLayers, outputLayers) {
    this.inputLayers = inputLayers;
    this.hiddenLayers = hiddenLayers;
    this.outputLayers = outputLayers;
    this.model = tf.sequential();
    this.model.add(tf.layers.dense({ inputShape: [inputLayers], units: hiddenLayers, activation: 'relu' }));
    this.model.add(tf.layers.dense({ units: outputLayers, activation: 'softmax' }));
  }

  think = (input) => {
    const prediction = this.model.predict(tf.tensor2d([input]));
    // prediction.print();
    return prediction.dataSync();
  };

  clone = () => {
    return tf.tidy(() => {
      const brainCopy = new Brain(this.inputLayers, this.hiddenLayers, this.outputLayers);
      const weights = this.model.getWeights();
      const weightCopies = [];
      for (let i = 0; i < weights.length; i++) {
        weightCopies[i] = weights[i].clone();
      }
      brainCopy.model.setWeights(weightCopies);
      return brainCopy;
    });
  };

  mutate = (rate) => {
    tf.tidy(() => {
      const weights = this.model.getWeights();
      const mutatedWeights = [];
      for (let i = 0; i < weights.length; i++) {
        let tensor = weights[i];
        let shape = weights[i].shape;
        let values = tensor.dataSync().slice();
        for (let j = 0; j < values.length; j++) {
          if (rate > random()) {
            let w = values[j];
            values[j] = w + randomGaussian();
          }
        }
        let newTensor = tf.tensor(values, shape);
        mutatedWeights[i] = newTensor;
      }
      this.model.setWeights(mutatedWeights);
    });
  };

  clear = () => {
    this.model.dispose();
  };
}
