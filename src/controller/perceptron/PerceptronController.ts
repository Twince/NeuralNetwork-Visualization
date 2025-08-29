import { IPerceptronControllerProps } from '@/controller/perceptron/types/PerceptronController.ts';
import { NodePositionHandler } from '@/controller/perceptron/NodePositionHandler.ts';
import { EdgePositionHandler } from '@/controller/perceptron/EdgePositionHandler.ts';
import { ScrollEventHandler } from '@/controller/perceptron/ScrollEventHandler.ts';
import { DATA_EVENTS, DataEvent } from '@/controller/constants/events.ts';
import eventBus from '@/controller/EventBus.ts';
import { eventPayloads } from '@/controller/types/eventBus.ts';
import { compressArr } from '@/controller/perceptron/utils/compressArr.ts';

class PerceptronController {
    private nodePositionHandler: NodePositionHandler;
    private edgePositionHandler: EdgePositionHandler;
    private scrollEventHandler: ScrollEventHandler;

    constructor({
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
