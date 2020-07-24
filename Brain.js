class Brain {
  constructor(inputLayers, hiddenLayers, outputLayers) {
    this.model = tf.sequential();
    this.model.add(tf.layers.dense({ inputShape: [inputLayers], units: hiddenLayers, activation: 'relu' }));
    this.model.add(tf.layers.dense({ units: outputLayers, activation: 'softmax' }));
  }

  think = (input) => {
    const prediction = this.model.predict(tf.tensor2d([input]));
    // prediction.print();
    return prediction.dataSync();
  };

  clear = () => {
    this.model.dispose();
  };
}
