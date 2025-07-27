export interface INeuralNetworkBase {
    feedForward(inputs: number[]): { hiddenInputs: number[]; hiddenOutputs: number[] };
    query(inputs: number[]): number[];
}
