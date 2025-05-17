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
        const hidden_inputs = matrixMultiply(inputs, this.W_inputToHidden);
        const hidden_outputs = activationFunction(hidden_inputs);
        const final_inputs = matrixMultiply(hidden_outputs, this.W_hiddenToOutput)
        const final_outputs = activationFunction(final_inputs);

        const output_error = targets - final_outputs;
        const hidden_error = matrixMultiply(transposeMatrix(this.W_hiddenToOutput), output_error);

        const W_hiddenToOutput_derivative = matrixMultiply(((output_error * final_outputs) * (1.0 - final_outputs)), transposeMatrix(hidden_outputs));
        this.W_hiddenToOutput += W_hiddenToOutput_derivative.map(array => array.map(v => v * this.learningRate));

        const W_inputToHidden_derrivative = matrixMultiply(((hidden_error * hidden_outputs) * (1.0 - hidden_outputs)), transposeMatrix(inputs));
        this.W_hiddenToOutput += W_inputToHidden_derrivative.map(array => array.map(v => v * this.learningRate));
    }

    query(inputs){
        const hidden_inputs = matrixMultiply(inputs, this.W_inputToHidden); // 은닉계층으로 들어가는 입력값과 가중치(입력노드 to 은닉노드) 행렬곱
        const hidden_outputs = activationFunction(hidden_inputs); // 은닉계층에서 출력되는 신호계산(활성화 함수)
        const final_inputs = matrixMultiply(hidden_outputs, this.W_hiddenToOutput) // 출력계층으로 들어가는 입력값과 가중치 행렬곱
        const final_outputs = activationFunction(final_inputs); // 출력계층에서 나가는 최종 계산결과 return
        console.log(final_inputs);
        return final_outputs;
    }
}

const $NN = new neuralNetwork({inputNodes: 3, hiddenNodes: 3, outputNodes: 3 ,learningRate: 0.2});
$NN.query([0.99, 0.5, -0.4]);