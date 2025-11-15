export interface IinitialCoords {
    minX: number;
    minY: number;
    maxX: number;
    maxY: number;
}

export interface originalObject {
    x: number;
    y: number;
    width: number;
    height: number;
}

interface BoundingBox {
    update(currentX: number, currentY: number): void;
    log(): void;
    reset(): void;
}
