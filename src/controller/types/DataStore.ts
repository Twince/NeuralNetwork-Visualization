import { Matrix2D } from '@/core/ops/types/OpsType.ts';
import { NodeObjectSet } from '@/controller/perceptron/types/nodeObjectSet.ts';

export interface IDataStore {
    setQueryInfo(queryInfo: number[]): void;
    getQueryInfo(): number[];

    setNodeState(nodeState: NodeObjectSet): void;
    getNodeState(): NodeObjectSet;

    setQueryResult(queryResult: Matrix2D): void;
    getQueryResult(): Matrix2D;
}

export interface nodeState {
    inputs: number[];
    hiddenOutputs: number[][];
    finalOutputs: number[][];
}
