import WeightManager from '@/core/WeightManager.ts';
import NeuralNetworkBase from '@/core/NeuralNetworkBase.ts';
import QueryProcessController from './queryPipeline/QueryProcessController.ts';
import PerceptronController from '@/controller/perceptron/PerceptronController.ts';
import BaseCanvas from '@/view/components/perceptron/BaseCanvas.ts';
import UserInputCanvas from '@/view/components/userQuery/UserInputCanvas.ts';
import PathTrackingCanvas from '@/view/components/userQuery/PathTrackingCanvas.ts';
import AlignCanvas from '@/view/components/userQuery/AlignCanvas.ts';
import ResizeCanvas from '@/view/components/userQuery/ResizeCanvas.ts';
import DataStore from './DataStore.ts';

import DrawingEventHandler from './queryPipeline/DrawingEventHandler.js';
import NodeRenderer from '@/view/components/perceptron/NodeRenderer.ts';

import eventBus from './EventBus.ts';
import { DATA_EVENTS, HANDLER_EVENTS } from './constants/events.ts';
import { NETWORK_CONFIG } from './constants/networkConfig.ts';
import { IWeightManager } from '@/core/types/WeightManager.ts';
import { INeuralNetworkBase } from '@/core/types/NeuralNetworkBase.ts';
import { IDataStore } from './types/DataStore.ts';
import { Matrix2D } from '@/core/ops/types/OpsType.ts';
import { NodeHandler } from '@/controller/perceptron/NodeHandler.ts';
import EdgeHandler from '@/controller/perceptron/EdgeHandler.ts';
import ScrollEventHandler from '@/controller/perceptron/ScrollEventHandler.ts';
import EdgeRenderer from '@/view/components/perceptron/EdgeRenderer.ts';

class AppController {
    private $WM: IWeightManager;
    private $NN: INeuralNetworkBase;
    private $DS: IDataStore;

    async initialize() {
        const $WM = new WeightManager(NETWORK_CONFIG);
        const $NN = new NeuralNetworkBase(await $WM.getWeights());
        const $DS = new DataStore();
        new DrawingEventHandler();
        const $QC = new QueryProcessController({
            userInputCanvas: new UserInputCanvas(),
            trackingCanvas: new PathTrackingCanvas(),
            alignCanvas: new AlignCanvas(),
            resizeCanvas: new ResizeCanvas(),
            $NN: $NN,
            $DS: $DS,
        });

        const perceptronBaseCanvas = new BaseCanvas();
        const nodeRenderer = new NodeRenderer(perceptronBaseCanvas.getCtx());
        const nodeHandler = new NodeHandler({
            networkConfig: NETWORK_CONFIG,
            nodeRenderer,
            perceptronBaseCanvas,
        });
        const edgeRenderer = new EdgeRenderer(perceptronBaseCanvas.getCtx());
        const edgeHandler = new EdgeHandler({ edgeRenderer, perceptronBaseCanvas });
        const $PC = new PerceptronController({
            NodeRenderer: nodeRenderer,
            EdgeRenderer: edgeRenderer,
            NodeHandler: nodeHandler,
            EdgeHandler: edgeHandler,
            BaseCanvas: perceptronBaseCanvas,
            ScrollEventHandler: new ScrollEventHandler(perceptronBaseCanvas),
        });
        eventBus.on(DATA_EVENTS.RESULT_CHANGED, (data: Matrix2D): void => {
            console.log('RESULT CHANGED', data);
        });
    }
}

export default AppController;
