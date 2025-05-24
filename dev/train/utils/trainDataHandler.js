export const normalizeInputs = (mnistTrainData) => {
    const normalizedData = mnistTrainData.map(array => {
        const [label, ...rest] = array;
        const filteredArray = [...rest];
        const normalizedArray = filteredArray.map(v => (v/255)*0.99+0.01);
        return normalizedArray;
    });
    return normalizedData;
}

export const oneHotEncodeLabels = (mnistTrainData, networkInfo) => {
    const label = mnistTrainData.map(array => array[0]);
    const targetData = [...label.map(v => {
        let targetsArray = Array(networkInfo.outputNodes).fill(0.01);
        targetsArray[v] = 0.99;
        return targetsArray;
    })]
    return targetData;
}