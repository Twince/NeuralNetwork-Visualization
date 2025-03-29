import activationFunction from "./utils/activationFunctoins.js";
import { createRandomMatrix } from "./utils/matrixUtils.js";

class neuralNetwork {
    constructor({inputNodes,hiddenNodes, outputNodes, learningRate}) {
        this.inputnodes = inputNodes;
        this.hiddenNodes = hiddenNodes;
        this.outputNodes = outputNodes;

        this.learningRate = learningRate;

        this.W_inputTohidden = (createRandomMatrix(3, 3));
        this.W_hiddenToOutput = (createRandomMatrix(3, 3));
    }

    train(){

    }

    query(){

    }
}

const $NN = new neuralNetwork({inputNodes: 3, hiddenNodes: 3, outputNodes: 3 ,learningRate: 0.1});
