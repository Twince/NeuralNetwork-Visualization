import eventBus from "../../../controller/EventBus.js";
import { DATA_EVENTS } from "../../../controller/constants/events.js";
import drawingEventHandler from "../../../controller/queryPipeline/DrawingEventHandler.js";
import CanvasComponentBase from "../CanvasComponentBase.js";
import PathTrackingCanvas from "./PathTrackingCanvas.js";
import { DataStore } from "../../../controller/DataStore.js"
import DrawingEventHandler from "../../../controller/queryPipeline/DrawingEventHandler.js";
import { CANVAS_CONFIG } from "../../../controller/constants/canvasConfig.js";

class UserInputCanvas {
    constructor() {
        this.canvas = document.getElementById('userInputCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.isDrawing = false;
        this.setupCanvas();
        // this.registerEvents();

        this.ctx.strokeStyle = 'rgba(255,255,255,0.90)';
        this.ctx.lineWidth = CANVAS_CONFIG.lineWidth;
        this.ctx.lineCap = CANVAS_CONFIG.lineCap;
        this.ctx.lineJoin = CANVAS_CONFIG.lineJoin;
        console.log("✅ Canvas initialized.");
    }

    clear = () => {
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    setupCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight / 3;
        // this.processingCanvas.setupCanvas({
        //     width: this.canvas.width,
        //     height: this.canvas.height,
        // });

        this.ctx.fillStyle = 'rgba(40,40,40)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.drawGridDots();
        console.log("canvas setup!");
    }

    drawGridDots() {
        const drawCircle = (x, y) => {
            this.ctx.beginPath();
            this.ctx.fillStyle = 'rgba(255,255,255,0.3)';
            this.ctx.arc(x, y, 1, 0, 2 * Math.PI);
            this.ctx.fill();
        }

        for (let x = 5; x < this.canvas.width; x += 12) {
            for (let y = 5; y < this.canvas.height; y += 12) {
                drawCircle(x, y);
            }
        }
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


    getCanvasSize() {
        return {width: this.canvas.width, height: this.canvas.height};
    }
}

export default UserInputCanvas;