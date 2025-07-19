import {CANVAS_CONFIG} from "../../../controller/constants/canvasConfig.js";

class PathTrackingCanvas {
    constructor() {
        // this.strokeCanvas = document.createElement("canvas");
        this.canvas = document.getElementById('pathTrackingCanvas');
        this.ctx = this.canvas.getContext('2d', { willReadFrequently: true });
        this.alignCanvas = document.getElementById('alignCanvas');
        // this.alignCanvas = document.createElement('canvas');
        this.alignCtx = this.alignCanvas.getContext('2d', { willReadFrequently: true }) ;
        this.originCanvasCenter = {};
        this.setupCanvas()
    }

    setupCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height =  window.innerHeight / 3;
        this.canvasCenter = {x: this.canvas.width / 2, y: this.canvas.height / 2};

        this.ctx.fillStyle = 'rgba(0, 0, 0)';
        this.ctx.strokeStyle = 'rgba(255, 255, 255)';

        this.ctx.lineWidth = CANVAS_CONFIG.lineWidth;
        this.ctx.lineCap = CANVAS_CONFIG.lineCap;
        this.ctx.lineJoin = CANVAS_CONFIG.lineJoin;

        this.alignCanvas.style.border = '2px solid red'; // 눈에 보이게
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    alignToCenter({minX, maxX, minY, maxY}) {
        console.log("클리어 실행")
        const alignStartPosition= {
            x: this.canvasCenter.x - original.width / 2,
            y: this.canvasCenter.y - original.height / 2,
        }
        this.alignCtx.drawImage(this.canvas, original.x, original.y,
            original.width, original.height,
            alignStartPosition.x, alignStartPosition.y,
            original.width, original.height);
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