import { Matrix2D } from '../../core/ops/types/OpsType';

export interface eventPayloads {
    // Data handling event
    'query:changed': number[];
    'node:changed': { inputNodes: number[]; hiddenNodes: number[]; outputNodes: number[] };
    'result:changed': Matrix2D;

    // Canvas handling event
    'draw:start': { x: number; y: number };
    'draw:drawing': { x: number; y: number };
    'draw:end': void;
    'draw:clear': void;
    'bondingbox:update': { X: number; y: number };

    'node:update': { hiddenInputs: Matrix2D; hiddenOutputs: Matrix2D; finalOutputs: Matrix2D };
}

export interface IEventBus {
    events: object;
    on<K extends keyof eventPayloads>(
        eventName: K,
        subscriber: (payload: eventPayloads[K]) => void,
    ): void;

    off<K extends keyof eventPayloads>(
        eventName: K,
        subscriber: (payload: eventPayloads[K]) => void,
    ): void;

    emit<K extends keyof eventPayloads>(eventName: K, payload: eventPayloads[K]): void;
}
