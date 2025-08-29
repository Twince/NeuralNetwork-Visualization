import { networkConfig } from '@/controller/constants/types/networkConfig.ts';

export class NodePositionHandler {
    private networkConfig: networkConfig;

    constructor(networkConfig: networkConfig) {
        this.networkConfig = networkConfig;
    }
}
