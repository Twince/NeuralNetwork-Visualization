import eventBus from '../EventBus.js';
import { DATA_EVENTS, DRAWING_EVENTS } from '../constants/events.js';
import DrawingEventHandler from './DrawingEventHandler.js';
import { pixelExtractor } from './pixelExtractor.js';
import { throttle } from './throttle';

import { IQueryProcessControllerProps } from './types/QueryProcessController.js';
import {
    ICanvasBase,
    IUserInputCanvas,
    IPathTrackingCanvas,
    IAlignCanvas,
    IResizeCanvas,
} from '../../view/components/userQuery/types/canvas';
import { INeuralNetworkBase } from '../../core/types/NeuralNetworkBase';

class QueryProcessController {
    private readonly userInputCanvas: ICanvasBase & IUserInputCanvas;
    private readonly trackingCanvas: ICanvasBase & IPathTrackingCanvas;
    private readonly alignCanvas: ICanvasBase & IAlignCanvas;
    private readonly resizeCanvas: ICanvasBase & IResizeCanvas;
    private readonly $NN: INeuralNetworkBase;

    constructor({
        userInputCanvas,
        trackingCanvas,
        alignCanvas,
        resizeCanvas,
        $NN,
    }: IQueryProcessControllerProps) {
        new DrawingEventHandler();
        this.userInputCanvas = userInputCanvas;
        this.trackingCanvas = trackingCanvas;
        this.alignCanvas = alignCanvas;
        this.resizeCanvas = resizeCanvas;

        this.$NN = $NN;
        this.drawingEvent();
    }

    drawingEvent(): void {
        const throttleQuery = throttle((inputs) => {
            const result: number[] = this.$NN.query(inputs);
            if (result) {
                eventBus.emit(DATA_EVENTS.RESULT_CHANGED, result);
            }
        }, 100);

        eventBus.on(DRAWING_EVENTS.START_DRAW, ({ x, y }) => {
            this.userInputCanvas.startPath(x, y);
            this.trackingCanvas.startPath(x, y);
        });
        eventBus.on(DRAWING_EVENTS.DRAW, ({ x, y }) => {
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
