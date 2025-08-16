import { CANVAS_CONFIG } from "../../../controller/constants/canvasConfig.js";

class PathTrackingCanvas {
    constructor() {
        // this.strokeCanvas = document.createElement('pathTrackingCanvas');
        this.canvas = document.getElementById('pathTrackingCanvas');
        this.ctx = this.canvas.getContext('2d', { willReadFrequently: true });
        this.setupCanvas()
    }

    setupCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height =  window.innerHeight / 3;

        this.ctx.fillStyle = 'rgba(0, 0, 0)';
        this.ctx.strokeStyle = 'rgba(255, 255, 255)';

        this.ctx.lineWidth = CANVAS_CONFIG.lineWidth;
        this.ctx.lineCap = CANVAS_CONFIG.lineCap;
        this.ctx.lineJoin = CANVAS_CONFIG.lineJoin;

        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    startPath(x, y) {
        this.ctx.beginPath();
        this.ctx.moveTo(x, y);
    }

    drawPath(x, y) {
        this.ctx.lineTo(x, y);
        this.ctx.stroke();
    }

    endPath() {
        this.ctx.closePath();
    }
}

export default PathTrackingCanvas;