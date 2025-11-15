interface DrawingEventHandlerParams {
    startDraw(x: number, y: number): void;
    draw(x: number, y: number): void;
    endDraw(): void;
    getTouchPosition(e: TouchEvent): { x: number; y: number };

    addEventListener(listener: EventListener): void;
}

interface DrawingEventHandlerParams {
    registerEvents: DrawingEventHandlerParams;
}
