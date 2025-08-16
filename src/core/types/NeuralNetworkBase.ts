import { Matrix2D } from '../ops/types/OpsType.ts';

export interface INeuralNetworkBase {
    feedForward(inputs: number[]): {
        hiddenInputs: Matrix2D;
        hiddenOutputs: Matrix2D;
        finalOutputs: Matrix2D;
    };
    query(inputs: number[]): Matrix2D;
}
