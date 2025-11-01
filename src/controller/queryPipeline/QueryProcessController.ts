import eventBus from '../EventBus.js';
import { DATA_EVENTS, DRAWING_EVENTS } from '../constants/events.js';
import { pixelExtractor } from './pixelExtractor.js';
import { throttle } from './throttle';
import { IQueryProcessControllerProps } from './types/QueryProcessController.js';
import {
    ICanvasBase,
    IUserInputCanvas,
    IPathTrackingCanvas,
    IAlignCanvas,
    IResizeCanvas,
} from '@/view/components/userQuery/types/canvas';
import { INeuralNetworkBase } from '@/core/types/NeuralNetworkBase';
import { IDataStore } from '../types/DataStore';
import { Matrix2D } from '@/core/ops/types/OpsType.ts';
import BoundingBox from '@/view/components/userQuery/canvasUtils/BoundingBox.ts';

class QueryProcessController {
    private readonly userInputCanvas: ICanvasBase & IUserInputCanvas;
    private readonly trackingCanvas: ICanvasBase & IPathTrackingCanvas;
    private readonly alignCanvas: ICanvasBase & IAlignCanvas;
    private readonly resizeCanvas: ICanvasBase & IResizeCanvas;
    private readonly $NN: INeuralNetworkBase;
    private readonly $DS: IDataStore;
    private readonly queryFrequencyMs: number;
    //TODO: Canvas clear시 Skeleton 에니메이션 적용하기

    constructor({
        userInputCanvas,
        trackingCanvas,
        alignCanvas,
        resizeCanvas,
        $NN,
        $DS,
    }: IQueryProcessControllerProps) {
        this.userInputCanvas = userInputCanvas;
        this.trackingCanvas = trackingCanvas;
        this.alignCanvas = alignCanvas;
        this.resizeCanvas = resizeCanvas;

        this.$NN = $NN;
        this.$DS = $DS;
        this.registerDrawingEvent();
        this.query();
        this.queryFrequencyMs = 200;
    }

    registerDrawingEvent(): void {
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
            this.$DS.setQueryInfo(pixelExtractor(this.resizeCanvas));
        });
        eventBus.on(DRAWING_EVENTS.END_DRAW, () => {
            this.userInputCanvas.endPath();
            this.trackingCanvas.endPath();
        });
        eventBus.on(DRAWING_EVENTS.CLEAR_DRAW, () => {
            this.userInputCanvas.clear();
            this.trackingCanvas.clear();
            this.alignCanvas.clear();
            this.resizeCanvas.clear();
            BoundingBox.reset();
        });
    }

    query() {
        const throttleQuery = throttle((inputs) => {
            const result: Matrix2D = this.$NN.query(inputs);
            if (result) eventBus.emit(DATA_EVENTS.RESULT_CHANGED, result);
        }, this.queryFrequencyMs);

        eventBus.on(DATA_EVENTS.QUERY_CHANGED, (inputs: number[]) => throttleQuery(inputs));
        // TODO: type interface 추가하기, 이벤트버스 구조와 쿼리 구조 다시 생각해보기, TS 마이그레이션
    }
}

export default QueryProcessController;
