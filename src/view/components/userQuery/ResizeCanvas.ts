class ResizeCanvas {
    public readonly canvas: HTMLCanvasElement | null;
    public readonly ctx: CanvasRenderingContext2D;

    constructor() {
        this.canvas = document.createElement('canvas') as HTMLCanvasElement;
        this.ctx = this.canvas.getContext('2d', { willReadFrequently: true });
        this.setupCanvas();
    }

    setupCanvas(): void {
        this.canvas.width = this.canvas.height = 28;
        this.ctx.fillStyle = 'rgba(255,255,255)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    downScale(path: HTMLCanvasElement): void {
        this.ctx.drawImage(
            path,
            0,
            0,
            path.width,
            path.height,
            0,
            0,
            this.canvas.width,
            this.canvas.height,
        );
    }

    clear(): void {
        this.setupCanvas();
        // this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

export default ResizeCanvas;
