import {mnistTrainData} from "../../assets/mnistData/mnistTrainData.js";
import {mnistTestData} from "../../assets/mnistData/mnistTestData.js";

import { NeuralNetwork } from "../core/neuralNetwork.js";
import { networkInfo } from "../core/neuralNetwork.js";

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

const $NN = new NeuralNetwork({inputNodes: networkInfo.inputNodes, hiddenNodes: networkInfo.hiddenNodes, outputNodes: networkInfo.outputNodes  ,learningRate: networkInfo.learningRate.learningRate});

const inputs = normalizeInputs(mnistTrainData);
const targets = oneHotEncodeLabels(mnistTrainData, networkInfo);

console.log("inputs", inputs);
console.log("targets", targets);

inputs.map((array, idx) => {
    $NN.train(array, targets[idx]);
    console.log("training complete!");

});

console.log("Query 7!");
console.log($NN.query(inputs[0]));