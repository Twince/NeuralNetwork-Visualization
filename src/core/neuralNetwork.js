import activationFunction from "./utils/activationFunctoins.js";
import { createRandomWeight, matrixMultiply,transposeMatrix } from "./utils/matrixUtils.js";

class neuralNetwork {
    constructor({inputNodes,hiddenNodes, outputNodes, learningRate}) {
        this.inputnodes = inputNodes;
        this.hiddenNodes = hiddenNodes;
        this.outputNodes = outputNodes;

        this.learningRate = learningRate;

        this.W_inputToHidden = (createRandomWeight(this.inputnodes, this.hiddenNodes));
        this.W_hiddenToOutput = (createRandomWeight(this.hiddenNodes, this.outputNodes));
        console.log("생성자 생성 완료");
        console.log("Weight_InputToHidden:", this.W_inputToHidden);
        console.log("Weight_hiddenToOutput:", this.W_hiddenToOutput);
    }

    train(inputs, targets){
        console.log("inputs", inputs.map(v => [v]));
        const hidden_inputs = matrixMultiply(this.W_inputToHidden, inputs.map(v => [v])); //신경망 출력 결과를 Nx1 형태의 행렬곱으로 변환.
        const hidden_outputs = activationFunction(hidden_inputs);
        const final_inputs = matrixMultiply(this.W_hiddenToOutput, hidden_outputs);
        const final_outputs = activationFunction(final_inputs);

        const output_errors = targets.map((v, idx) => v - final_outputs[idx]).map(v => [v]); // 출력 계층의 오차를 목표값 - 출력값으로 지정
        const hidden_errors = matrixMultiply(transposeMatrix(this.W_hiddenToOutput), output_errors); // 은닉 계층의 오차를 은닉-> 출력 계층의 가중치값과(W_hiddenToOutput.T) 출력 계층의 오차들을 재조합하여 계산

        const activationFunction_derivative = final_outputs.map(v => 1.0 - v).map((v, idx) => v * final_outputs[idx]);
        const outputGradient = activationFunction_derivative.map((v, idx) => v * output_errors[idx]).map(v => [v]);
        this.W_hiddenToOutput = matrixMultiply(outputGradient, transposeMatrix(hidden_outputs)).map(array => array.map(v => v * this.learningRate)); // 오차값을 이용해 은닉 계층과 출력 계층간의 가중치 업데이트
    }

    query(inputs){
        const hidden_inputs = matrixMultiply(inputs, this.W_inputToHidden); // 은닉계층으로 들어가는 입력값과 가중치(입력노드 to 은닉노드) 행렬곱
        const hidden_outputs = activationFunction(hidden_inputs); // 은닉계층에서 출력되는 신호계산(활성화 함수)
        const final_inputs = matrixMultiply(hidden_outputs, this.W_hiddenToOutput) // 출력계층으로 들어가는 입력값과 가중치 행렬곱
        const final_outputs = activationFunction(final_inputs); // 출력계층에서 나가는 최종 계산결과 return
        console.log("query: ",final_outputs);
        return final_outputs;
    }
}

const $NN = new neuralNetwork({inputNodes: 3, hiddenNodes: 3, outputNodes: 3  ,learningRate: 0.2});
$NN.query([0.99, 0.5, -0.4]);
$NN.train([0.22, 0.24, -0.3], [0.10, 0.5, -0.7]);