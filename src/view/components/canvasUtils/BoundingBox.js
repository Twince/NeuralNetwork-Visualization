class BoundingBox {
    constructor() {
        this.initialCoords = {
            minX: Infinity,
            minY: Infinity,
            maxX: -Infinity,
            maxY: -Infinity,
        }
        this.coordinate = {...this.initialCoords};
    }

    update(currentX, currentY) {
        this.coordinate = {
            minX: Math.round(Math.min(this.coordinate.minX, currentX)),
            minY: Math.round(Math.min(this.coordinate.minY, currentY)),
            maxX: Math.round(Math.max(this.coordinate.maxX, currentX)),
            maxY: Math.round(Math.max(this.coordinate.maxY, currentY)),
        }
    }

    log() {
        console.log(this.coordinate);
    }

    reset() {
        this.coordinate = {...this.initialCoords};
    }
}

export default BoundingBox;