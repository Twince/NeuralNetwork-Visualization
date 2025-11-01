class EdgeHandler {
    private EdgeRenderer: IEdgeRenderer;
    private BaseCanvas: IBaseCanvas;

    constructor({
        edgeRenderer,
        perceptronBaseCanvas,
    }: {
        edgeRenderer: IEdgeRenderer;
        perceptronBaseCanvas: IBaseCanvas;
    }) {
        this.EdgeRenderer = edgeRenderer;
        this.BaseCanvas = perceptronBaseCanvas;
    }

    render(anchorPosition: any): void {
        const layerKeysList = Object.keys(anchorPosition);

        const subsetByRatio = (arr: any[], ratio: number, size: number) => {
            if (!Array.isArray(arr) || arr.length === 0) return [];
            const maxStart = Math.max(arr.length - size, 0);
            const start = Math.floor(ratio * maxStart);
            return arr.slice(start, start + size);
        };

        layerKeysList.slice(0, -1).flatMap((layerKey, index) => {
            const current = anchorPosition[layerKey] ?? [];
            const next = anchorPosition[layerKeysList[index + 1]] ?? [];

            return current
                .flatMap((a, aIndex) => {
                    const ratio = current.length <= 1 ? 0 : aIndex / (current.length - 1);
                    const subset = subsetByRatio(next, ratio, 13);

                    return subset.map((b) => [a, b]);
                })
                .forEach(([a, b]) => {
                    this.EdgeRenderer.drawEdge(a.posX, a.posY, b.posX, b.posY);
                });
        });
    }
}

export default EdgeHandler;
