import {Trainer} from "./Trainer.js";
// data sets
import {mnistTrainData} from "./trainData/mnist/mnistTrainData.js";
import {mnistTestData} from "./trainData/mnist/mnistTestData.js";
import {mnistTrainData_large} from "./trainData/mnist/mnistTraindata_large.js";

// train utils
import {normalizeInputs, oneHotEncodeLabels} from "./utils/trainDataHandler.js";
import {saveWeightsAsJson} from "./utils/saveWeightsAsJson.js";


// <entry point>
export const trainTester = () => {
    const networkConfig = {inputNodes: 784, hiddenNodes: 200, outputNodes: 10, learningRate: 0.15};
    const $NN = new Trainer({
        inputNodes: networkConfig.inputNodes,
        hiddenNodes: networkConfig.hiddenNodes,
        outputNodes: networkConfig.outputNodes,
        learningRate: networkConfig.learningRate
    });

    const inputs = normalizeInputs(mnistTrainData);
    const targets = oneHotEncodeLabels(mnistTrainData, networkConfig);

    inputs.map((array, idx) => {
        $NN.train(array, targets[idx]);
        if (idx % 5000 === 0) console.log(`Training progress: ${idx}/60000`);
        console.log("✅ training complete!");
    });

    for (let i = 0; i<9; i++){
        console.log('Query', mnistTestData[i][0]);
        console.log($NN.query(normalizeInputs(mnistTestData)[i]));
    }

    saveWeightsAsJson($NN.W_inputToHidden, $NN.W_hiddenToOutput);
    console.log("✅ Weight Downloaded!");
}

export default trainTester;