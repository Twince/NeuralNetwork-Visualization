import eventBus from "../EventBus.js";
import { DATA_EVENTS, HANDLER_EVENTS, DRAWING_EVENTS } from "../constants/events.js";
import DrawingEventHandler from "./DrawingEventHandler.js";
import UserInputCanvas from "../../view/components/userQuery/UserInputCanvas.js";
import PathTrackingCanvas from "../../view/components/userQuery/PathTrackingCanvas.js";
import {pixelExtractor} from "../queryPipeline/pixelExtractor.js";


class QueryProcessController {
    constructor({ userInputCanvas, trackingCanvas, alignCanvas, resizeCanvas, $NN }) {
        this.userInputCanvas = userInputCanvas;
        this.trackingCanvas = trackingCanvas;
        this.alignCanvas = alignCanvas;
        this.resizeCanvas = resizeCanvas;

        this.$NN = $NN;
        this.drawingEventHandler = new DrawingEventHandler();
        this.drawingEvent();

        this.alignCanvas.setupCanvas();
        // this.drawingEventHandler.registerEvents(userInputCanvas);
        console.log("이벤트 받음.");
        eventBus.on(HANDLER_EVENTS.NN_INITIALIZE, (nn) => this.$NN = nn);
    }

    drawingEvent() {
        console.log("QueryProcessController: drawingEvent 실행됨.");
        eventBus.on(DRAWING_EVENTS.START_DRAW, ({x, y}) => {
            console.log("eventBus:on 실행(startDraw)");
            this.userInputCanvas.startPath(x, y);
            this.trackingCanvas.startPath(x, y);

        });
        eventBus.on(DRAWING_EVENTS.DRAW, ({x, y}) => {
            console.log("eventBus:on 실행(Drawing)");
            this.userInputCanvas.drawPath(x, y);
            this.trackingCanvas.drawPath(x, y);
            this.alignCanvas.updateCanvasScale();
            this.alignCanvas.centralize(this.trackingCanvas.canvas);
            this.resizeCanvas.downScale(this.alignCanvas.canvas);
            console.log("$NN: ", this.$NN.query(pixelExtractor(this.resizeCanvas)));
        });
        eventBus.on(DRAWING_EVENTS.END_DRAW, () => {
            this.userInputCanvas.endPath();
            this.trackingCanvas.endPath();
        });
        console.log("구독이 완료됨.");
    }
}

export default QueryProcessController;