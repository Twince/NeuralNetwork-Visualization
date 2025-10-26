class GridHandler {
    private GridRenderer: IGridRenderer;
    private BaseCanvas: IBaseCanvas;

    constructor({
        gridRenderer,
        perceptronBaseCanvas,
    }: {
        gridRenderer: IGridRenderer;
        perceptronBaseCanvas: IBaseCanvas;
    }) {
        this.GridRenderer = gridRenderer;
        this.BaseCanvas = perceptronBaseCanvas;
    }

    render(gridIndex: number): void {
        const gridLength: 10 | 8 = gridIndex % 2 === 0 ? 10 : 8;
        this.GridRenderer.drawGrid(560, gridLength); //bottom-side gird
        this.GridRenderer.drawGrid(710, -gridLength); //top-side grid
    }
}

export default GridHandler;
