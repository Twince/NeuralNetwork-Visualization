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
import GridRenderer from '@/view/components/perceptron/GridRenderer.ts';
import GridHandler from '@/controller/perceptron/GridHandler.ts';
import ViewPresenter from '@/view/ViewPresenter.ts';
import ViewportAdapter from '@/view/styles/ViewportAdapter.ts';

class AppController {
    private $WM: IWeightManager;
    private $NN: INeuralNetworkBase;
    private $DS: IDataStore;

    async initialize() {
        const $WM = new WeightManager(NETWORK_CONFIG);
        const $NN = new NeuralNetworkBase(await $WM.getWeights());
        const $DS = DataStore;
        new DrawingEventHandler();
        const $QC = new QueryProcessController({
            userInputCanvas: new UserInputCanvas(),
            trackingCanvas: new PathTrackingCanvas(),
            alignCanvas: new AlignCanvas(),
            resizeCanvas: new ResizeCanvas(),
            $NN: $NN,
        });

        new ViewportAdapter();
        const perceptronBaseCanvas = new BaseCanvas();
        const nodeRenderer = new NodeRenderer(perceptronBaseCanvas.getCtx());
        const nodeHandler = new NodeHandler({
            networkConfig: NETWORK_CONFIG,
            nodeRenderer,
            perceptronBaseCanvas,
        });
        const edgeRenderer = new EdgeRenderer(perceptronBaseCanvas.getCtx());
        const edgeHandler = new EdgeHandler({ edgeRenderer, perceptronBaseCanvas });
        const gridRenderer = new GridRenderer(perceptronBaseCanvas.getCtx());
        const gridHandler = new GridHandler({ gridRenderer, perceptronBaseCanvas });
        const $PC = new PerceptronController({
            NodeRenderer: nodeRenderer,
            EdgeRenderer: edgeRenderer,
            GridRenderer: gridRenderer,
            NodeHandler: nodeHandler,
            EdgeHandler: edgeHandler,
            GridHandler: gridHandler,
            BaseCanvas: perceptronBaseCanvas,
            ScrollEventHandler: new ScrollEventHandler(perceptronBaseCanvas),
        });
        new ViewPresenter();
    }
}

export default AppController;
