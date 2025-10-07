import { networkConfig } from '@/controller/constants/types/networkConfig.ts';
import { Node } from '@/view/components/perceptron/Node.ts';
import { RENDERER_CONFIG } from '@/controller/constants/rendererConfig.ts';
const { rotationDelta, degree, displayNodes, scrollDivider } = RENDERER_CONFIG;

import eventBus from '@/controller/eventBus.ts';
import { SCROLL_EVENTS } from '@/controller/constants/events.ts';

export class NodeHandler {
    private readonly nodeObjectSet: {
        inputNodes: Array<Node>;
        hiddenNodes: Array<Node>;
        outputNodes: Array<Node>;
    };
    private displayNodes: number;
    private nodeRenderer: INodeRenderer;
    private BaseCanvas: IBaseCanvas;

    constructor({
        networkConfig,
        nodeRenderer,
        perceptronBaseCanvas,
    }: {
        networkConfig: networkConfig;
        nodeRenderer: INodeRenderer;
        perceptronBaseCanvas: IBaseCanvas;
    }) {
        this.nodeObjectSet = {
            inputNodes: undefined,
            hiddenNodes: undefined,
            outputNodes: undefined,
        };
        this.nodeRenderer = nodeRenderer;
        this.BaseCanvas = perceptronBaseCanvas;

        this.initialize(networkConfig);
        this.registerScrollEvent();

        console.log(this.nodeObjectSet);
    }

    initialize(networkConfig: networkConfig): void {
        const { inputNodes, ...rest } = networkConfig;
        const normalizedNetworkConfig = { inputNodes: inputNodes / 8, ...rest }; // 원활한 시각화를 위해 입력 레이어의 크기를 compress
        Object.keys(this.nodeObjectSet).forEach((key: string) => {
            this.nodeObjectSet[key] = Array.from({ length: normalizedNetworkConfig[key] }, () => {
                return new Node(0);
            });
        });
        this.render(0, 0);
    }

    registerScrollEvent() {
        eventBus.on(SCROLL_EVENTS.SCROLL_CHANGED, (mouseScroll) => this.render(mouseScroll, 0));
        eventBus.on(SCROLL_EVENTS.TOUCH_CHANGED, (touchScroll) => this.render(0, touchScroll));
    }

    render(mouseScroll: number, touchScroll: number): void {
        // Object.keys(this.nodeObjectSet).forEach((key: string) => {
        //     console.log('key:', key, 'value:', this.nodeObjectSet[key]);
        // });
        const scroll = mouseScroll;
        const touch = touchScroll;

        Object.keys(this.nodeObjectSet).forEach((key: string) => {
            this.BaseCanvas.rotateCanvas(
                true,
                (RENDERER_CONFIG.degree * 180 -
                    RENDERER_CONFIG.degree *
                        RENDERER_CONFIG.rotationDelta *
                        Object.keys(this.nodeObjectSet).length) /
                    2,
            );
            const layerSize = this.nodeObjectSet[key].length; // 해당 이터레이션에서의 레이어 노드 수
            Array.from({ length: layerSize }, (_: unknown, i: number) => {
                this.BaseCanvas.rotateCanvas(true, degree * rotationDelta);
                return i;
            })
                .filter(
                    (i: number) =>
                        i >=
                            layerSize / 2 -
                                displayNodes / 2 +
                                (mouseScroll + touchScroll) / scrollDivider &&
                        i <
                            layerSize / 2 +
                                displayNodes / 2 +
                                (mouseScroll + touchScroll) / scrollDivider,
                )
                .forEach((i) => {
                    console.log('돌아가고 있니..?');
                    this.nodeRenderer.drawNode(this.nodeObjectSet[key][i].getValue());
                    this.BaseCanvas.rotateCanvas(true, degree * rotationDelta);
                });
        });

        // Array.from({ length: Object.keys(this.nodeObjectSet).length }, (key: string) => {});
    }
}
