import BoundingBox from '../canvasUtils/BoundingBox.ts';

class AlignCanvas {
    private readonly canvas: HTMLCanvasElement | null;
    private readonly ctx: CanvasRenderingContext2D;

    constructor() {
        this.canvas = document.createElement('canvas') as HTMLCanvasElement;
        this.ctx = this.canvas.getContext('2d', { willReadFrequently: true });
        this.canvas.style.border = '2px solid red';
        this.setupCanvas();
    }
    setupCanvas(): void {
        this.ctx.fillStyle = 'rgba(0, 0, 0)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.updateCanvasScale();
    }
    updateCanvasScale(): void {
        if (BoundingBox.getOriginalObject().width > BoundingBox.getOriginalObject().height) {
            this.canvas.width = BoundingBox.getOriginalObject().width * 1.3;
            this.canvas.height = BoundingBox.getOriginalObject().width * 1.3;
        } else {
            this.canvas.width = BoundingBox.getOriginalObject().height * 1.3;
            this.canvas.height = BoundingBox.getOriginalObject().height * 1.3;
        }
    }

    centralize(path: HTMLImageElement): void {
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        const alignStartPosition = {
            x: (this.canvas.width - BoundingBox.getOriginalObject().width) / 2,
            y: (this.canvas.height - BoundingBox.getOriginalObject().height) / 2,
        };
        this.ctx.drawImage(
            path,
            BoundingBox.getOriginalObject().x,
            BoundingBox.getOriginalObject().y,
            BoundingBox.getOriginalObject().width,
            BoundingBox.getOriginalObject().height,
            alignStartPosition.x,
            alignStartPosition.y,
            BoundingBox.getOriginalObject().width,
            BoundingBox.getOriginalObject().height,
        );
    }

    clear(): void {
        this.canvas.width = this.canvas.height = 1;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

export default AlignCanvas;
