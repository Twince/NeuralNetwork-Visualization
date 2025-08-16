import { IinitialCoords, originalObject } from './types';

class BoundingBox {
    private readonly initialCoords: IinitialCoords;
    private coordinate: IinitialCoords;
    private originalObject: originalObject;

    constructor() {
        this.initialCoords = {
            minX: Infinity,
            minY: Infinity,
            maxX: -Infinity,
            maxY: -Infinity,
        };
        this.coordinate = { ...this.initialCoords };
        this.originalObject = {
            x: 0,
            y: 0,
            width: 0,
            height: 0,
        };
    }

    getOriginalObject(): Readonly<originalObject> {
        return { ...this.originalObject };
    }

    update(currentX: number, currentY: number): void {
        this.coordinate = {
            minX: Math.round(Math.min(this.coordinate.minX, currentX)),
            minY: Math.round(Math.min(this.coordinate.minY, currentY)),
            maxX: Math.round(Math.max(this.coordinate.maxX, currentX)),
            maxY: Math.round(Math.max(this.coordinate.maxY, currentY)),
        };
        Object.assign(this.originalObject, {
            x: this.coordinate.minX - 20,
            y: this.coordinate.minY - 20,
            width: this.coordinate.maxX + 40 - this.coordinate.minX,
            height: this.coordinate.maxY + 40 - this.coordinate.minY,
        });
    }

    log(): void {
        console.log(this.coordinate);
        console.log(this.originalObject);
    }

    reset(): void {
        this.coordinate = { ...this.initialCoords };
    }
}

export default new BoundingBox();
