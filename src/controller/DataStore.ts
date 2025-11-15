import eventBus from './EventBus.js';
import { DATA_EVENTS } from './constants/events.js';
import { RENDERER_CONFIG } from '@/controller/constants/rendererConfig.ts';
const { displayNodes, displayEdges } = RENDERER_CONFIG;

import { nodeState } from './types/DataStore';
import { Matrix2D } from '@/core/ops/types/OpsType.ts';
import { NodeObjectSet } from '@/controller/perceptron/types/nodeObjectSet.ts';

class DataStore {
    private queryInfo: number[] | null = null;
    private nodeState: nodeState | null = null;
    private queryResult: Matrix2D | null = null;

    private PERCEPTRON_CONFIG: { displayNodes: number; displayEdges: number } = null;

    constructor() {
        this.queryInfo = null;
        this.nodeState = null;
        this.queryResult = null;

        this.PERCEPTRON_CONFIG = { displayNodes: displayNodes, displayEdges: displayEdges };
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
        eventBus.emit(DATA_EVENTS.NODE_CHANGED, {
            inputs: nodeState.inputs,
            hiddenOutputs: nodeState.hiddenOutputs,
            finalOutputs: nodeState.finalOutputs,
        });
    }
    getNodeState(): nodeState {
        return this.nodeState;
    }

    setQueryResult(queryResult: Matrix2D): void {
        if (queryResult === null) throw new Error('No query result found');
        this.queryResult = queryResult;
        eventBus.emit(DATA_EVENTS.RESULT_CHANGED, queryResult);
    }
    getQueryResult(): Matrix2D | null {
        return this.queryResult;
    }

    setPerceptronConfig(perceptronConfig: { displayNodes: number; displayEdges: number }): void {
        this.PERCEPTRON_CONFIG = perceptronConfig;
    }
    getPerceptronConfig(): { displayNodes: number; displayEdges: number } {
        return this.PERCEPTRON_CONFIG;
    }

    resetPerceptronState(): void {
        this.queryInfo = null;
        this.nodeState = null;
        this.queryResult = null;
    }
}

export default new DataStore();
