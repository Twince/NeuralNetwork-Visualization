import { networkConfig } from '@/controller/constants/types/networkConfig.ts';
import { Node } from '@/view/components/perceptron/Node.ts';
import { RENDERER_CONFIG } from '@/controller/constants/rendererConfig.ts';

import eventBus from '@/controller/eventBus.ts';
import { SCROLL_EVENTS } from '@/controller/constants/events.ts';
import { nodeObjectSet } from '@/controller/perceptron/types/nodeObjectSet.ts';

export class NodeHandler {
    private readonly nodeObjectSet: nodeObjectSet;
    private displayNodes: number;
    private NodeRenderer: INodeRenderer;
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
        this.NodeRenderer = nodeRenderer;
        this.BaseCanvas = perceptronBaseCanvas;
    }

    initializeNode(networkInfo: any): any {
        Object.keys(this.nodeObjectSet).forEach((key: string) => {
            this.nodeObjectSet[key] = Array.from({ length: networkInfo[key] }, (v, i) => {
                return new Node(0);
            });
        });
        return this.nodeObjectSet;
    }

    render(anchorPosition: any): void {
        // this.BaseCanvas.clearCanvas();
        Object.keys(anchorPosition).forEach((key: string) => {
            const layerSize = anchorPosition[key].length;
            Array.from({ length: layerSize }, (_, i) => {
                this.drawText(anchorPosition[key][i].posX, anchorPosition[key][i].posY, i);
                this.NodeRenderer.drawNode(
                    anchorPosition[key][i].posX,
                    anchorPosition[key][i].posY,
                    anchorPosition[key][i].angleOffset,
                    anchorPosition[key][i].percent,
                );
            });
        });

        this.BaseCanvas.grid(50);

        // TODO: 각 레이별로 중심점 을 옮겨서 계층을 분리할 수 있게 작업
        // TODO: 각 레이어별 돌아간 회전 Stack만큼 Canvas 역회전
        // TODO: 노드에 관한 간선 연결 시각화 로직 구현
        // TODO: 코드 리팩토링
        // TODO: 반응형 설계 및 레이아웃 구현
        // TODO: perceptron Canvas 위치 잡기
        // TODO: 데이터 종속성과 SSoT와 관련한 모듈 아키텍쳐 고민 작성해보기
    }
    drawText(x, y, text: number): void {
        this.BaseCanvas.getCtx().fillStyle = 'rgb(0, 0, 0)';
        this.BaseCanvas.getCtx().fillText(`${text}`, x + 10, y);
        this.BaseCanvas.getCtx().fillStyle = 'rgb(255, 255, 255)';
    }
}
