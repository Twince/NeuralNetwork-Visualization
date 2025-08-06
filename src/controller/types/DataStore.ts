export interface IDataStore {
    setQueryInfo(queryInfo: number[]): void;
    getQueryInfo(): number[];

    setNodeState(nodeState: nodeState): void;
    getNodeState(): nodeState;

    setQueryResult(queryResult: number[]): void;
    getQueryResult(): number[];
}

export interface nodeState {
    inputNodes: number[];
    hiddenNodes: number[];
    outputNodes: number[];
}
