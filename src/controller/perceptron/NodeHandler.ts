import { networkConfig } from '@/controller/constants/types/networkConfig.ts';
import { Node } from '@/view/components/perceptron/objectClass/Node.ts';
import { RENDERER_CONFIG } from '@/controller/constants/rendererConfig.ts';

import eventBus from '@/controller/eventBus.ts';
import { SCROLL_EVENTS } from '@/controller/constants/events.ts';
import { nodeObjectSet } from '@/controller/perceptron/types/nodeObjectSet.ts';
import { nodeState } from '@/controller/types/DataStore.ts';
import { compressArr } from '@/controller/perceptron/utils/compressArr.ts';

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

    updateNode(changedNodeState: nodeState): nodeObjectSet {
        const { inputs, ...rest } = changedNodeState;
        const compressedChangedNodeState = { inputs: compressArr(inputs), ...rest };

        const keys: string[] = Object.keys(compressedChangedNodeState);
        keys.forEach((key: string) => {
            compressedChangedNodeState[key].flatMap((e: number, i: number) => {
                if (key === 'inputs') this.nodeObjectSet.inputNodes[i].setValue(e * 100);
                if (key === 'hiddenOutputs') this.nodeObjectSet.hiddenNodes[i].setValue(e * 100);
                if (key === 'finalOutputs') this.nodeObjectSet.outputNodes[i].setValue(e * 100);
            });
        });
        return this.nodeObjectSet;
        // TODO: perceptron 렌더링 리팩토링
        // TODO: nodeObjectSet 이중 구조 바꾸기
        // TODO: 인덱스 참조 문제 디버깅
        // TODO: ScrollEventHandler 싱글톤으로 변경하기 -> 보류
        // TODO: 터치 엣지 케이스 찾기
    }

    resetNode(): nodeObjectSet {
        const keys = Object.keys(this.nodeObjectSet);

        keys.forEach((key: string) => {
            this.nodeObjectSet[key].forEach((_: unknown, i: number) => {
                this.nodeObjectSet[key][i].setValue(0);
            });
        });

        return this.nodeObjectSet;
    }

    render(anchorPosition: any): void {
        Object.keys(anchorPosition).forEach((key: string) => {
            const layerSize = anchorPosition[key].length;
            Array.from({ length: layerSize }, (_, i) => {
                this.NodeRenderer.drawNode(
                    anchorPosition[key][i].posX,
                    anchorPosition[key][i].posY,
                    anchorPosition[key][i].angleOffset,
                    anchorPosition[key][i].percent,
                );
            });
        });
    }
}
