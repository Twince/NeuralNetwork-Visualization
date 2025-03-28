class neuralNetwork {
    constructor({inputNodes,hiddenNodes, outputNodes, learningRate}) {
        this.inputnodes = inputNodes;
        this.hiddenNodes = hiddenNodes;
        this.OutputNodes = outputNodes;

        this.learningRate = learningRate;
    }

    train(){

    }

    query(){

    }
}

const $NN = new neuralNetwork({inputNodes: 3, hiddenNodes: 3, outputNodes: 3 ,learningRate: 0.1});
