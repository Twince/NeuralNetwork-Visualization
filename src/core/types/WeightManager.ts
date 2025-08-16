import { weights } from '../../controller/types/weights.ts';
import { networkConfig } from '../../controller/constants/types/networkConfig.ts';

export interface IWeightManager {
    _cache: null | weights;
    config: networkConfig;
    path: string;
    getWeights(): Promise<weights>;
}
