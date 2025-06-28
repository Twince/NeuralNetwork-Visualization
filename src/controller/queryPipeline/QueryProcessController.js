import eventBus from "../EventBus.js";
import { DATA_EVENTS, HANDLER_EVENTS, DRAWING_EVENTS } from "../constants/events.js";
import DrawingEventHandler from "./DrawingEventHandler.js";
import UserInputCanvas from "../../view/components/userQuery/UserInputCanvas.js";

class QueryProcessController {
    constructor({ userInputCanvas, trackingCanvas }) {
        // const InputCanvas = new UserInputCanvas('userInputCanvas');
        if (!userInputCanvas) {
            throw new Error("QueryProcessController: userInputCanvas가 정의되지 않았습니다.");
        }
        this.userInputCanvas = userInputCanvas;
        this.trackingCanvas = trackingCanvas;
        this.drawingEvent();
        this.drawingEventHandler = new DrawingEventHandler();

        // this.drawingEventHandler.registerEvents(userInputCanvas);
        console.log("이벤트 받음.");
        this.$NN = null;
        eventBus.on(HANDLER_EVENTS.NN_INITIALIZE, (nn) => this.$NN = nn);
    }

    drawingEvent() {
        console.log("QueryProcessController: drawingEvent 실행됨.");
        eventBus.on(DRAWING_EVENTS.START_DRAW, ({x, y}) => {
            console.log("eventBus:on 실행(startDraw)");
            this.userInputCanvas.startPath(x, y);
        });
        eventBus.on(DRAWING_EVENTS.DRAW, ({x, y}) => {
            console.log("eventBus:on 실행(Drawing)");
            this.userInputCanvas.drawPath(x, y);
        });
        eventBus.on(DRAWING_EVENTS.END_DRAW, () => {
            this.userInputCanvas.endPath();
        });
        console.log("구독이 완료됨.");
    }
}

export default QueryProcessController;