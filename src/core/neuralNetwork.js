import activationFunction from "./ops/activationOps.js";
import { matrixMultiply,transposeMatrix } from "./ops/matrixOps.js";
import {createRandomWeight} from "./utils/weightInit.js";

export class NeuralNetwork {
    constructor({inputNodes,hiddenNodes, outputNodes, learningRate}) {
        this.inputnodes = inputNodes;
        this.hiddenNodes = hiddenNodes;
        this.outputNodes = outputNodes;

        this.learningRate = learningRate;

        this.W_inputToHidden = (createRandomWeight(this.hiddenNodes, this.inputnodes));
        this.W_hiddenToOutput = (createRandomWeight(this.outputNodes, this.hiddenNodes));
    }

    train(inputs, targets){
        const hidden_inputs = matrixMultiply(this.W_inputToHidden, inputs.map(v => [v])); //신경망 입력 노드의 출력 결과를 Nx1 형태의 행렬곱으로 변환.
        const hidden_outputs = activationFunction(hidden_inputs);
        const final_inputs = matrixMultiply(this.W_hiddenToOutput, hidden_outputs);
        const final_outputs = activationFunction(final_inputs);

        const output_errors = targets.map((v, idx) => v - final_outputs[idx]).map(v => [v]); // 출력 계층의 오차를 목표값 - 출력값으로 지정
        const hidden_errors = matrixMultiply(transposeMatrix(this.W_hiddenToOutput), output_errors); // 은닉 계층의 오차를 은닉-> 출력 계층의 가중치값과(W_hiddenToOutput.T) 출력 계층의 오차들을 재조합하여 계산

        const activationDerivative_HtO = final_outputs.map(v => 1.0 - v).map((v, idx) => v * final_outputs[idx]); // hidden to output derivative
        const outputGradient = activationDerivative_HtO.map((v, idx) => v * output_errors[idx]).map(v => [v]);
        const W_HtO_Update = matrixMultiply(outputGradient, transposeMatrix(hidden_outputs)).map(array => array.map(v => v * this.learningRate)); // 오차값을 이용해 은닉 계층과 출력 계층간의 가중치 업데이트
        this.W_hiddenToOutput = this.W_hiddenToOutput.map((row, i)=> row.map((v, j) => v + W_HtO_Update[i][j]));

        const activationDerivative_ItH = hidden_outputs.map(v => 1.0 - v).map((v, idx) => v * hidden_outputs[idx]);
        const hiddenGradient = activationDerivative_ItH.map((v, idx) => v * hidden_errors[idx]).map(v => [v]);

        const W_ItH_update = matrixMultiply(hiddenGradient, transposeMatrix(inputs.map(v => [v]))).map(array => array.map(v => v * this.learningRate));
        this.W_inputToHidden = this.W_inputToHidden.map((row, i)=> row.map((v, j) => v + W_ItH_update[i][j]));
        // console.log("updated: W_inputToHidden", this.W_inputToHidden);
    }

    query(inputs){
        const hidden_inputs = matrixMultiply(this.W_inputToHidden, inputs.map(v => [v])); //신경망 출력 결과를 Nx1 형태의 행렬곱으로 변환.
        const hidden_outputs = activationFunction(hidden_inputs);
        const final_inputs = matrixMultiply(this.W_hiddenToOutput, hidden_outputs);
        const final_outputs = activationFunction(final_inputs);
        return final_outputs;
    }
}

export const networkInfo = {inputNodes: 784, hiddenNodes: 200, outputNodes: 10, learningRate: 0.15};