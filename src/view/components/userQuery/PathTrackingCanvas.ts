import { CANVAS_CONFIG } from '@/controller/constants/canvasConfig.ts';

class PathTrackingCanvas {
    public readonly canvas: HTMLCanvasElement | null;
    public readonly ctx: CanvasRenderingContext2D;

    constructor() {
        this.canvas = document.createElement('canvas') as HTMLCanvasElement;
        this.ctx = this.canvas.getContext('2d', { willReadFrequently: true });
        this.setupCanvas();
    }

    setupCanvas(): void {
        // this.canvas.width = window.innerWidth;
        // this.canvas.height = window.innerHeight * (7 / 20);
        this.canvas.width = 1120;
        this.canvas.height = 560;

        this.ctx.fillStyle = 'rgba(0, 0, 0)';
        this.ctx.strokeStyle = 'rgba(255, 255, 255)';

        this.ctx.lineWidth = CANVAS_CONFIG.lineWidth;
        this.ctx.lineCap = CANVAS_CONFIG.lineCap;
        this.ctx.lineJoin = CANVAS_CONFIG.lineJoin;

        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    startPath(x: number, y: number): void {
        this.ctx.beginPath();
        this.ctx.moveTo(x, y);
    }

    drawPath(x: number, y: number): void {
        this.ctx.lineTo(x, y);
        this.ctx.stroke();
    }

    endPath(): void {
        this.ctx.closePath();
    }

    clear(): void {
        this.setupCanvas();
    }
}

export default PathTrackingCanvas;
