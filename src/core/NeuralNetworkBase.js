import activationFunction from "./ops/activationOps.js";
import { matrixMultiply } from "./ops/matrixOps.js";
import { createRandomWeight } from "./utils/weightInit.js";

export class NeuralNetworkBase {
    constructor(networkConfig) {
        this.inputNodes = networkConfig.inputNodes;
        this.hiddenNodes = networkConfig.hiddenNodes;
        this.outputNodes = networkConfig.outputNodes;
        this.learningRate = networkConfig.learningRate;

        this.W_inputToHidden = (createRandomWeight(this.hiddenNodes, this.inputNodes));
        this.W_hiddenToOutput = (createRandomWeight(this.outputNodes, this.hiddenNodes));
    }

    // CNN operations
    feedForward(inputs) {
        const hiddenInputs = matrixMultiply(this.W_inputToHidden, inputs.map(v => [v])); //신경망 출력 결과를 Nx1 형태의 행렬곱으로 변환.
        const hiddenOutputs = activationFunction(hiddenInputs);
        const finalInputs = matrixMultiply(this.W_hiddenToOutput, hiddenOutputs);
        const finalOutputs = activationFunction(finalInputs);
        return { hiddenInputs, hiddenOutputs, finalInputs, finalOutputs };
    }

    query(inputs){
        const { finalOutputs } = this.feedForward(inputs);
        return finalOutputs;
    }
}