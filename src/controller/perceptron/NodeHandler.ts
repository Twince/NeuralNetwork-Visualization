import { networkConfig } from '@/controller/constants/types/networkConfig.ts';
import { Node } from '@/view/components/perceptron/Node.ts';

export class NodeHandler {
    private readonly nodeObjectSet: {
        inputNodes: Array<Node>;
        hiddenNodes: Array<Node>;
        outputNodes: Array<Node>;
    };
    private displayNodes: number;
    private nodeRenderer: INodeRenderer;

    constructor({
        networkConfig,
        nodeRenderer,
    }: {
        networkConfig: networkConfig;
        nodeRenderer: INodeRenderer;
    }) {
        this.nodeObjectSet = {
            inputNodes: undefined,
            hiddenNodes: undefined,
            outputNodes: undefined,
        };
        this.nodeRenderer = nodeRenderer;

        this.initialize(networkConfig);
        console.log(this.nodeObjectSet);
    }

    initialize(networkConfig: networkConfig): void {
        Object.keys(this.nodeObjectSet).forEach((key: string) => {
            this.nodeObjectSet[key] = Array.from({ length: networkConfig[key] }, () => {
                return new Node(0);
            });
        });
        this.renderNodes();
    }

    render() {}
}
