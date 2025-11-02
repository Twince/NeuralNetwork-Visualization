import { IPerceptronControllerProps } from '@/controller/perceptron/types/PerceptronController.ts';
import { NodeHandler } from '@/controller/perceptron/NodeHandler.ts';
import { EdgePositionHandler } from '@/controller/perceptron/EdgeHandler.ts';
import { DATA_EVENTS, DataEvent, SCROLL_EVENTS } from '@/controller/constants/events.ts';
import eventBus from '@/controller/EventBus.ts';
import { eventPayloads } from '@/controller/types/eventBus.ts';
import { compressArr } from '@/controller/perceptron/utils/compressArr.ts';

import { NETWORK_CONFIG } from '@/controller/constants/networkConfig';
import { normalizeNetworkConfig } from '@/controller/perceptron/utils/normalizeNetworkInfo.ts';

import { RENDERER_CONFIG } from '@/controller/constants/rendererConfig.ts';
const { rotationDelta, degree, displayNodes, scrollDivider, gridWidth, layerHeight } =
    RENDERER_CONFIG;
import BaseCanvas from '@/view/components/perceptron/BaseCanvas.ts';

import { NodeObjectSet } from '@/controller/perceptron/types/nodeObjectSet.ts';
import { findWidestLayer } from '@/controller/perceptron/utils/findWidestLayer.ts';
import { IDataStore, nodeState } from '@/controller/types/DataStore.ts';
import DataStore from '@/controller/DataStore.ts';
class PerceptronController {
    private $DS: IDataStore;
    private NodeRenderer: INodeRenderer;
    private NodeHandler: INodeHandler;
    private EdgeHandler: IEdgeHandler;
    private GridHandler: IGridHandler;
    private BaseCanvas: IBaseCanvas;
    private ScrollEventHandler: IScrollEventHandler;

    private normalizedNetworkInfo: any;
    private nodeObjectSet: NodeObjectSet;
    private anchorPosition: { inputLayer: number[]; hiddenLayer: number[]; outputLayer: number[] };
    private anchorPosKeys: string[] = ['inputLayer', 'hiddenLayer', 'outputLayer'];
    private widestLayerSize?: number;

    constructor({
        NodeRenderer,
        NodeHandler,
        EdgeHandler,
        GridHandler,
        BaseCanvas,
        ScrollEventHandler,
    }: IPerceptronControllerProps) {
        this.$DS = DataStore;
        this.NodeRenderer = NodeRenderer;
        this.NodeHandler = NodeHandler;
        this.EdgeHandler = EdgeHandler;
        this.GridHandler = GridHandler;
        this.BaseCanvas = BaseCanvas;
        this.ScrollEventHandler = ScrollEventHandler;

        this.anchorPosition = { inputLayer: [], hiddenLayer: [], outputLayer: [] };

        this.initializeNodeValue();
        this.registerScrollEvent();
        this.calculateNodePosition(0, 0);
        this.calculateGridPosition();
        this.updatePerceptron();
    }

    initializeNodeValue() {
        this.normalizedNetworkInfo = normalizeNetworkConfig(NETWORK_CONFIG); // 원활한 시각화를 위해 입력 레이어의 크기를 compress
        this.nodeObjectSet = this.NodeHandler.initializeNode(this.normalizedNetworkInfo); // 시각화된 노드들의 기본값 할당
        const { value: widestLayer } = findWidestLayer(this.normalizedNetworkInfo); // 현재 perceptron에 가장 큰 layer 크기 가져오기
        this.widestLayerSize = widestLayer; // 그리드 렌더링에 layer 크기 활용
    }

    registerScrollEvent() {
        eventBus.on(SCROLL_EVENTS.SCROLL_CHANGED, (mouseScroll) => {
            this.calculateNodePosition(mouseScroll, 0);
            this.calculateGridPosition();
        });
        eventBus.on(SCROLL_EVENTS.TOUCH_CHANGED, (touchScroll) => {
            this.calculateNodePosition(0, touchScroll);
            this.calculateGridPosition();
        });
    }

    calculateNodePosition(mouseScroll: number, touchScroll: number) {
        this.anchorPosition = { inputLayer: [], hiddenLayer: [], outputLayer: [] };
        Object.keys(this.normalizedNetworkInfo).map((key: string, layerIndex: number) => {
            this.BaseCanvas.saveState();

            const rotateCenterPosition =
                degree * 90 - (degree * rotationDelta * this.normalizedNetworkInfo[key]) / 2;
            const scrollDividerInterpolation = degree * rotationDelta;
            this.BaseCanvas.rotateCanvas(true, rotateCenterPosition + scrollDividerInterpolation);

            const layerSize = this.normalizedNetworkInfo[key];

            Array.from({ length: layerSize }, (_: unknown, nodeIndex: number) => nodeIndex).map(
                (nodeIndex) => {
                    const scrollOffset = (mouseScroll + touchScroll) / scrollDivider;
                    const displayStart = layerSize / 2 - displayNodes / 2 + scrollOffset;
                    const displayEnd = layerSize / 2 + displayNodes / 2 + scrollOffset;

                    const displayCondition = nodeIndex >= displayStart && nodeIndex < displayEnd;

                    this.BaseCanvas.saveState();

                    if (displayCondition) {
                        this.BaseCanvas.rotateCanvas(true, degree * rotationDelta * nodeIndex);
                        const currentMatrix = this.BaseCanvas.getCtx().getTransform();
                        const globalMatrix = this.BaseCanvas.setupMatrix.multiply(currentMatrix);

                        const global = globalMatrix.transformPoint(
                            new DOMPoint(layerHeight[layerIndex], 0),
                        );
                        const angle = Math.atan2(globalMatrix.b, globalMatrix.a);
                        const angleOffset = angle * (180 / Math.PI);

                        const percent = this.nodeObjectSet[key][nodeIndex].getValue();
                        this.anchorPosition[this.anchorPosKeys[layerIndex]].push({
                            posX: global.x,
                            posY: global.y,
                            angleOffset: angleOffset,
                            percent: percent,
                        });
                    } else {
                        this.BaseCanvas.rotateCanvas(true, degree * rotationDelta * nodeIndex);
                    }
                    this.BaseCanvas.restoreState();
                },
            );
            this.BaseCanvas.restoreState();
        });
        this.BaseCanvas.clearCanvas();
        this.EdgeHandler.render(this.anchorPosition);
        this.NodeHandler.render(this.anchorPosition);
    }

    calculateGridPosition() {
        const displayGird = this.widestLayerSize;
        this.BaseCanvas.saveState();
        this.BaseCanvas.rotateCanvas(true, degree - (degree * gridWidth * displayGird) / 2);
        Array.from({ length: displayGird }, (_: unknown, gridIndex: number) => {
            this.BaseCanvas.rotateCanvas(true, degree * gridWidth);
            this.GridHandler.renderGrid(gridIndex);
        });
        this.BaseCanvas.restoreState();
        this.GridHandler.renderLayout(this.anchorPosition);
    }

    updatePerceptron() {
        eventBus.on(DATA_EVENTS.NODE_CHANGED, (changedNodeState: nodeState) => {
            this.nodeObjectSet = this.NodeHandler.updateNode(changedNodeState);
            this.calculateNodePosition(
                this.ScrollEventHandler.mouseScroll,
                this.ScrollEventHandler.touchMove,
            );
            this.calculateGridPosition();
        });
    }
}

export default PerceptronController;
