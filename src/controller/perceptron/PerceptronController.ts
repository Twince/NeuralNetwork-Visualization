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
const { rotationDelta, degree, displayNodes, scrollDivider } = RENDERER_CONFIG;
import BaseCanvas from '@/view/components/perceptron/BaseCanvas.ts';

import { NodeObjectSet } from '@/controller/perceptron/types/nodeObjectSet.ts';
import { findWidestLayer } from '@/controller/perceptron/utils/findWidestLayer.ts';
class PerceptronController {
    private NodeRenderer: INodeRenderer;
    private NodeHandler: INodeHandler;
    private EdgeHandler: IEdgePositionHandler;
    private BaseCanvas: IBaseCanvas;
    private ScrollEventHandler: IScrollEventHandler;

    private normalizedNetworkInfo: any;
    private nodeObjectSet: NodeObjectSet;
    private readonly distanceFromCenter: number[];
    private anchorPosition: { inputLayer: number[]; hiddenLayer: number[]; outputLayer: number[] };
    private anchorPosKeys: string[] = ['inputLayer', 'hiddenLayer', 'outputLayer'];

    constructor({
        NodeRenderer,
        NodeHandler,
        EdgeHandler,
        BaseCanvas,
        ScrollEventHandler,
    }: IPerceptronControllerProps) {
        this.NodeRenderer = NodeRenderer;
        this.NodeHandler = NodeHandler;
        this.EdgeHandler = EdgeHandler;
        this.BaseCanvas = BaseCanvas;
        this.ScrollEventHandler = ScrollEventHandler;

        this.distanceFromCenter = [600, 630, 660];
        this.anchorPosition = { inputLayer: [], hiddenLayer: [], outputLayer: [] };

        this.initializeNodeValue();
        this.registerScrollEvent();
        this.calculateNodePosition(0, 0);

        eventBus.on(DATA_EVENTS.NODE_CHANGED, ({ inputs, hiddenOutputs, finalOutputs }) => {
            console.log('nodes 출력:', inputs, compressArr(inputs), hiddenOutputs, finalOutputs);
        });
    }

    initializeNodeValue() {
        this.normalizedNetworkInfo = normalizeNetworkConfig(NETWORK_CONFIG); // 원활한 시각화를 위해 입력 레이어의 크기를 compress
        this.nodeObjectSet = this.NodeHandler.initializeNode(this.normalizedNetworkInfo); // 시각화된 노드들의 기본값 할당
        this.NodeHandler.render(0, 0);
    }

    registerScrollEvent() {
        eventBus.on(SCROLL_EVENTS.SCROLL_CHANGED, (mouseScroll) =>
            this.calculateNodePosition(mouseScroll, 0),
        );
        eventBus.on(SCROLL_EVENTS.TOUCH_CHANGED, (touchScroll) =>
            this.calculateNodePosition(0, touchScroll),
        );
    }

    calculateNodePosition(mouseScroll: number, touchScroll: number) {
        this.anchorPosition = { inputLayer: [], hiddenLayer: [], outputLayer: [] };
        Object.keys(this.normalizedNetworkInfo).map((key: string, layerIndex: number) => {
            this.BaseCanvas.saveState();
            this.BaseCanvas.rotateCanvas(
                true,
                degree * 90 - (degree * rotationDelta * this.normalizedNetworkInfo[key]) / 2,
            );

            const layerSize = this.normalizedNetworkInfo[key];

            Array.from({ length: layerSize }, (_: unknown, nodeIndex: number) => nodeIndex).map(
                (nodeIndex) => {
                    const scrollOffset = (mouseScroll + touchScroll) / scrollDivider;
                    const displayStart = layerSize / 2 - displayNodes / 2 + scrollOffset;
                    const displayEnd = layerSize / 2 + displayNodes / 2 + scrollOffset;

                    const displayCondition = nodeIndex >= displayStart && nodeIndex < displayEnd;
                    this.BaseCanvas.grid(200);

                    this.BaseCanvas.saveState();

                    if (displayCondition) {
                        this.BaseCanvas.rotateCanvas(true, degree * rotationDelta * nodeIndex);
                        const currentMatrix = this.BaseCanvas.getCtx().getTransform();
                        const globalMatrix = this.BaseCanvas.setupMatrix.multiply(currentMatrix);

                        const global = globalMatrix.transformPoint(
                            new DOMPoint(this.distanceFromCenter[layerIndex], 0),
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
                    this.BaseCanvas.grid(50);
                    this.BaseCanvas.restoreState();
                },
            );
            this.BaseCanvas.restoreState();
        });
        console.log('anchorPosition:', this.anchorPosition);
        this.BaseCanvas.clearCanvas();
        this.EdgeHandler.render(this.anchorPosition);
        this.NodeHandler.render(this.anchorPosition);
    }

    renderPerceptron() {}
}

export default PerceptronController;
