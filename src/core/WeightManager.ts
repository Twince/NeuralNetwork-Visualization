import { createRandomWeight } from './utils/createRandomWeights.js';
import { loadPretrainedWeights } from './utils/loadPretrainedWeights.js';
import { networkConfig } from '@/controller/constants/types/networkConfig';

import { weights } from '@/controller/types/weights';

class WeightManager {
    private _cache: null | weights = null;
    private config: networkConfig;
    private readonly path: string;

    constructor(networkConfig: networkConfig) {
        this.config = networkConfig;
        this.path = 'assets/preTrainedWeights_h200_lr15p.json';
    }

    async getWeights(): Promise<weights> {
        if (this._cache) return this._cache;
        try {
            const json = await loadPretrainedWeights(this.path);
            this._cache = {
                W_inputToHidden: json.W_inputToHidden,
                W_hiddenToOutput: json.W_hiddenToOutput,
            };
        } catch (err) {
            console.warn(`[WeightManager] Using random weights due to error: ${err.message}`);
            this._cache = {
                W_inputToHidden: createRandomWeight(
                    this.config.hiddenNodes,
                    this.config.inputNodes,
                ),
                W_hiddenToOutput: createRandomWeight(
                    this.config.outputNodes,
                    this.config.hiddenNodes,
                ),
            };
        }
        console.log('Network weights fetched');
        return this._cache;
    }
}

export default WeightManager;
