import WeightManager from '../core/WeightManager.ts';
import NeuralNetworkBase from '../core/NeuralNetworkBase.ts';
import QueryProcessController from './queryPipeline/QueryProcessController.ts';
import UserInputCanvas from '../view/components/userQuery/UserInputCanvas.ts';
import PathTrackingCanvas from '../view/components/userQuery/PathTrackingCanvas.ts';
import AlignCanvas from '../view/components/userQuery/AlignCanvas.ts';
import ResizeCanvas from '../view/components/userQuery/ResizeCanvas.ts';
import DataStore from './DataStore.ts';

import eventBus from './EventBus.ts';
import { DATA_EVENTS, HANDLER_EVENTS } from './constants/events.ts';
import { NETWORK_CONFIG } from './constants/networkConfig.ts';

class AppController {
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
            $DS: $DS,
        });
        eventBus.emit(HANDLER_EVENTS.APP_READY, this.dataStore);
        eventBus.on(DATA_EVENTS.RESULT_CHANGED, (data) => {
            console.log('RESULT CHANGED', data);
        });
    }
}

export default AppController;
