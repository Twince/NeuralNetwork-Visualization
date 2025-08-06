import eventBus from './EventBus.js';
import { DATA_EVENTS } from './constants/events.js';

import { nodeState } from './types/DataStore';

class DataStore {
    private queryInfo: number[] | null = null;
    private nodeState: nodeState | null = null;
    private queryResult: number[] | null = null;

    constructor() {
        this.queryInfo = null;
        this.nodeState = null;
        this.queryResult = null;
    }

    setQueryInfo(queryInfo: number[]): void {
        if (queryInfo === null) throw new Error('No query info found');
        this.queryInfo = queryInfo;
        eventBus.emit(DATA_EVENTS.QUERY_CHANGED, this.queryInfo);
    }
    getQueryInfo(): number[] {
        return this.queryInfo;
    }

    setNodeState(nodeState: nodeState): void {
        if (nodeState === null) throw new Error('No node state found');
        this.nodeState = nodeState;
    }
    getNodeState(): nodeState {
        return this.nodeState;
    }

    setQueryResult(queryResult: number[]): void {
        if (queryResult === null) throw new Error('No query result found');
        this.queryResult = queryResult;
        eventBus.emit(DATA_EVENTS.RESULT_CHANGED, queryResult);
    }
    getQueryResult() {
        return this.queryResult;
    }

    reset() {
        this.queryInfo = null;
        this.nodeState = null;
        this.queryResult = null;
    }
}

export default DataStore;
