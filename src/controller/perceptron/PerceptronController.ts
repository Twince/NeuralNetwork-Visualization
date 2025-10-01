import { IPerceptronControllerProps } from '@/controller/perceptron/types/PerceptronController.ts';
import { NodeHandler } from '@/controller/perceptron/NodeHandler.ts';
import { EdgePositionHandler } from '@/controller/perceptron/EdgeHandler.ts';
import { ScrollEventHandler } from '@/controller/perceptron/ScrollEventHandler.ts';
import { DATA_EVENTS, DataEvent } from '@/controller/constants/events.ts';
import eventBus from '@/controller/EventBus.ts';
import { eventPayloads } from '@/controller/types/eventBus.ts';
import { compressArr } from '@/controller/perceptron/utils/compressArr.ts';

import BaseCanvas from '@/view/components/perceptron/BaseCanvas.ts';

class PerceptronController {
    private nodePositionHandler: NodeHandler;
    private edgePositionHandler: EdgePositionHandler;
    private scrollEventHandler: ScrollEventHandler;

    constructor({
        nodeRenderer,
        nodePositionHandler,
        edgePositionHandler,
        scrollEventHandler,
    }: IPerceptronControllerProps) {
        this.nodePositionHandler = nodePositionHandler;
        this.edgePositionHandler = edgePositionHandler;
        this.scrollEventHandler = scrollEventHandler;
        eventBus.on(DATA_EVENTS.NODE_CHANGED, ({ inputs, hiddenOutputs, finalOutputs }) => {
            console.log('nodes 출력:', inputs, compressArr(inputs), hiddenOutputs, finalOutputs);
        });
    }
}

export default PerceptronController;
