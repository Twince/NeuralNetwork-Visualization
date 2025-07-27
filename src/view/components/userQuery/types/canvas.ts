export interface ICanvasBase {
    setupCanvas(): void;
    clear(): void;
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
}

export interface IUserInputCanvas extends IPathTrackingCanvas {
    drawGridDots(): void;
}
export interface IPathTrackingCanvas {
    startPath(x: number, y: number): void;
    drawPath(x: number, y: number): void;
    endPath(): void;
}
export interface IAlignCanvas {
    updateCanvasScale(): void;
    centralize(path: HTMLCanvasElement): void;
}

export interface IResizeCanvas {
    downScale(path: HTMLCanvasElement): void;
}