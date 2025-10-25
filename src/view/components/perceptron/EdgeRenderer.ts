class EdgeRenderer {
    private renderCtx: CanvasRenderingContext2D;

    constructor(ctx: CanvasRenderingContext2D) {
        this.renderCtx = ctx;
    }

    drawEdge = (aX: number, aY: number, bX: number, bY: number): void => {
        this.renderCtx.strokeStyle = '#000000';
        this.renderCtx.lineWidth = 0.3;

        this.renderCtx.beginPath();
        this.renderCtx.moveTo(aX, aY);
        this.renderCtx.lineTo(bX, bY);
        this.renderCtx.stroke();
        this.renderCtx.moveTo(aX, aY);
    };
}

export default EdgeRenderer;
