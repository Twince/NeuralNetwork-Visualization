import WeightManager from "../core/WeightManager.js";
import NeuralNetworkBase from "../core/NeuralNetworkBase.js";
import QueryProcessController from "./queryPipeline/QueryProcessController.js";
import UserInputCanvas from "../view/components/userQuery/UserInputCanvas.js";
import PathTrackingCanvas from "../view/components/userQuery/PathTrackingCanvas.js";
import AlignCanvas from "../view/components/userQuery/AlignCanvas.js";
import ResizeCanvas from "../view/components/userQuery/ResizeCanvas.js";
import { DataStore } from "./DataStore.js";

import eventBus from "./EventBus.js";
import { DATA_EVENTS, HANDLER_EVENTS } from "./constants/events.js";
import { NETWORK_CONFIG } from "./constants/networkConfig.js";
import processingCanvas from "../view/components/userQuery/PathTrackingCanvas.js";

class AppController {
    constructor({ dataStore }) {
        this.dataStore = dataStore;
    }

    async initialize() {
        console.log("Initializing...WeightManager");
        const $WM = new WeightManager(NETWORK_CONFIG);
        console.log("Initializing...NeuralNetworkBase");
        const $NN = new NeuralNetworkBase(await $WM.getWeights());
        const $DS = new DataStore();
        console.log("Initializing...UserInputCanvas");
        const $QC = new QueryProcessController({
            userInputCanvas: new UserInputCanvas(),
            trackingCanvas: new PathTrackingCanvas(),
            alignCanvas: new AlignCanvas(),
            resizeCanvas: new ResizeCanvas(),
            $NN: $NN,
        });
        // const $UIH = new UserInputCanvas('userInputCanvas');
        console.log("Initializing Handler: complete!");
        // eventBus.emit(HANDLER_EVENTS.NN_INITIALIZE, $NN);
        eventBus.emit(HANDLER_EVENTS.APP_READY, this.dataStore);
    };
}

export default AppController;