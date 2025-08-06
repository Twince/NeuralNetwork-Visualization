import BoundingBox from '../../view/components/canvasUtils/BoundingBox.ts';
import eventBus from '../EventBus.ts';
import { DRAWING_EVENTS } from '../constants/events.ts';

class DrawingEventHandler {
    private inputCanvas: HTMLCanvasElement | null;
    private isDrawing: boolean;
    // TODO: 이벤트 핸들러 리팩토링

    constructor() {
        this.inputCanvas = document.getElementById('userInputCanvas') as HTMLCanvasElement;
        this.isDrawing = false;
        this.registerEvents();
    }

    registerEvents(): void {
        this.inputCanvas.addEventListener('mousedown', this.handleStartDraw);
        this.inputCanvas.addEventListener('touchstart', this.handleStartDraw);
        this.inputCanvas.addEventListener('mousemove', this.handleDraw);
        this.inputCanvas.addEventListener('touchmove', this.handleDraw);
        this.inputCanvas.addEventListener('mouseup', this.endDraw);
        this.inputCanvas.addEventListener('mouseout', this.endDraw);
        this.inputCanvas.addEventListener('touchend', (e: TouchEvent): void => {
            e.preventDefault();
            this.endDraw();
        });
    }

    // eventBus로 입력 event 전송
    startDraw = (x: number, y: number): void => {
        this.isDrawing = true;
        eventBus.emit(DRAWING_EVENTS.START_DRAW, { x, y });
    };

    draw = (x: number, y: number): void => {
        if (!this.isDrawing) return;
        BoundingBox.update(x, y);
        eventBus.emit(DRAWING_EVENTS.DRAW, { x, y });
    };

    endDraw = (): void => {
        this.isDrawing = false;
        BoundingBox.log();
        eventBus.emit(DRAWING_EVENTS.END_DRAW, null);
    };

    // 캔버스에서의 터치 위치 반환
    getTouchPosition = (e: TouchEvent): { x: number; y: number } => {
        e.preventDefault();
        const touch = e.touches[0];
        const rect = this.inputCanvas.getBoundingClientRect();
        return {
            x: touch.clientX - rect.left,
            y: touch.clientY - rect.top,
        };
    };

    // 마우스 클릭, 터치 이벤트에 대한 입력 이벤트 발생
    handleStartDraw = (e: MouseEvent | TouchEvent): void => {
        if (e instanceof MouseEvent) {
            this.startDraw(e.offsetX, e.offsetY);
        } else if (e instanceof TouchEvent) {
            let { x, y } = this.getTouchPosition(e);
            this.startDraw(x, y);
        }
    };

    handleDraw = (e: MouseEvent | TouchEvent): void => {
        if (e instanceof MouseEvent) {
            this.draw(e.offsetX, e.offsetY);
        } else if (e instanceof TouchEvent) {
            let { x, y } = this.getTouchPosition(e);
            this.draw(x, y);
        }
    };
}

export default DrawingEventHandler;
