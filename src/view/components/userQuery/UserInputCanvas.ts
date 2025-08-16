import { CANVAS_CONFIG } from '../../../controller/constants/canvasConfig.ts';

class UserInputCanvas {
    public readonly canvas: HTMLCanvasElement | null;
    public readonly ctx: CanvasRenderingContext2D;
    private isDrawing: boolean;

    constructor() {
        this.canvas = document.getElementById('userInputCanvas') as HTMLCanvasElement;
        this.ctx = this.canvas.getContext('2d');
        this.isDrawing = false;
        this.setupCanvas();

        this.ctx.strokeStyle = 'rgba(255,255,255,0.90)';
        this.ctx.lineWidth = CANVAS_CONFIG.lineWidth;
        this.ctx.lineCap = CANVAS_CONFIG.lineCap;
        this.ctx.lineJoin = CANVAS_CONFIG.lineJoin;
    }

    clear = (): void => {
        this.ctx.fillStyle = 'rgba(40,40,40)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawGridDots();
    };

    setupCanvas(): void {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight / 3;

        this.ctx.fillStyle = 'rgba(40,40,40)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.drawGridDots();
    }

    drawGridDots() {
        const drawCircle = (x, y) => {
            this.ctx.beginPath();
            this.ctx.fillStyle = 'rgba(255,255,255,0.3)';
            this.ctx.arc(x, y, 1, 0, 2 * Math.PI);
            this.ctx.fill();
        };

        for (let x = 5; x < this.canvas.width; x += 12) {
            for (let y = 5; y < this.canvas.height; y += 12) {
                drawCircle(x, y);
            }
        }
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
}

export default UserInputCanvas;
