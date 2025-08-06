import { weights } from '../../controller/types/weights';

export async function loadPretrainedWeights(path: string): Promise<weights> {
    const response: Response = await fetch(path);
    if (!response.ok) throw new Error(`Failed to load weight data from ${path}`);
    return await response.json();
}
