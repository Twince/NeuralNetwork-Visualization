import activationFunction from './ops/activationOps.js';
import { matrixMultiply } from './ops/matrixOps.js';
import eventBus from '../controller/EventBus.js';
import { DATA_EVENTS } from '../controller/constants/events.js';

import { weights } from '../controller/types/weights';

class NeuralNetworkBase {
    private readonly W_inputToHidden: number[][] | null;
    private readonly W_hiddenToOutput: number[][] | null;

    constructor(weights: Partial<weights>) {
        // weight를 optional하게 처리하기 위해 Partial 사용
        this.W_inputToHidden = weights?.W_inputToHidden ?? null;
        this.W_hiddenToOutput = weights?.W_hiddenToOutput ?? null;
    }

    // CNN operations
    feedForward(inputs: number[]): {
        hiddenInputs: number[];
        hiddenOutputs: number[];
        finalOutputs: number[];
    } {
        const hiddenInputs: number[] = matrixMultiply(
            this.W_inputToHidden,
            inputs.map((v) => [v]),
        ); //신경망 출력 결과를 Nx1 형태의 행렬곱으로 변환.
        const hiddenOutputs: number[] = activationFunction(hiddenInputs);
        const finalInputs: number[] = matrixMultiply(this.W_hiddenToOutput, hiddenOutputs);
        const finalOutputs: number[] = activationFunction(finalInputs);
        return { hiddenInputs, hiddenOutputs, finalOutputs };
    }

    query(inputs: number[]): number[] {
        const { hiddenInputs, hiddenOutputs, finalOutputs } = this.feedForward(inputs);
        eventBus.emit(DATA_EVENTS.NODE_UPDATE, { hiddenInputs, hiddenOutputs, finalOutputs });
        return finalOutputs;
    }
}

export default NeuralNetworkBase;
