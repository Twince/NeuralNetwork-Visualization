class ResizeCanvas {
    private readonly canvas: HTMLCanvasElement | null;
    private readonly ctx: CanvasRenderingContext2D;

    constructor() {
        this.canvas = document.createElement("canvas") as HTMLCanvasElement;
        this.ctx = this.canvas.getContext("2d", { willReadFrequently: true });
        this.canvas.width = this.canvas.height = 28;
    }

    downScale(path: HTMLImageElement): void {
        this.ctx.fillStyle = 'rgba(255,255,255)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(path, 0, 0, path.width, path.height, 0, 0, this.canvas.width, this.canvas.height);
    }

    clear(): void {
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

export default ResizeCanvas;