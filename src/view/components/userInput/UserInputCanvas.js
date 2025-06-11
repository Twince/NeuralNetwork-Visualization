import eventBus from "../../../controller/EventBus.js";
import { DATA_EVENTS } from "../../../controller/constants/events.js";
import CanvasComponentBase from "../CanvasComponentBase.js";
import ProcessingCanvas from "./ProcessingCanvas.js";
import { DataStore } from "../../../controller/DataStore.js"
import {getBoundingBox} from "../canvasUtils/getBounding.js";

class UserInputCanvas extends CanvasComponentBase {
    constructor(canvasId) {
        super(canvasId);
        this.processingCanvas = new ProcessingCanvas();
        // this.styleConfig = styleConfig;
        this.isDrawing = false;
        this.setupCanvas();
        this.registerEvents();
        console.log("✅ Canvas initialized.");
    }

    clear = () => {
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    setupCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight / 3;
        this.processingCanvas.setupCanvas({
            width: this.canvas.width,
            height: this.canvas.height,
        });

        this.ctx.fillStyle = 'rgba(40,40,40)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.strokeStyle = 'rgba(255,255,255,0.90)';
        this.ctx.lineWidth = 20;
        this.ctx.lineCap = "round";
        this.ctx.lineJoin = 'round';
        this.drawGridDots();
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

    registerEvents() {
        let coordinate = {minX: this.canvas.width, minY: this.canvas.height, maxX: 0, maxY: 0};
        console.log(coordinate);
        const startDraw = (x, y) => {
            this.isDrawing = true;
            this.ctx.beginPath();
            this.processingCanvas.strokeCtx.beginPath();
            this.ctx.moveTo(x, y);
            this.processingCanvas.strokeCtx.moveTo(x, y);
        }

        const draw = (x, y) => {
            if (!this.isDrawing) return;
            const { minX, maxX, minY, maxY } = getBoundingBox(coordinate, x, y);
            Object.assign(coordinate, {
                minX: Math.round(minX),
                maxX: Math.round(maxX),
                minY: Math.round(minY),
                maxY: Math.round(maxY),
            });
            this.ctx.lineTo(x, y);
            this.processingCanvas.strokeCtx.lineTo(x, y);
            this.ctx.stroke();
            this.processingCanvas.strokeCtx.stroke();
            this.processingCanvas.alignToCenter(coordinate);
        }

        const endDraw = () => {
            console.log("coordinate: ", {...coordinate});
            this.isDrawing = false;
        }

        const getTouchPosition = (e) => {
            e.preventDefault();
            const touch = e.touches[0];
            const rect = this.canvas.getBoundingClientRect();
            return {
                x: touch.clientX - rect.left,
                y: touch.clientY - rect.top
            }
        }

        this.canvas.addEventListener("mousedown", (e) => {
            startDraw(e.offsetX, e.offsetY);
        });
        this.canvas.addEventListener("touchstart", (e) => {
            let {x, y} = getTouchPosition(e);
            startDraw(x, y);
        });

        this.canvas.addEventListener("mousemove", (e) => {
            draw(e.offsetX, e.offsetY);
        });
        this.canvas.addEventListener("touchmove", (e) => {
            let {x, y} = getTouchPosition(e);
            draw(x, y);
        });

        // click, touch end event
        this.canvas.addEventListener("mouseup", endDraw);
        this.canvas.addEventListener("mouseout", endDraw);
        this.canvas.addEventListener("touchend", (e) => {
            e.preventDefault();
            endDraw();
        });
    }

    getCanvasSize() {
        return {width: this.canvas.width, height: this.canvas.height};
    }
}

export default UserInputCanvas;