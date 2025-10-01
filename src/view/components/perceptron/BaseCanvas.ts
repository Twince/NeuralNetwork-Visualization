import eventBus from '@/controller/EventBus.ts';
import { RENDERER_CONFIG } from '@/controller/constants/rendererConfig.ts';
import { rendererConfig } from '@/controller/constants/types/rendererConfig.ts';
import { nodePath } from '@/view/components/perceptron/shapeVector/nodePath.ts';

class BaseCanvas {
    private readonly canvas: HTMLCanvasElement | null;
    private readonly ctx: CanvasRenderingContext2D;
    private canvasCenter: { x: number; y: number };

    constructor() {
        this.canvas = document.getElementById('perceptron') as HTMLCanvasElement | null;
        this.ctx = this.canvas.getContext('2d', { willReadFrequently: true });

        this.setupCanvas(); // canvas element setu
        this.setupRenderTransform(this.ctx, this.nodes, this.degree, this.rotationDelta); // apply state for rendering context(transform/rotate..)
    }

    getCtx = (): CanvasRenderingContext2D => this.ctx;

    setupCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight * (5 / 20);

        this.ctx.fillStyle = 'rgb(186,186,186)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.canvasCenter = { x: this.canvas.width / 2, y: this.canvas.height / 2 };
    }

    setupRenderTransform(
        ctx: CanvasRenderingContext2D,
        nodes: number,
        degree: number,
        rotationDelta: number,
    ): void {
        ctx.translate(this.canvasCenter.x, this.canvasCenter.y);
        ctx.rotate(degree * 180);
        ctx.rotate((degree * 180 - degree * rotationDelta * nodes) / 2);
    }

    clearCanvas() {
        this.ctx.translate(-this.canvasCenter.x, -this.canvasCenter.y);
        this.ctx.fillStyle = 'rgb(255,255,255)';
        this.ctx.fillRect(0, 0, this.canvasCenter.x * 2, this.canvasCenter.y * 2);
        this.ctx.translate(this.canvasCenter.x, this.canvasCenter.y);
    }
}

export default BaseCanvas;
