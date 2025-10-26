import { Node } from '@/view/components/perceptron/objectClass/Node.ts';

export interface NodeObjectSet {
    inputNodes: Array<Node>;
    hiddenNodes: Array<Node>;
    outputNodes: Array<Node>;
}
