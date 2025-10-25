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
        layerKeysList.flatMap((layerKey, index, key) => {
            const current = anchorPosition[layerKey] ?? [];
            const next = anchorPosition[key[index + 1]] ?? [];
            return current
                .flatMap((a) => next.map((b) => [a, b]))
                .forEach(([a, b]) => {
                    this.EdgeRenderer.drawEdge(a.posX, a.posY, b.posX, b.posY);
                });
        });
    }
}

export default EdgeHandler;
