import activationFunction from "./utils/activationFunctoins.js";
import { createRandomWeight } from "./utils/matrixUtils.js";

class neuralNetwork {
    constructor({inputNodes,hiddenNodes, outputNodes, learningRate}) {
        this.inputnodes = inputNodes;
        this.hiddenNodes = hiddenNodes;
        this.outputNodes = outputNodes;

        this.learningRate = learningRate;

        this.W_inputTohidden = (createRandomWeight(this.inputnodes, this.hiddenNodes));
        this.W_hiddenToOutput = (createRandomWeight(this.hiddenNodes, this.outputNodes));
    }

    train(inputs, targets){

    }

    query(inputs){

    }
}

const $NN = new neuralNetwork({inputNodes: 3, hiddenNodes: 3, outputNodes: 3 ,learningRate: 0.1});
