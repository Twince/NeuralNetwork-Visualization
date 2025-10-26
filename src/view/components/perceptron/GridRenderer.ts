class GridRenderer {
    private renderCtx: CanvasRenderingContext2D;

    constructor(ctx: CanvasRenderingContext2D) {
        this.renderCtx = ctx;
    }

    drawGrid(position: number, gridLength: number): void {
        this.renderCtx.strokeStyle = '#c3c3c3';
        this.renderCtx.lineWidth = 1;

        this.renderCtx.save();

        this.renderCtx.beginPath();
        this.renderCtx.moveTo(0, position);
        this.renderCtx.lineTo(0, position + gridLength);
        this.renderCtx.stroke();
        this.renderCtx.restore();
    }
}

export default GridRenderer;
