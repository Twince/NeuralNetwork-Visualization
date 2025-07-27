import WeightManager from '../core/WeightManager.js';
import NeuralNetworkBase from '../core/NeuralNetworkBase.ts';
import QueryProcessController from './queryPipeline/QueryProcessController.ts';
import UserInputCanvas from '../view/components/userQuery/UserInputCanvas.js';
import PathTrackingCanvas from '../view/components/userQuery/PathTrackingCanvas.js';
import AlignCanvas from '../view/components/userQuery/AlignCanvas.js';
import ResizeCanvas from '../view/components/userQuery/ResizeCanvas.js';
import { DataStore } from './DataStore.js';

import eventBus from './EventBus.js';
import { DATA_EVENTS, HANDLER_EVENTS } from './constants/events.js';
import { NETWORK_CONFIG } from './constants/networkConfig.ts';

class AppController {
    constructor({ dataStore }) {
        this.dataStore = dataStore;
    }

    async initialize() {
        const $WM = new WeightManager(NETWORK_CONFIG);
        const $NN = new NeuralNetworkBase(await $WM.getWeights());
        const $DS = new DataStore();
        const $QC = new QueryProcessController({
            userInputCanvas: new UserInputCanvas(),
            trackingCanvas: new PathTrackingCanvas(),
            alignCanvas: new AlignCanvas(),
            resizeCanvas: new ResizeCanvas(),
            $NN: $NN,
        });
        eventBus.emit(HANDLER_EVENTS.APP_READY, this.dataStore);
        eventBus.on(DATA_EVENTS.RESULT_CHANGED, (data) => {
            console.log('RESULT CHANGED', data);
        });
    }
}

export default AppController;
