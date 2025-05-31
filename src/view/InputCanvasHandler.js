import eventBus from "../controller/EventBus.js";
import { DATA_EVENTS } from "../controller/constants/events.js";

class InputCanvasHandler {
    constructor() {
        eventBus.on(DATA_EVENTS.NODE_CHANGED, () => {});
        this.initializeCanvas();
    }

    initializeCanvas() {
        const canvas = document.getElementById('canvas');
        if (!canvas) {
            console.error("canvas element not found.");
            return;
        }

        const ctx = canvas.getContext('2d');
        if (!ctx) {
            console.error("failed to get 2D context.");
            return;
        }
        // 초기 드로잉 또는 캔버스 상태 세팅
        ctx.fillStyle = '#000000';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        console.log("✅ Canvas initialized.");
    }
}

export default InputCanvasHandler;