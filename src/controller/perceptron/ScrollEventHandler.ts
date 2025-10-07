import { RENDERER_CONFIG } from '@/controller/constants/rendererConfig.ts';

import eventBus from '@/controller/EventBus.ts';
import { SCROLL_EVENTS } from '@/controller/constants/events.ts';

const { degree, rotationDelta, scrollDivider } = RENDERER_CONFIG;

class ScrollEventHandler {
    private BaseCanvas: IBaseCanvas;
    private readonly canvasEl: HTMLCanvasElement;

    private mouseScroll: number;
    private touchMove: number;
    private touchDirection: number;
    private rotationStack: number;

    constructor(BaseCanvas: IBaseCanvas) {
        this.BaseCanvas = BaseCanvas;
        this.canvasEl = BaseCanvas.getCanvas(); // perceptron base canvas

        this.mouseScroll = 0;
        this.touchMove = 0;
        this.touchDirection = 0;

        this.registerEvent();
    }

    registerEvent() {
        this.handleMouseScroll();
        this.handleTouchMove();
    }

    handleMouseScroll(): void {
        this.canvasEl.addEventListener('wheel', (e: WheelEvent) => {
            if (e.deltaY > 0) {
                this.BaseCanvas.rotateCanvas(false, degree * (rotationDelta / scrollDivider));
                this.mouseScroll += 1;
                this.rotationStack += 1;
                eventBus.emit(SCROLL_EVENTS.SCROLL_CHANGED, this.mouseScroll);
            } else if (e.deltaY < 0) {
                this.BaseCanvas.rotateCanvas(true, degree * (rotationDelta / scrollDivider));
                this.mouseScroll -= 1;
                this.rotationStack -= 1;
                eventBus.emit(SCROLL_EVENTS.SCROLL_CHANGED, this.mouseScroll);
            }
        });
    }
    handleTouchMove(): void {
        let touchStartX = 0;
        this.canvasEl.addEventListener('touchstart', (e: TouchEvent) => {
            const touch = e.touches[0];
            touchStartX = Math.floor(touch.clientX);
        });
        this.canvasEl.addEventListener('touchmove', (e: TouchEvent) => {
            const touch = e.touches[0];
            const moveX = Math.floor(touch.clientX);
            this.touchDirection = moveX - touchStartX;

            if (this.touchDirection < 0) {
                this.BaseCanvas.rotateCanvas(false, degree * (rotationDelta / scrollDivider));
                this.touchMove += 1;
                this.rotationStack += 1;
                eventBus.emit(SCROLL_EVENTS.TOUCH_CHANGED, this.touchMove);
            } else if (this.touchDirection > 0) {
                this.BaseCanvas.rotateCanvas(true, degree * (rotationDelta / scrollDivider));
                this.touchMove -= 1;
                this.rotationStack -= 1;
                eventBus.emit(SCROLL_EVENTS.TOUCH_CHANGED, this.touchMove0);
            }
        });
    }

    getMouseScroll = () => this.mouseScroll;
}

export default ScrollEventHandler;
