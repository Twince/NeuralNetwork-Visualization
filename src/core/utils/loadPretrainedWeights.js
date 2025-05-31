export async function loadPretrainedWeights(path) {
    const response = await fetch(path);
    if(!response.ok) throw new Error(`Failed to load weight datas from ${path}`);
    return await response.json();
}