import { RENDERER_CONFIG } from '@/controller/constants/rendererConfig.ts';
const { degree } = RENDERER_CONFIG;

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

    renderLayout(anchorPosition: any): void {
        this.GridRenderer.drawArc(710);

        const referenceIndex = 3;
        this.drawText(
            anchorPosition.outputLayer[referenceIndex].posX + 10,
            anchorPosition.outputLayer[referenceIndex].posY - 90,
            anchorPosition.outputLayer[referenceIndex].angleOffset,
            'Input Nodes',
        );
        this.drawText(
            anchorPosition.outputLayer[referenceIndex].posX + 10,
            anchorPosition.outputLayer[referenceIndex].posY + 12,
            anchorPosition.outputLayer[referenceIndex].angleOffset,
            'Output Nodes',
        );
    }
    renderGrid(gridIndex: number): void {
        const gridLength: 10 | 8 = gridIndex % 2 === 0 ? 10 : 8;
        this.GridRenderer.drawGrid(560, gridLength); //bottom-side gird
        this.GridRenderer.drawGrid(710, -gridLength); //top-side grid
    }

    drawText(x: number, y: number, angleOffset: number, text: string): void {
        this.BaseCanvas.saveState();
        this.BaseCanvas.moveCanvas(x, y);
        this.BaseCanvas.rotateCanvas(true, ((angleOffset * Math.PI) / 180) * 1.01);
        this.BaseCanvas.rotateCanvas(true, degree * 90);
        this.BaseCanvas.getCtx().fillStyle = 'rgb(133,133,133)';
        // this.BaseCanvas.getCtx().fillText(`${text}`, x + 10, y);
        this.BaseCanvas.getCtx().fillText(`${text}`, 0, 0);
        this.BaseCanvas.getCtx().fillStyle = 'rgb(255, 255, 255)';
        this.BaseCanvas.restoreState();
    }
}

export default GridHandler;
