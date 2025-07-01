export const DATA_EVENTS = Object.freeze({
    QUERY_UPDATE: 'query:update',
    QUERY_CHANGED: 'query:changed',
    NODE_UPDATE: 'node:update',
    NODE_CHANGED: 'node:changed',
    RESULT_UPDATE: 'result:update',
    RESULT_CHANGED: 'result:changed'
});

export const HANDLER_EVENTS = Object.freeze({
    APP_READY: 'app:ready',
    NN_INITIALIZE: 'nn:initialize',
    ICH_INITIALIZE: 'ich:initialize',
})

export const DRAWING_EVENTS = Object.freeze({
    START_DRAW: 'draw: start',
    DRAW: 'draw: drawing',
    END_DRAW: 'draw: end',
    BOUNDINGBOX_UPDATE: 'boundingbox:update',
})