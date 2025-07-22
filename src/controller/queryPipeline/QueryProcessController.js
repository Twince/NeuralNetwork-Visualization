import eventBus from "../EventBus.js";
import { DATA_EVENTS, HANDLER_EVENTS, DRAWING_EVENTS } from "../constants/events.js";
import DrawingEventHandler from "./DrawingEventHandler.js";
import {pixelExtractor} from "../queryPipeline/pixelExtractor.js";
import {throttle} from "../queryPipeline/throttle.js";


class QueryProcessController {
    constructor({ userInputCanvas, trackingCanvas, alignCanvas, resizeCanvas, $NN }) {
        const drawingEventHandler = new DrawingEventHandler(); // QueryProcessController와 1:1 관계를 위해 강결합(strong coupling) 추구
        this.userInputCanvas = userInputCanvas;
        this.trackingCanvas = trackingCanvas;
        this.alignCanvas = alignCanvas;
        this.resizeCanvas = resizeCanvas;

        this.$NN = $NN;
        this.drawingEvent();
    }

    drawingEvent() {
        const throttleQuery = throttle((inputs) => {
            const result = this.$NN.query(inputs);
            if(result) {
                eventBus.emit(DATA_EVENTS.RESULT_CHANGED, result);
                // Array 중 가장 값이 큰 값의 index number가 추론 결과
            }
        },100);

        eventBus.on(DRAWING_EVENTS.START_DRAW, ({x, y}) => {
            this.userInputCanvas.startPath(x, y);
            this.trackingCanvas.startPath(x, y);
        });
        eventBus.on(DRAWING_EVENTS.DRAW, ({x, y}) => {
            this.userInputCanvas.drawPath(x, y);
            this.trackingCanvas.drawPath(x, y);
            this.alignCanvas.updateCanvasScale();
            this.alignCanvas.centralize(this.trackingCanvas.canvas);
            this.resizeCanvas.downScale(this.alignCanvas.canvas);
            throttleQuery(pixelExtractor(this.resizeCanvas));
        });
        eventBus.on(DRAWING_EVENTS.END_DRAW, () => {
            this.userInputCanvas.endPath();
            this.trackingCanvas.endPath();
        });
    }
}

export default QueryProcessController;