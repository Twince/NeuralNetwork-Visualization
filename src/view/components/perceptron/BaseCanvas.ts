import eventBus from '@/controller/EventBus.ts';
import { RENDERER_CONFIG } from '@/controller/constants/rendererConfig.ts';
import { nodePath } from '@/view/components/perceptron/shapeVector/nodePath.ts';

class BaseCanvas {
    private readonly canvas: HTMLCanvasElement | null;
    private readonly ctx: CanvasRenderingContext2D;
    private canvasCenter: { x: number; y: number };

    private setupMatrix: any;

    constructor() {
        this.canvas = document.getElementById('perceptron') as HTMLCanvasElement | null;
        this.ctx = this.canvas.getContext('2d', { willReadFrequently: true });

        this.setupCanvas(); // canvas element setup
        this.setupRenderTransform();
        // this.setupRenderTransform(this.ctx, RENDERER_CONFIG.degree); // apply state for rendering context(transform/rotate..)
    }

    getCanvas = (): HTMLCanvasElement => this.canvas;
    getCtx = (): CanvasRenderingContext2D => this.ctx;

    setupCanvas() {
        this.canvas.width = 2000;
        // this.canvas.height = window.innerHeight * (5 / 20);
        this.canvas.height = 1000;

        this.ctx.fillStyle = 'rgb(255,255,255)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.canvasCenter = { x: this.canvas.width / 2, y: this.canvas.height };
    }

    setupRenderTransform(): void {
        this.ctx.setTransform(1, 0, 0, 1, 0, 0);
        this.ctx.translate(this.canvasCenter.x, this.canvasCenter.y);
        this.rotateCanvas(true, RENDERER_CONFIG.degree * 180);
        this.setupMatrix = this.ctx.getTransform();
        console.log('셋업 렌더 셋팅을 실행함.');
    }

    rotateCanvas = (clockWise: boolean, value: number) => {
        const rotationVector = clockWise ? 1 : -1;
        this.ctx.rotate(rotationVector * value);
    };
    moveCanvas = (x: number, y: number) => {
        this.ctx.translate(x, y);
    };

    clearCanvas() {
        this.saveState();
        this.ctx.translate(-this.canvasCenter.x, -this.canvasCenter.y);
        this.ctx.fillStyle = 'rgb(255,255,255)';
        this.ctx.fillRect(0, 0, this.canvasCenter.x * 2, this.canvasCenter.y * 2);
        this.restoreState();
    }

    saveState() {
        this.ctx.save();
    }

    restoreState() {
        this.ctx.restore();
    }
}

export default BaseCanvas;
