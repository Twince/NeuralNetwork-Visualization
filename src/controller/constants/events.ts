export const DATA_EVENTS = Object.freeze({
    QUERY_UPDATE: 'query:update',
    QUERY_CHANGED: 'query:changed',
    NODE_UPDATE: 'node:update',
    NODE_CHANGED: 'node:changed',
    RESULT_UPDATE: 'result:update',
    RESULT_CHANGED: 'result:changed',
} as const);

export const HANDLER_EVENTS = Object.freeze({
    APP_READY: 'app:ready',
    NN_INITIALIZE: 'nn:initialize',
    ICH_INITIALIZE: 'ich:initialize',
} as const);

export const DRAWING_EVENTS = Object.freeze({
    START_DRAW: 'draw:start',
    DRAW: 'draw:drawing',
    END_DRAW: 'draw:end',
    BOUNDINGBOX_UPDATE: 'boundingbox:update',
} as const);

export type DataEvent = (typeof DATA_EVENTS)[keyof typeof DATA_EVENTS];
export type HandlerEvent = (typeof DATA_EVENTS)[keyof typeof DATA_EVENTS];
export type DrawingEvent = (typeof DATA_EVENTS)[keyof typeof DATA_EVENTS];
