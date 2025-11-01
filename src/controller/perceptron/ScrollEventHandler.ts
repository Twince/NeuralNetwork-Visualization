import { RENDERER_CONFIG } from '@/controller/constants/rendererConfig.ts';
import { NETWORK_CONFIG } from '@/controller/constants/networkConfig.ts';

import eventBus from '@/controller/EventBus.ts';
import { SCROLL_EVENTS } from '@/controller/constants/events.ts';
import { normalizeNetworkConfig } from '@/controller/perceptron/utils/normalizeNetworkInfo.ts';
import { findWidestLayer } from '@/controller/perceptron/utils/findWidestLayer.ts';

const { degree, rotationDelta, displayNodes, scrollDivider } = RENDERER_CONFIG;

class ScrollEventHandler {
    private BaseCanvas: IBaseCanvas;
    private readonly canvasEl: HTMLCanvasElement;

    private mouseScroll: number;
    private touchMove: number;
    private touchDirection: number;
    private rotationStack: number;

    private widestLayer: number;
    private leftLimit: number;
    private rightLimit: number;
    private leftScrollLimit: boolean;
    private rightScrollLimit: boolean;

    constructor(BaseCanvas: IBaseCanvas) {
        this.BaseCanvas = BaseCanvas;
        this.canvasEl = BaseCanvas.getCanvas(); // perceptron base canvas

        this.mouseScroll = 0;
        this.touchMove = 0;
        this.touchDirection = 0;

        this.widestLayer = 0;
        this.leftScrollLimit = true;
        this.rightScrollLimit = true;

        this.registerEvent();
    }

    registerEvent() {
        this.calculateScrollLimit();
        this.handleMouseScroll();
        this.handleTouchMove();
    }

    calculateScrollLimit(): void {
        const normalizedNetworkInfo = normalizeNetworkConfig(NETWORK_CONFIG);
        const { value: widestLayer } = findWidestLayer(normalizedNetworkInfo); // 스크롤 최대치 계산을 위한 가장 큰 노드의 폭을 계산
        this.rightLimit = (widestLayer / 2 - displayNodes) * scrollDivider * 1.25;
        this.leftLimit = -this.rightLimit;
    }

    handleMouseScroll(): void {
        this.canvasEl.addEventListener('wheel', (e: WheelEvent) => {
            this.rightScrollLimit = this.mouseScroll <= this.rightLimit;
            this.leftScrollLimit = this.mouseScroll >= this.leftLimit;

            if (e.deltaY > 0 && this.rightScrollLimit) {
                this.BaseCanvas.rotateCanvas(false, degree * (rotationDelta / (scrollDivider * 2)));
                this.mouseScroll += 1;
                this.rotationStack += 1;
                eventBus.emit(SCROLL_EVENTS.SCROLL_CHANGED, this.mouseScroll);
            } else if (e.deltaY < 0 && this.leftScrollLimit) {
                this.BaseCanvas.rotateCanvas(true, degree * (rotationDelta / (scrollDivider * 2)));
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

            this.rightScrollLimit = this.touchMove <= this.rightLimit;
            this.leftScrollLimit = this.touchMove >= this.leftLimit;

            if (this.touchDirection < 0 && this.rightScrollLimit) {
                this.BaseCanvas.rotateCanvas(false, degree * (rotationDelta / (scrollDivider * 2)));
                this.touchMove += 1;
                this.rotationStack += 1;
                eventBus.emit(SCROLL_EVENTS.TOUCH_CHANGED, this.touchMove);
            } else if (this.touchDirection > 0 && this.leftScrollLimit) {
                this.BaseCanvas.rotateCanvas(true, degree * (rotationDelta / (scrollDivider * 2)));
                this.touchMove -= 1;
                this.rotationStack -= 1;
                eventBus.emit(SCROLL_EVENTS.TOUCH_CHANGED, this.touchMove);
            }
        });
    }

    getMouseScroll = () => this.mouseScroll;
}

export default ScrollEventHandler;
