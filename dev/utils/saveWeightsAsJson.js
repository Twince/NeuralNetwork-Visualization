export function saveWeightsAsJson(W_inputToHidden, W_hiddenToOutput) {
    const data = {
        W_inputToHidden,
        W_hiddenToOutput
    };

    const json = JSON.stringify(data);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "preTrainedWeights.json";
    a.click();

    URL.revokeObjectURL(url);
}