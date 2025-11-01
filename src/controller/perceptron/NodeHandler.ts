import { networkConfig } from '@/controller/constants/types/networkConfig.ts';
import { Node } from '@/view/components/perceptron/objectClass/Node.ts';
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
