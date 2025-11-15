export const CANVAS_CONFIG = Object.freeze({
    lineWidth: 20,
    lineCap: 'round',
    lineJoin: 'round',
} as const);

export type CanvasConfig = (typeof CANVAS_CONFIG)[keyof typeof CANVAS_CONFIG];
