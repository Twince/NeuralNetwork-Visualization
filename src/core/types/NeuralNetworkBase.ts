import { Matrix2D } from '@/core/ops/types/OpsType.ts';

export interface INeuralNetworkBase {
    feedForward(inputs: number[]): {
        hiddenOutputs: Matrix2D;
        finalOutputs: Matrix2D;
    };
    query(inputs: number[]): Matrix2D;
}
