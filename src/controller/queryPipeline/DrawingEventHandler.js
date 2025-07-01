import userInputCanvas from "../../view/components/userQuery/UserInputCanvas.js";
import BoundingBox from "../../view/components/canvasUtils/BoundingBox.js";
import eventBus from "../EventBus.js";
import { DRAWING_EVENTS } from "../constants/events.js";

class DrawingEventHandler {
    constructor() {
        this.canvas = document.getElementById('userInputCanvas');
        this.ctx = this.canvas.getContext("2d");

        this.boundingBox = new BoundingBox(this.canvas.width, this.canvas.height);
        this.registerEvents();

        this.ctx.strokeStyle = 'rgba(255,255,255,0.90)';
        this.ctx.lineWidth = 20;
        this.ctx.lineCap = "round";
        this.ctx.lineJoin = 'round';
    }

    registerEvents() {
        const startDraw = (x, y) => {
            this.isDrawing = true;
            eventBus.emit(DRAWING_EVENTS.START_DRAW, {x, y});
            console.log("eventBus: emit 실행!(startDraw)");
        }

        const draw = (x, y) => {
            if (!this.isDrawing) return;
            this.boundingBox.update(x, y);
            eventBus.emit(DRAWING_EVENTS.DRAW, {x, y})
        }

        const endDraw = () => {
            this.isDrawing = false;
            this.boundingBox.log();
            eventBus.emit(DRAWING_EVENTS.END_DRAW);
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

}

export default DrawingEventHandler;