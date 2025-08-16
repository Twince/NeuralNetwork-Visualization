import BoundingBox from "../canvasUtils/BoundingBox.js";

class AlignCanvas {
    constructor() {
        // this.canvas = document.createElement('alignCanvas');
        this.canvas = document.getElementById('alignCanvas');
        this.ctx = this.canvas.getContext('2d', { willReadFrequently: true });
        this.canvas.style.border = '2px solid red';

        const { minX, minY, maxX, maxY } = BoundingBox.coordinate;
        this.setupCanvas();
    }
    setupCanvas() {
        this.ctx.fillStyle = 'rgba(0, 0, 0)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.updateCanvasScale();
    }
    updateCanvasScale() {
        if(BoundingBox.originalObject.width > BoundingBox.originalObject.height){
            this.canvas.width = BoundingBox.originalObject.width*1.3;
            this.canvas.height = BoundingBox.originalObject.width*1.3;
        } else {
            this.canvas.width = BoundingBox.originalObject.height*1.3;
            this.canvas.height = BoundingBox.originalObject.height*1.3;
        }
    }

    centralize(path) {
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        const alignStartPosition = {
            x: (this.canvas.width - BoundingBox.originalObject.width) / 2,
            y: (this.canvas.height - BoundingBox.originalObject.height) / 2,
        }
        this.ctx.drawImage(path,
            BoundingBox.originalObject.x, BoundingBox.originalObject.y,
            BoundingBox.originalObject.width, BoundingBox.originalObject.height,
            alignStartPosition.x, alignStartPosition.y,
            BoundingBox.originalObject.width, BoundingBox.originalObject.height
            );
    }
}

export default AlignCanvas;