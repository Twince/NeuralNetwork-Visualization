import { IPerceptronControllerProps } from '@/controller/perceptron/types/PerceptronController.ts';
import { NodeHandler } from '@/controller/perceptron/NodeHandler.ts';
import { EdgePositionHandler } from '@/controller/perceptron/EdgeHandler.ts';
import { ScrollEventHandler } from '@/controller/perceptron/ScrollEventHandler.ts';
import { DATA_EVENTS, DataEvent, SCROLL_EVENTS } from '@/controller/constants/events.ts';
import eventBus from '@/controller/EventBus.ts';
import { eventPayloads } from '@/controller/types/eventBus.ts';
import { compressArr } from '@/controller/perceptron/utils/compressArr.ts';

import {NETWORK_CONFIG} from "@/controller/constants/networkConfig";
import { normalizeNetworkConfig } from '@/controller/perceptron/utils/normalizeNetworkInfo.ts';

import { RENDERER_CONFIG } from '@/controller/constants/rendererConfig.ts';
const { rotationDelta, degree, displayNodes, scrollDivider } = RENDERER_CONFIG;
import BaseCanvas from '@/view/components/perceptron/BaseCanvas.ts';

import { nodeObjectSet } from '@/controller/perceptron/types/nodeObjectSet.ts';
class PerceptronController {
    private NodeRenderer: INodeRenderer;
    private NodeHandler: INodeHandler;
    private EdgeHandler: IEdgePositionHandler;
    private BaseCanvas: IBaseCanvas;
    private ScrollEventHandler: IScrollEventHandler;

    private normalizedNetworkInfo: any;
    private nodeObjectSet: nodeObjectSet;

    constructor({
        NodeRenderer,
        NodeHandler,
        EdgeHandler,
        BaseCanvas,
        ScrollEventHandler,
    }: IPerceptronControllerProps) {
        this.NodeRenderer = NodeRenderer
        this.NodeHandler = NodeHandler;
        this.EdgeHandler = EdgeHandler;
        this.BaseCanvas = BaseCanvas;
        this.ScrollEventHandler = ScrollEventHandler;

        this.initializeNodeValue();

        eventBus.on(DATA_EVENTS.NODE_CHANGED, ({ inputs, hiddenOutputs, finalOutputs }) => {
            console.log('nodes 출력:', inputs, compressArr(inputs), hiddenOutputs, finalOutputs);
        });
    }

    initializeNodeValue() {
        this.normalizedNetworkInfo = normalizeNetworkConfig(NETWORK_CONFIG); // 원활한 시각화를 위해 입력 레이어의 크기를 compress
        this.nodeObjectSet =  this.NodeHandler.initializeNode(this.normalizedNetworkInfo);
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
        Object.keys(this.normalizedNetworkInfo).map((key: string, index: number) => {
            this.BaseCanvas.rotateCanvas(
                true,
                degree * 90 - (degree * rotationDelta * this.normalizedNetworkInfo[key]) / 2,
            );
            this.BaseCanvas.saveState();
            const layerSize = this.normalizedNetworkInfo[key];

            Array.from({ length: layerSize }, (_: unknown, i: number) => i).map((i) => {
                const scrollOffset = (mouseScroll + touchScroll) / scrollDivider;
                const displayStart = layerSize / 2 - displayNodes / 2 + scrollOffset;
                const displayEnd = layerSize / 2 + displayNodes / 2 + scrollOffset;

                const displayCondition = i >= displayStart && i < displayEnd;

                if (displayCondition) {
                    this.NodeRenderer.drawNode(size[index], this.nodeObjectSet[key][i].getValue());
                    this.BaseCanvas.rotateCanvas(true, degree * rotationDelta);
                } else {
                    this.BaseCanvas.rotateCanvas(true, degree * rotationDelta);
                }
            });
        });

        // Position, Rotation 값 Object로 넘기기
    }

    calculateEdgePosition() {
        // Position 값 Object로 넘기기
    }

    renderPerceptron() {}
}

export default PerceptronController;
