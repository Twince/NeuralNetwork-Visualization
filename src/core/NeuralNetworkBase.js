import activationFunction from "./ops/activationOps.js";
import { matrixMultiply } from "./ops/matrixOps.js";
import eventBus from "../controller/EventBus.js";
import { DATA_EVENTS } from "../controller/constants/events.js";
import { NETWORK_CONFIG } from "../controller/constants/networkConfig.js";

class NeuralNetworkBase {
    constructor(weights) {
        this.inputNodes = NETWORK_CONFIG.inputNodes;
        this.hiddenNodes = NETWORK_CONFIG.hiddenNodes;
        this.outputNodes = NETWORK_CONFIG.outputNodes;
        this.learningRate = NETWORK_CONFIG.learningRate;

        this.W_inputToHidden = weights?.W_inputToHidden ?? null;
        this.W_hiddenToOutput = weights?.W_hiddenToOutput ?? null;
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
        const { hiddenInputs, hiddenOutputs , finalOutputs } = this.feedForward(inputs);
        eventBus.emit(DATA_EVENTS.NODE_UPDATE, {hiddenInputs, hiddenOutputs, finalOutputs});
        return finalOutputs;
    }
}

export default NeuralNetworkBase;