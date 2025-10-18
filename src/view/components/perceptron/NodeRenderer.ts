import { rendererConfig } from '@/controller/constants/types/rendererConfig.ts';
import { nodePath } from '@/view/components/perceptron/shapeVector/nodePath.ts';

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
        this.scrollSpeed = RENDERER_CONFIG.scrollDivider; // scrollHandler
    }

    drawNode = (layer: number, p: number): void => {
        nodePath(this.renderCtx, { x: layer, y: 0, width: 15, height: 15, percent: p });
    };
}

export default nodeRenderer;
