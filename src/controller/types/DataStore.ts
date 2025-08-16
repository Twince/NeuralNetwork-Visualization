import { Matrix2D } from '@/core/ops/types/OpsType.ts';

export interface IDataStore {
    setQueryInfo(queryInfo: number[]): void;
    getQueryInfo(): number[];

    setNodeState(nodeState: nodeState): void;
    getNodeState(): nodeState;

    setQueryResult(queryResult: Matrix2D): void;
    getQueryResult(): Matrix2D;
}

export interface nodeState {
    inputNodes: number[];
    hiddenNodes: number[];
    outputNodes: number[];
}
