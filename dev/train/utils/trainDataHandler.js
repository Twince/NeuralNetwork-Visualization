import {mnistTrainData} from "../trainData/mnist/mnistTrainData.js";
import {mnistTestData} from "../trainData/mnist/mnistTestData.js";
import { mnistTrainData_large } from "../trainData/mnist/mnistTraindata_large.js";

import { NeuralNetwork } from "../../../src/core/neuralNetwork.js";
import { networkInfo } from "../../../src/core/neuralNetwork.js";
import {saveWeightsAsJson} from "./saveWeightsAsJson.js";

const normalizeInputs = (mnistTrainData) => {
    const normalizedData = mnistTrainData.map(array => {
        const [label, ...rest] = array;
        const filteredArray = [...rest];
        const normalizedArray = filteredArray.map(v => (v/255)*0.99+0.01);
        return normalizedArray;
    });
    return normalizedData;
}

const oneHotEncodeLabels = (mnistTrainData, networkInfo) => {
    const label = mnistTrainData.map(array => array[0]);
    const targetData = [...label.map(v => {
        let targetsArray = Array(networkInfo.outputNodes).fill(0.01);
        targetsArray[v] = 0.99;
        return targetsArray;
    })]
    return targetData;
}

console.log("trainDataHanlder 실행!")
const $NN = new NeuralNetwork({inputNodes: networkInfo.inputNodes, hiddenNodes: networkInfo.hiddenNodes, outputNodes: networkInfo.outputNodes  ,learningRate: networkInfo.learningRate});

const inputs = normalizeInputs(mnistTrainData_large);
const targets = oneHotEncodeLabels(mnistTrainData_large, networkInfo);

inputs.map((array, idx) => {
    $NN.train(array, targets[idx]);
    if (idx % 5000 === 0) {
        console.log(`Training progress: ${idx}/60000`);

    }
    console.log("✅ training complete!");
});

for (let i = 0; i<9; i++){
    console.log('Query', mnistTestData[i][0]);
    console.log($NN.query(normalizeInputs(mnistTestData)[i]));
}

saveWeightsAsJson($NN.W_inputToHidden, $NN.W_hiddenToOutput);
console.log("✅ Weight Downloaded!");