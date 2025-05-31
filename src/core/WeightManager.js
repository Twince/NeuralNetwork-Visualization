import { createRandomWeight } from "./utils/createRandomWeights.js";
import { loadPretrainedWeights } from "./utils/loadPretrainedWeights.js";

class WeightManager {
    _cache = null;

    constructor(networkConfig) {
        this.config = networkConfig;
        this.path = "assets/preTrainedWeights_h200_lr15p.json";
    }

    async getWeights() {
        if(this._cache) return this._cache
        try{
            const json = await loadPretrainedWeights(this.path);
            this._cache = {
                W_inputToHidden: json.W_inputToHidden,
                W_hiddenToOutput: json.W_inputToHidden,
            };
        }catch(err){
            console.warn(`[WeightManager] Using random weights due to error: ${err.message}`);
            this._cache = {
                W_inputToHidden: createRandomWeight(this.config.hiddenNodes, this.config.inputNodes),
                W_hiddenToOutput: createRandomWeight(this.config.outputNodes, this.config.hiddenNodes),
            };

            return this._cache
        }
    }

}

export default WeightManager;