import { rendererConfig } from '@/controller/constants/types/rendererConfig.ts';

class nodeRenderer {
    private canvasCenter!: { x: number; y: number };
    private rotationDelta!: number;
    private degree!: number;
    private displayNodes!: number;
    private scrollSpeed!: number;

    private mouseScroll!: number;
    private touchMove!: number;
    private touchDirection!: number;
    private nodes!: number;

    private renderCtx: CanvasRenderingContext2D;

    constructor(ctx: CanvasRenderingContext2D) {
        this.renderCtx = ctx;
    }

    initializeRenderState(RENDERER_CONFIG: rendererConfig): void {
        this.rotationDelta = RENDERER_CONFIG.rotationDelta; // scrollHandler
        this.degree = RENDERER_CONFIG.degree; // scrollHandler
        this.displayNodes = RENDERER_CONFIG.displayNodes; // nodeHandler
        this.scrollSpeed = RENDERER_CONFIG.scrollSpeed; // scrollHandler
        this.mouseScroll = 0; // scrollHandler
        this.touchMove = 0; // scrollHandler
        this.touchDirection = 0; // scrollHandler
    }

    renderNodes() {}
}

export default nodeRenderer;
