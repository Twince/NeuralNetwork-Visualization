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

    update(x, y) {
        this.coordinate = {
            minX: Math.round(Math.min(this.coordinate.minX, x)),
            minY: Math.round(Math.min(this.coordinate.minY, y)),
            maxX: Math.round(Math.max(this.coordinate.maxX, x)),
            maxY: Math.round(Math.max(this.coordinate.maxY, y)),
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