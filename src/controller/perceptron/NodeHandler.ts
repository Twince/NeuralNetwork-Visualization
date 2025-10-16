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
                return new Node(15);
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
        // console.log(scroll, touch);

        this.BaseCanvas.clearCanvas();

        Object.keys(this.nodeObjectSet).forEach((key: string, index: number) => {
            // 각 레이어의 수를 기준으로 중앙정렬 회전
            console.log('레이어당 노드수', this.nodeObjectSet[key].length);
            console.log('기준 노드', this.nodeObjectSet[key].length / 2);
            this.BaseCanvas.grid(300);
            this.BaseCanvas.saveState(); // 현재의 상태를 저장(레이어 기준)
            this.BaseCanvas.rotateCanvas(
                true,
                degree * 90 - (degree * rotationDelta * this.nodeObjectSet[key].length) / 2,
            ); // 캔버스를 기준으로 레이어를 가운데 정렬

            const layerSize = this.nodeObjectSet[key].length; // 해당 이터레이션에서의 레이어 노드 수

            const color = ['rgb(255,0,0)', 'rgb(0,255,0)', 'rgb(0,0,255)'];
            const size = [350, 380, 410];
            this.BaseCanvas.getCtx().strokeStyle = color[index];
            Array.from({ length: layerSize }, (_: unknown, i: number) => i).forEach((i) => {
                if (
                    i >=
                        layerSize / 2 -
                            displayNodes / 2 +
                            (mouseScroll + touchScroll) / scrollDivider &&
                    i <
                        layerSize / 2 +
                            displayNodes / 2 +
                            (mouseScroll + touchScroll) / scrollDivider
                ) {
                    this.nodeRenderer.drawNode(size[index], this.nodeObjectSet[key][i].getValue());
                    this.drawText(i);
                    this.BaseCanvas.rotateCanvas(true, degree * rotationDelta);
                    // this.BaseCanvas.grid(size[index]);
                } else {
                    this.BaseCanvas.rotateCanvas(true, degree * rotationDelta);
                }
            });
            this.BaseCanvas.restoreState();
            this.drawText(`${key}`);
        });

        this.drawText('렌더 완전 끝남');
        this.BaseCanvas.grid(50);
        // TODO: 각 레이별로 중심점 을 옮겨서 계층을 분리할 수 있게 작업
        // TODO: 각 레이어별 돌아간 회전 Stack만큼 Canvas 역회전
        // TODO: 노드에 관한 간선 연결 시각화 로직 구현
        // TODO: 코드 리팩토링
        // TODO: 반응형 설계 및 레이아웃 구현
        // TODO: perceptron Canvas 위치 잡기

        // Array.from({ length: Object.keys(this.nodeObjectSet).length }, (key: string) => {});
    }

    drawText(text: number): void {
        this.BaseCanvas.getCtx().fillStyle = 'rgb(0, 0, 0)';
        this.BaseCanvas.getCtx().fillText(`${text}`, 180, 0);
        this.BaseCanvas.getCtx().fillStyle = 'rgb(255, 255, 255)';
    }
}
