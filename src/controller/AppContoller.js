import WeightManager from "../core/WeightManager.js";
import NeuralNetworkBase from "../core/NeuralNetworkBase.js";
import UserInputHandler from "../view/components/userInput/userInputHandler.js";

import eventBus from "./EventBus.js";
import { DATA_EVENTS, HANDLER_EVENTS } from "./constants/events.js";
import { NETWORK_CONFIG } from "./constants/networkConfig.js";

class AppController {
    constructor({ dataStore }) {
        this.dataStore = dataStore;
    }

    async initialize() {
        console.log("Initializing...WeightManager");
        const $WM = new WeightManager(NETWORK_CONFIG);
        console.log("Initializing...NeuralNetworkBase");
        const $NN = new NeuralNetworkBase(await $WM.getWeights());
        console.log("Initializing...UserInputHandler");
        const $ICN = new UserInputHandler('userInputCanvas');
        $ICN.mount();
        console.log("Initializing Handler: complete!");
        eventBus.emit(HANDLER_EVENTS.NN_INITIALIZE, $NN);
        eventBus.emit(HANDLER_EVENTS.ICH_INITIALIZE, $ICN);
        eventBus.emit(HANDLER_EVENTS.APP_READY, this.dataStore);
    };
}

export default AppController;