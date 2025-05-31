import eventBus from "./EventBus.js";
import { DATA_EVENTS, HANDLER_EVENTS } from "./constants/events.js";

class QueryHandler {
    constructor() {
        this.$NN = null;
        eventBus.on(HANDLER_EVENTS.NN_INITIALIZE, (nn) => this.$NN = nn);
    }

    preProcess(userInput) {
        const downScaled = this.downScale(userInput)
        const interpolated = this.interpolateToCenter(downScaled);
        const normalized = this.normalize(userInput);
    }

    downScale(userInput) {}
    interpolateToCenter() {}
    normalize() {

    }
}

export default new QueryHandler();