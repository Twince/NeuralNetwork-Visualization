import userInputCanvas from "../../view/components/userQuery/UserInputCanvas.js";
import BoundingBox from "../../view/components/canvasUtils/BoundingBox.js";
import eventBus from "../EventBus.js";
import { DRAWING_EVENTS } from "../constants/events.js";

class DrawingEventHandler {
    constructor() {
        this.inputCanvas = document.getElementById('userInputCanvas');
        this.registerEvents();
    }

    registerEvents() {
        const startDraw = (x, y) => {
            this.isDrawing = true;
            eventBus.emit(DRAWING_EVENTS.START_DRAW, {x, y});
            console.log("eventBus: emit 실행!(startDraw)");
        }

        const draw = (x, y) => {
            if (!this.isDrawing) return;
            BoundingBox.update(x, y);
            eventBus.emit(DRAWING_EVENTS.DRAW, {x, y})
        }

        const endDraw = () => {
            this.isDrawing = false;
            BoundingBox.log();
            eventBus.emit(DRAWING_EVENTS.END_DRAW);
        }

        const getTouchPosition = (e) => {
            e.preventDefault();
            const touch = e.touches[0];
            const rect = this.inputCanvas.getBoundingClientRect();
            return {
                x: touch.clientX - rect.left,
                y: touch.clientY - rect.top
            }
        }

        this.inputCanvas.addEventListener("mousedown", (e) => {
            startDraw(e.offsetX, e.offsetY);
        });
        this.inputCanvas.addEventListener("touchstart", (e) => {
            let {x, y} = getTouchPosition(e);
            startDraw(x, y);
        });

        this.inputCanvas.addEventListener("mousemove", (e) => {
            draw(e.offsetX, e.offsetY);
        });
        this.inputCanvas.addEventListener("touchmove", (e) => {
            let {x, y} = getTouchPosition(e);
            draw(x, y);
        });

        // click, touch end event
        this.inputCanvas.addEventListener("mouseup", endDraw);
        this.inputCanvas.addEventListener("mouseout", endDraw);
        this.inputCanvas.addEventListener("touchend", (e) => {
            e.preventDefault();
            endDraw();
        });
    }

}

export default DrawingEventHandler;