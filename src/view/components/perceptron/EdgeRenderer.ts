class EdgeRenderer {
    private renderCtx: CanvasRenderingContext2D;

    constructor(ctx: CanvasRenderingContext2D) {
        this.renderCtx = ctx;
    }

    drawEdge = (aX: number, aY: number, bX: number, bY: number): void => {
        const dX: number = Math.abs(aX - bX);
        const dY: number = Math.abs(aY - bY);
        const distance = Math.sqrt(dX * dX + dX * dY);
        if (distance > 490) return;

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
