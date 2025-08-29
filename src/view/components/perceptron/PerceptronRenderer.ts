import eventBus from '@/controller/EventBus.ts';

class PerceptronRenderer {
    public readonly canvas: HTMLCanvasElement | null;
    public readonly ctx: CanvasRenderingContext2D;

    constructor() {
        this.canvas = document.createElement('canvas') as HTMLCanvasElement;
        this.ctx = this.canvas.getContext('2d', { willReadFrequently: true });
    }

    updateRender(): void {}
}
