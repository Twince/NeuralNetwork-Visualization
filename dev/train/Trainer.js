import { NeuralNetworkBase } from "../../src/core/NeuralNetworkBase.js";

// matrix operations
import {matrixMultiply, transposeMatrix} from "../../src/core/ops/matrixOps.js";

export class Trainer extends NeuralNetworkBase {
    train(inputs, targets){
        // CNN operations
        const { finalOutputs, hiddenOutputs } = this.feedForward(inputs);
        // calculate errors
        const output_errors = targets.map((v, idx) => v - finalOutputs[idx]).map(v => [v]); // 출력 계층의 오차를 목표값 - 출력값으로 지정
        const hidden_errors = matrixMultiply(transposeMatrix(this.W_hiddenToOutput), output_errors); // 은닉 계층의 오차를 은닉-> 출력 계층의 가중치값과(W_hiddenToOutput.T) 출력 계층의 오차들을 재조합하여 계산

        // activation function derivative
        const activationDerivative_HtO = finalOutputs.map(v => 1.0 - v).map((v, idx) => v * finalOutputs[idx]); // hidden to output derivative
        const outputGradient = activationDerivative_HtO.map((v, idx) => v * output_errors[idx]).map(v => [v]);
        const W_HtO_Update = matrixMultiply(outputGradient, transposeMatrix(hiddenOutputs)).map(array => array.map(v => v * this.learningRate)); // 오차값을 이용해 은닉 계층과 출력 계층간의 가중치 업데이트

        const activationDerivative_ItH = hiddenOutputs.map(v => 1.0 - v).map((v, idx) => v * hiddenOutputs[idx]);
        const hiddenGradient = activationDerivative_ItH.map((v, idx) => v * hidden_errors[idx]).map(v => [v]);
        const W_ItH_update = matrixMultiply(hiddenGradient, transposeMatrix(inputs.map(v => [v]))).map(array => array.map(v => v * this.learningRate));

        // update weights
        this.W_hiddenToOutput = this.W_hiddenToOutput.map((row, i)=> row.map((v, j) => v + W_HtO_Update[i][j]));
        this.W_inputToHidden = this.W_inputToHidden.map((row, i)=> row.map((v, j) => v + W_ItH_update[i][j]));
    }
}